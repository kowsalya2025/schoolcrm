const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const config = getDefaultConfig(projectRoot);

// Ensure Metro watches the app and does not crash on missing parent folders
config.watchFolders = [projectRoot];
config.resolver.nodeModulesPaths = [path.resolve(projectRoot, 'node_modules')];

module.exports = config;
