#!/usr/bin/env node

const paintTerminal = require('./lib/paintTerminal');
const createConfig = require('./lib/createConfig');
const runTasks = require('./lib/tasks');

(async () => {
  paintTerminal();
  const { eslintrc, packages, packageManager } = await createConfig();
  runTasks(packages, packageManager, eslintrc);
})();
