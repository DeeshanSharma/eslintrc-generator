const figlet = require('figlet');
const chalk = require('chalk');
const clear = require('clear');
const centerAlign = require('center-align');

clear();

const display = {
  options: ['greenBright', 'yellowBright', 'cyanBright'],
  strings: [
    `${figlet.textSync('eslintrc-generator', 'Larry 3D')}`,
    '\nThis package is developed by Deeshan Sharma.',
    '\nSee the source code here https://github.com/DeeshanSharma/eslintrc-generator. Give it a star if you like it.\n',
  ],
};

module.exports = function paintTerminal(
  options = display.options,
  string = display.strings
) {
  const terminalWidth = process.stdout.columns;
  for (let i = 0; i < 3; i++) {
    console.log(chalk`{${options[i]}${centerAlign(string[i], terminalWidth)}}`);
  }
};
