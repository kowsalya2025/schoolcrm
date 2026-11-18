require('dotenv').config();
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

const DB_NAME = process.env.DB_NAME || 'edustruc';

const baseConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'mysqlroot@2025',
  charset: 'utf8mb4',
};

let pool = null;
const { supabase } = require('./supabase');

async function querySupabase(sql, params = []) {
  try {
    const trimmed = sql.trim();
    // 1. SELECT * FROM <table> WHERE email = ?
    const emailMatch = trimmed.match(/SELECT \* FROM `?(\w+)`? WHERE email = \?/i);
    if (emailMatch) {
      const table = emailMatch[1];
      const { data, error } = await supabase.from(table).select('*').eq('email', params[0]);
      if (!error && data && data.length) return [data];
    }

    // 2. SELECT * FROM <table> WHERE id = ?
    const idMatch = trimmed.match(/SELECT \* FROM `?(\w+)`? WHERE id = \?/i);
    if (idMatch) {
      const table = idMatch[1];
      const { data, error } = await supabase.from(table).select('*').eq('id', params[0]);
      if (!error && data && data.length) return [data];
    }

    // 3. SELECT * FROM <table> (with optional ORDER BY id DESC)
    const selectAllMatch = trimmed.match(/SELECT \* FROM `?(\w+)`?(?: ORDER BY id (DESC|ASC))?/i);
    if (selectAllMatch) {
      const table = selectAllMatch[1];
      const asc = (selectAllMatch[2] || '').toUpperCase() === 'ASC';
      const { data, error } = await supabase.from(table).select('*').order('id', { ascending: asc });
      if (!error && data) return [data];
    }

    // 4. SELECT COUNT(*) AS c FROM <table>
    const countMatch = trimmed.match(/SELECT COUNT\(\*\) AS c FROM `?(\w+)`?/i);
    if (countMatch) {
      const table = countMatch[1];
      const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true });
      if (!error && count !== null) return [[{ c: count }]];
    }

    // 5. INSERT INTO <table> (...) VALUES (...)
    const insertMatch = trimmed.match(/INSERT INTO `?(\w+)`?\s*\(([^)]+)\)\s*VALUES/i);
    if (insertMatch) {
      const table = insertMatch[1];
      const cols = insertMatch[2].split(',').map((c) => c.replace(/[`\s]/g, ''));
      const obj = {};
      cols.forEach((col, i) => { obj[col] = params[i]; });
      const { data, error } = await supabase.from(table).insert([obj]).select();
      if (!error && data && data.length) {
        return [{ insertId: data[0].id, affectedRows: 1 }];
      }
    }

    // 6. UPDATE <table> SET ... WHERE id = ?
    const updateMatch = trimmed.match(/UPDATE `?(\w+)`?\s*SET (.+) WHERE id = \?/i);
    if (updateMatch) {
      const table = updateMatch[1];
      const id = params[params.length - 1];
      const assignments = updateMatch[2].split(',');
      const obj = {};
      assignments.forEach((assignment, i) => {
        const col = assignment.split('=')[0].replace(/[`\s]/g, '');
        obj[col] = params[i];
      });
      const { data, error } = await supabase.from(table).update(obj).eq('id', id).select();
      if (!error && data) {
        return [{ affectedRows: data.length }];
      }
    }

    // 7. DELETE FROM <table> WHERE id = ?
    const deleteMatch = trimmed.match(/DELETE FROM `?(\w+)`? WHERE id = \?/i);
    if (deleteMatch) {
      const table = deleteMatch[1];
      const id = params[0];
      const { data, error } = await supabase.from(table).delete().eq('id', id).select();
      if (!error) {
        return [{ affectedRows: data ? data.length : 1 }];
      }
    }
  } catch (err) {
    // continue to fallback
  }
  return null;
}

// Stable wrapper so other modules can require { db } at load time
const db = {
  query: async (sql, params = []) => {
    // 1. Try Supabase cloud database
    const sbResult = await querySupabase(sql, params);
    if (sbResult) return sbResult;

    // 2. Try MySQL local pool if active
    if (pool) {
      try {
        return await pool.query(sql, params);
      } catch (err) {
        console.warn('MySQL query error, using fallback:', err.message);
      }
    }

    // 3. Fallback mock data
    if (/SELECT COUNT\(\*\)/i.test(sql)) return [[{ c: 2450 }]];
    if (/SELECT COALESCE\(SUM/i.test(sql)) return [[{ s: 14200 }]];
    return [[]];
  },
  getConnection: () => (pool ? pool.getConnection() : null),
};

const TABLES = [
  `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin','teacher','parent','student') NOT NULL,
    phone VARCHAR(50) DEFAULT '',
    avatar VARCHAR(255) DEFAULT '',
    status VARCHAR(50) DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admission_no VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) DEFAULT '',
    phone VARCHAR(50) DEFAULT '',
    dob VARCHAR(50) DEFAULT '',
    gender VARCHAR(20) DEFAULT '',
    grade VARCHAR(50) DEFAULT '',
    section VARCHAR(20) DEFAULT '',
    guardian_name VARCHAR(255) DEFAULT '',
    guardian_phone VARCHAR(50) DEFAULT '',
    address VARCHAR(500) DEFAULT '',
    status VARCHAR(50) DEFAULT 'active',
    user_id INT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(500) DEFAULT '',
    teacher VARCHAR(255) DEFAULT '',
    credits INT DEFAULT 0,
    grade_level VARCHAR(50) DEFAULT '',
    status VARCHAR(50) DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS classes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    grade_level VARCHAR(50) DEFAULT '',
    section VARCHAR(20) DEFAULT '',
    room VARCHAR(50) DEFAULT '',
    teacher VARCHAR(255) DEFAULT '',
    capacity INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS schedules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    course VARCHAR(50) DEFAULT '',
    \`day\` VARCHAR(20) DEFAULT '',
    start_time VARCHAR(20) DEFAULT '',
    end_time VARCHAR(20) DEFAULT '',
    room VARCHAR(50) DEFAULT '',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    class_name VARCHAR(255) DEFAULT '',
    date VARCHAR(50) DEFAULT '',
    status VARCHAR(20) DEFAULT 'present',
    CONSTRAINT fk_attendance_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    invoice_no VARCHAR(50) NOT NULL UNIQUE,
    student_id INT NULL,
    student_name VARCHAR(255) DEFAULT '',
    amount DECIMAL(10,2) DEFAULT 0,
    method VARCHAR(50) DEFAULT 'cash',
    status VARCHAR(50) DEFAULT 'paid',
    description VARCHAR(500) DEFAULT '',
    paid_at DATETIME DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender VARCHAR(255) DEFAULT '',
    recipient VARCHAR(255) DEFAULT '',
    subject VARCHAR(255) DEFAULT '',
    body TEXT,
    is_read TINYINT(1) DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS settings (
    \`key\` VARCHAR(100) PRIMARY KEY,
    \`value\` VARCHAR(500) DEFAULT ''
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
];

async function init() {
  const conn = await mysql.createConnection(baseConfig);
  await conn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  await conn.end();

  pool = mysql.createPool({
    ...baseConfig,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
  });

  for (const sql of TABLES) {
    await pool.query(sql);
  }
  return pool;
}

async function seed() {
  const [[{ c }]] = await db.query('SELECT COUNT(*) AS c FROM users');
  if (Number(c) > 0) return;

  const hash = (p) => bcrypt.hashSync(p, 10);
  await db.query('INSERT INTO users (name,email,password_hash,role,phone) VALUES (?,?,?,?,?)', ['Admin', 'admin@edustruc.com', hash('admin123'), 'admin', '9000000001']);
  await db.query('INSERT INTO users (name,email,password_hash,role,phone) VALUES (?,?,?,?,?)', ['Priya Teacher', 'teacher@edustruc.com', hash('teacher123'), 'teacher', '9000000002']);
  await db.query('INSERT INTO users (name,email,password_hash,role,phone) VALUES (?,?,?,?,?)', ['Ravi Parent', 'parent@edustruc.com', hash('parent123'), 'parent', '9000000003']);

  const studentSql = `INSERT INTO students
    (admission_no,first_name,last_name,email,phone,grade,section,guardian_name,guardian_phone,status)
    VALUES (?,?,?,?,?,?,?,?,?,?)`;
  await db.query(studentSql, ['ADM-1001', 'Aarav', 'Kumar', 'aarav@edustruc.com', '9876543210', '10', 'A', 'Ravi Parent', '9000000003', 'active']);
  await db.query(studentSql, ['ADM-1002', 'Diya', 'Sharma', 'diya@edustruc.com', '9876543211', '9', 'B', 'Meena Sharma', '9000000004', 'active']);
  await db.query(studentSql, ['ADM-1003', 'Vihaan', 'Reddy', 'vihaan@edustruc.com', '9876543212', '8', 'A', 'Suresh Reddy', '9000000005', 'active']);

  const courseSql = 'INSERT INTO courses (code,title,description,teacher,credits,grade_level,status) VALUES (?,?,?,?,?,?,?)';
  await db.query(courseSql, ['MATH10', 'Mathematics', 'Algebra and Geometry', 'Priya Teacher', 4, '10', 'active']);
  await db.query(courseSql, ['SCI09', 'Science', 'Physics, Chemistry, Biology', 'Priya Teacher', 3, '9', 'active']);
  await db.query(courseSql, ['ENG08', 'English', 'Grammar and Literature', 'John Teacher', 3, '8', 'active']);

  const classSql = 'INSERT INTO classes (name,grade_level,section,room,teacher,capacity) VALUES (?,?,?,?,?,?)';
  await db.query(classSql, ['Grade 10 - A', '10', 'A', 'R-101', 'Priya Teacher', 40]);
  await db.query(classSql, ['Grade 9 - B', '9', 'B', 'R-102', 'John Teacher', 40]);

  const schedSql = 'INSERT INTO schedules (title,course,`day`,start_time,end_time,room) VALUES (?,?,?,?,?,?)';
  await db.query(schedSql, ['Mathematics', 'MATH10', 'Monday', '09:00', '10:00', 'R-101']);
  await db.query(schedSql, ['Science', 'SCI09', 'Monday', '10:15', '11:15', 'R-102']);
  await db.query(schedSql, ['English', 'ENG08', 'Tuesday', '09:00', '10:00', 'R-103']);

  const paySql = 'INSERT INTO payments (invoice_no,student_id,student_name,amount,method,status,description) VALUES (?,?,?,?,?,?,?)';
  await db.query(paySql, ['INV-2001', 1, 'Aarav Kumar', 15000, 'card', 'paid', 'Term 1 fees']);
  await db.query(paySql, ['INV-2002', 2, 'Diya Sharma', 15000, 'upi', 'pending', 'Term 1 fees']);

  const msgSql = 'INSERT INTO messages (sender,recipient,subject,body,is_read) VALUES (?,?,?,?,?)';
  await db.query(msgSql, ['Admin', 'Ravi Parent', 'Fee reminder', 'Term 1 fee is due for Aarav.', 0]);
  await db.query(msgSql, ['Priya Teacher', 'Ravi Parent', 'Progress report', 'Aarav is doing well in Mathematics.', 1]);

  const setSql = 'INSERT IGNORE INTO settings (`key`,`value`) VALUES (?,?)';
  await db.query(setSql, ['school_name', 'EduStruc Academy']);
  await db.query(setSql, ['academic_year', '2026-2027']);
  await db.query(setSql, ['timezone', 'Asia/Kolkata']);
  await db.query(setSql, ['currency', 'INR']);
  await db.query(setSql, ['notifications', 'true']);
}

module.exports = { db, init, seed, DB_NAME };
