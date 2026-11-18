-- ============================================
-- EduStruc School Management System
-- Supabase (PostgreSQL) Schema & Initial Seed
-- ============================================

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin','teacher','parent','student')),
  phone VARCHAR(50) DEFAULT '',
  avatar VARCHAR(255) DEFAULT '',
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Students Table
CREATE TABLE IF NOT EXISTS students (
  id SERIAL PRIMARY KEY,
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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Courses Table
CREATE TABLE IF NOT EXISTS courses (
  id SERIAL PRIMARY KEY,
  code VARCHAR(50) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(500) DEFAULT '',
  teacher VARCHAR(255) DEFAULT '',
  credits INT DEFAULT 0,
  grade_level VARCHAR(50) DEFAULT '',
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Classes Table
CREATE TABLE IF NOT EXISTS classes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  grade_level VARCHAR(50) DEFAULT '',
  section VARCHAR(20) DEFAULT '',
  room VARCHAR(50) DEFAULT '',
  teacher VARCHAR(255) DEFAULT '',
  capacity INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Schedules Table
CREATE TABLE IF NOT EXISTS schedules (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  course VARCHAR(50) DEFAULT '',
  day VARCHAR(20) DEFAULT '',
  start_time VARCHAR(20) DEFAULT '',
  end_time VARCHAR(20) DEFAULT '',
  room VARCHAR(50) DEFAULT '',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Attendance Table
CREATE TABLE IF NOT EXISTS attendance (
  id SERIAL PRIMARY KEY,
  student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  class_name VARCHAR(255) DEFAULT '',
  date VARCHAR(50) DEFAULT '',
  status VARCHAR(20) DEFAULT 'present'
);

-- Payments Table
CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  invoice_no VARCHAR(50) NOT NULL UNIQUE,
  student_id INT NULL,
  student_name VARCHAR(255) DEFAULT '',
  amount NUMERIC(10,2) DEFAULT 0,
  method VARCHAR(50) DEFAULT 'cash',
  status VARCHAR(50) DEFAULT 'paid',
  description VARCHAR(500) DEFAULT '',
  paid_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Messages Table
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  sender VARCHAR(255) DEFAULT '',
  recipient VARCHAR(255) DEFAULT '',
  subject VARCHAR(255) DEFAULT '',
  body TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Settings Table
CREATE TABLE IF NOT EXISTS settings (
  key VARCHAR(100) PRIMARY KEY,
  value VARCHAR(500) DEFAULT ''
);

-- Seed Initial Users (Passwords: admin123, teacher123, parent123)
INSERT INTO users (name, email, password_hash, role, phone)
VALUES 
  ('Admin', 'admin@edustruc.com', '$2a$10$nEN5O1XCNOTjI5MkUAaolOjI1b/NjabEA/.jXOk/vHwzCuvymQB/6', 'admin', '9000000001'),
  ('Priya Teacher', 'teacher@edustruc.com', '$2a$10$vEc144XaQFHTUGPqDnn6e.mzWCSrV7t5Y0KcnnDFx//xKudGMzUf6', 'teacher', '9000000002'),
  ('Ravi Parent', 'parent@edustruc.com', '$2a$10$YjMhxkoVyBdA0qoRDh6/POWj1m0AW5CRb.L02GXPdVlBXoWQCRYcy', 'parent', '9000000003')
ON CONFLICT (email) DO NOTHING;

-- Seed Students
INSERT INTO students (admission_no, first_name, last_name, email, phone, grade, section, guardian_name, guardian_phone, status)
VALUES
  ('ADM-1001', 'Aarav', 'Kumar', 'aarav@edustruc.com', '9876543210', '10', 'A', 'Ravi Parent', '9000000003', 'active'),
  ('ADM-1002', 'Diya', 'Sharma', 'diya@edustruc.com', '9876543211', '9', 'B', 'Meena Sharma', '9000000004', 'active'),
  ('ADM-1003', 'Vihaan', 'Reddy', 'vihaan@edustruc.com', '9876543212', '8', 'A', 'Suresh Reddy', '9000000005', 'active')
ON CONFLICT (admission_no) DO NOTHING;

-- Seed Courses
INSERT INTO courses (code, title, description, teacher, credits, grade_level, status)
VALUES
  ('MATH10', 'Mathematics', 'Algebra and Geometry', 'Priya Teacher', 4, '10', 'active'),
  ('SCI09', 'Science', 'Physics, Chemistry, Biology', 'Priya Teacher', 3, '9', 'active'),
  ('ENG08', 'English', 'Grammar and Literature', 'John Teacher', 3, '8', 'active')
ON CONFLICT (code) DO NOTHING;

-- Seed Classes
INSERT INTO classes (name, grade_level, section, room, teacher, capacity)
VALUES
  ('Grade 10 - A', '10', 'A', 'R-101', 'Priya Teacher', 40),
  ('Grade 9 - B', '9', 'B', 'R-102', 'John Teacher', 40);

-- Seed Schedules
INSERT INTO schedules (title, course, day, start_time, end_time, room)
VALUES
  ('Mathematics', 'MATH10', 'Monday', '09:00', '10:00', 'R-101'),
  ('Science', 'SCI09', 'Monday', '10:15', '11:15', 'R-102'),
  ('English', 'ENG08', 'Tuesday', '09:00', '10:00', 'R-103');

-- Seed Payments
INSERT INTO payments (invoice_no, student_id, student_name, amount, method, status, description)
VALUES
  ('INV-2001', 1, 'Aarav Kumar', 15000, 'card', 'paid', 'Term 1 fees'),
  ('INV-2002', 2, 'Diya Sharma', 15000, 'upi', 'pending', 'Term 1 fees')
ON CONFLICT (invoice_no) DO NOTHING;

-- Seed Messages
INSERT INTO messages (sender, recipient, subject, body, is_read)
VALUES
  ('Admin', 'Ravi Parent', 'Fee reminder', 'Term 1 fee is due for Aarav.', FALSE),
  ('Priya Teacher', 'Ravi Parent', 'Progress report', 'Aarav is doing well in Mathematics.', TRUE);

-- Seed Settings
INSERT INTO settings (key, value)
VALUES
  ('school_name', 'EduStruc Academy'),
  ('academic_year', '2026-2027'),
  ('timezone', 'Asia/Kolkata'),
  ('currency', 'INR'),
  ('notifications', 'true')
ON CONFLICT (key) DO NOTHING;
