const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

process.env.CI = '1';
process.env.EXPO_NO_TELEMETRY = '1';

const inRoot = fs.existsSync('app') && fs.existsSync(path.join('app', 'package.json'));
const appDir = inRoot ? path.join(__dirname, 'app') : __dirname;

console.log('=== VERCEL EXPO BUILD ===');
console.log('Node version:', process.version);
console.log('Working directory:', process.cwd());
console.log('Target app directory:', appDir);

const binName = process.platform === 'win32' ? 'expo.cmd' : 'expo';
const localExpo = path.join(appDir, 'node_modules', '.bin', binName);
const hasLocalExpo = fs.existsSync(localExpo);

const cmd = hasLocalExpo ? localExpo : 'npx';
const args = hasLocalExpo ? ['export', '-p', 'web'] : ['expo', 'export', '-p', 'web'];

console.log(`Executing: ${cmd} ${args.join(' ')}`);

const result = spawnSync(cmd, args, {
  cwd: appDir,
  env: { ...process.env, CI: '1', EXPO_NO_TELEMETRY: '1', PATH: process.env.PATH },
  encoding: 'utf8',
  shell: true,
});

if (result.stdout) {
  console.log('--- STDOUT ---\n' + result.stdout);
}
if (result.stderr) {
  console.error('--- STDERR ---\n' + result.stderr);
}

if (result.status !== 0) {
  console.error(`Expo export exited with status ${result.status}`);
  process.exit(result.status || 1);
}

if (inRoot) {
  const src = path.join(appDir, 'dist');
  const dest = path.join(__dirname, 'dist');
  if (fs.existsSync(src)) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    fs.cpSync(src, dest, { recursive: true });
    console.log(`Copied ${src} -> ${dest}`);
  }
}

console.log('=== VERCEL EXPO BUILD COMPLETE ===');
