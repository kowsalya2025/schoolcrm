const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

process.env.CI = '1';
process.env.EXPO_NO_TELEMETRY = '1';

const inRoot = fs.existsSync('app') && fs.existsSync(path.join('app', 'package.json'));
const appDir = inRoot ? path.join(__dirname, 'app') : __dirname;

console.log('--- Vercel Build Script ---');
console.log('Building Expo Web in:', appDir);

execSync('npx expo export -p web', {
  cwd: appDir,
  stdio: 'inherit',
  env: { ...process.env, CI: '1', EXPO_NO_TELEMETRY: '1' }
});

if (inRoot) {
  const src = path.join(appDir, 'dist');
  const dest = path.join(__dirname, 'dist');
  if (fs.existsSync(src)) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    fs.cpSync(src, dest, { recursive: true });
  }
}

console.log('--- Vercel Build Complete ---');
