#!/usr/bin/env node

const paintTerminal = require('./lib/terminal');
const generateFile = require('./lib/generateFile');

paintTerminal();
generateFile().then((packages) => console.log(packages));
