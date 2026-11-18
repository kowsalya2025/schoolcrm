const express = require('express');
const { db } = require('../db');

const router = express.Router();

async function count(sql, params = []) {
  const [rows] = await db.query(sql, params);
  return Number(rows[0].c);
}

async function sum(sql) {
  const [rows] = await db.query(sql);
  return Number(rows[0].s);
}

router.get('/', async (req, res, next) => {
  try {
    const stats = {
      students: await count('SELECT COUNT(*) AS c FROM students'),
      courses: await count('SELECT COUNT(*) AS c FROM courses'),
      classes: await count('SELECT COUNT(*) AS c FROM classes'),
      teachers: await count('SELECT COUNT(*) AS c FROM users WHERE role = ?', ['teacher']),
      revenue: await sum("SELECT COALESCE(SUM(amount),0) AS s FROM payments WHERE status = 'paid'"),
      pending: await sum("SELECT COALESCE(SUM(amount),0) AS s FROM payments WHERE status = 'pending'"),
      unread: await count('SELECT COUNT(*) AS c FROM messages WHERE is_read = 0'),
    };
    const [recentPayments] = await db.query('SELECT * FROM payments ORDER BY id DESC LIMIT 5');
    const [recentStudents] = await db.query('SELECT * FROM students ORDER BY id DESC LIMIT 5');
    const [weekly] = await db.query('SELECT `day`, COUNT(*) AS `count` FROM schedules GROUP BY `day`');
    res.json({ stats, recentPayments, recentStudents, weekly });
  } catch (err) { next(err); }
});

module.exports = router;
