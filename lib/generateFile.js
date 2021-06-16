const { writeFileSync } = require('fs');
const chalk = require('chalk');

module.exports = function generateFile(eslintrcConfig, ctx, task) {
  try {
    writeFileSync('.eslintrc.json', JSON.stringify(eslintrcConfig, null, 2));
    task.title = chalk`{greenBright Successfully Generated your file}`;
    return Promise.resolve('ok');
  } catch (err) {
    ctx.isEslintrc = false;
    task.title = chalk`{redBright Generating eslintrc.json file}`;
    return Promise.reject(new Error("Couldn't create file"));
  }
};
