require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { init, seed, DB_NAME } = require('./db');
const auth = require('./middleware/auth');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>EduStruc SMS - Backend API</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0B1437; color: #fff; margin: 0; padding: 40px 20px; display: flex; justify-content: center; }
    .card { background: #111C44; border-radius: 16px; padding: 32px; max-width: 560px; width: 100%; box-shadow: 0 20px 40px rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.08); }
    h1 { margin: 0 0 8px; font-size: 24px; color: #fff; display: flex; align-items: center; gap: 10px; }
    .badge { background: #10B981; color: #fff; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px; }
    p { color: #A3AED0; font-size: 14px; line-height: 1.6; }
    .endpoints { background: rgba(0,0,0,0.25); border-radius: 10px; padding: 16px; margin: 20px 0; font-family: monospace; font-size: 13px; }
    .endpoint { margin: 6px 0; display: flex; justify-content: space-between; }
    .endpoint a { color: #4318FF; background: #fff; padding: 2px 8px; border-radius: 4px; text-decoration: none; font-weight: 700; }
    .db-info { background: rgba(67, 24, 255, 0.15); border: 1px solid #4318FF; border-radius: 10px; padding: 14px; font-size: 13px; color: #E0E5F2; }
  </style>
</head>
<body>
  <div class="card">
    <h1>🎓 EduStruc SMS API <span class="badge">Online</span></h1>
    <p>Live Backend Service connected to Supabase Cloud Database.</p>
    <div class="db-info">
      ⚡ <strong>Database:</strong> Supabase PostgreSQL (Production)<br>
      🚀 <strong>Environment:</strong> Vercel Serverless
    </div>
    <div class="endpoints">
      <div class="endpoint"><span>GET /api/health</span> <a href="/api/health" target="_blank">Test</a></div>
      <div class="endpoint"><span>POST /api/auth/login</span> <span>Auth</span></div>
      <div class="endpoint"><span>GET /api/students</span> <span>Students</span></div>
      <div class="endpoint"><span>GET /api/courses</span> <span>Courses</span></div>
      <div class="endpoint"><span>GET /api/classes</span> <span>Classes</span></div>
      <div class="endpoint"><span>GET /api/schedules</span> <span>Schedules</span></div>
      <div class="endpoint"><span>GET /api/payments</span> <span>Payments</span></div>
    </div>
    <p style="font-size: 12px; color: #707EAE; margin: 0;">EduStruc Academic Management System • Powered by Supabase & Vercel</p>
  </div>
</body>
</html>
  `);
});
app.get('/api/health', (req, res) => res.json({ ok: true, service: 'EduStruc API', database: 'supabase' }));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/students', auth(), require('./routes/students'));
app.use('/api/courses', auth(), require('./routes/courses'));
app.use('/api/classes', auth(), require('./routes/classes'));
app.use('/api/schedules', auth(), require('./routes/schedules'));
app.use('/api/payments', auth(), require('./routes/payments'));
app.use('/api/messages', auth(), require('./routes/messages'));
app.use('/api/settings', auth('admin'), require('./routes/settings'));
app.use('/api/dashboard', auth(), require('./routes/dashboard'));

app.use((req, res) => res.status(404).json({ error: 'Route not found' }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await init();
    await seed();
    console.log(`MySQL connected. Database "${DB_NAME}" ready.`);
  } catch (err) {
    console.error('MySQL init failed:', err.message);
    console.error('Check MySQL is running and DB_HOST/DB_USER/DB_PASSWORD/DB_NAME in backend/.env are correct.');
  }
  if (!process.env.VERCEL) {
    app.listen(PORT, () => console.log(`EduStruc API running on http://localhost:${PORT}`));
  }
}

start();

module.exports = app;
