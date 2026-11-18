const express = require('express');
const { db } = require('../db');

const router = express.Router();

async function readAll() {
  const [rows] = await db.query('SELECT `key`, `value` FROM settings');
  const out = {};
  for (const row of rows) out[row.key] = row.value;
  return out;
}

router.get('/', async (req, res, next) => {
  try {
    res.json(await readAll());
  } catch (err) { next(err); }
});

router.put('/', async (req, res, next) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    for (const [key, value] of Object.entries(req.body || {})) {
      await conn.query(
        'INSERT INTO settings (`key`,`value`) VALUES (?,?) ON DUPLICATE KEY UPDATE `value` = ?',
        [key, String(value), String(value)]
      );
    }
    await conn.commit();
  } catch (err) {
    await conn.rollback();
    return next(err);
  } finally {
    conn.release();
  }
  try {
    res.json(await readAll());
  } catch (err) { next(err); }
});

module.exports = router;
