const { accessSync, constants } = require('fs');
const execa = require('execa');
const Listr = require('listr');
const { join } = require('path');
const chalk = require('chalk');
const generateFile = require('./generateFile');

function isPackageFile(ctx, task) {
  const filePath = join(process.cwd(), 'package.json');
  try {
    accessSync(filePath, constants.F_OK);
    ctx.isPackageFile = true;
    task.title = chalk`{greenBright package.json found}`;
    return Promise.resolve('ok');
  } catch (err) {
    task.title = chalk`{redBright Checking package.json file}`;
    return Promise.reject(new Error('package.json not found'));
  }
}

module.exports = function runTasks(packages, packageManager, eslintrcConfig) {
  const npmInstall = packages.map((package) => {
    return {
      title: chalk`{yellowBright Installing ${package}}`,
      task: (ctx, task) =>
        execa('npm', ['i', '-D', package]).then(() => {
          task.title = chalk`{greenBright ${package} Installed}`;
        }),
    };
  });

  const yarnAdd = packages.map((package) => {
    return {
      title: chalk`{yellowBright Installing ${package}}`,
      task: (ctx, task) =>
        execa('yarn', ['add', '-D', package]).then(() => {
          task.title = chalk`{greenBright ${package} Installed}`;
        }),
    };
  });

  const task = new Listr(
    [
      {
        title: chalk`{yellowBright Checking package.json file}`,
        task: (ctx, task) => isPackageFile(ctx, task),
      },
      {
        title: chalk`{yellowBright Creating package.json for you}`,
        task: (ctx, task) =>
          execa('npm', ['init', '-y']).then(() => {
            task.title = chalk`{greenBright Created package.json successfully}`;
          }),
        skip: (ctx) => {
          if (ctx.isPackageFile) return 'package.json already exists';
        },
      },
      {
        title: chalk`{whiteBright Installing dependencies using yarn}`,
        enabled: () => packageManager === 'yarn',
        task: () => new Listr(yarnAdd, { exitOnError: false }),
      },
      {
        title: chalk`{whiteBright Installing dependencies using npm}`,
        enabled: () => packageManager === 'npm',
        task: () => new Listr(npmInstall, { exitOnError: false }),
      },
      {
        title: chalk`{yellowBright Generating eslintrc.json file}`,
        task: (ctx, task) => generateFile(eslintrcConfig, ctx, task),
      },
      {
        title: chalk`Please create a .eslintrc.json file and paste these configuration in it    {redBright IGNORE ->}`,
        enabled: (ctx) => ctx.isEslintrc === false,
        skip: () => {
          if (true) {
            return execa('echo', [JSON.stringify(eslintrcConfig)]).stdout.pipe(
              process.stdout
            );
          }
        },
        task: () => {},
      },
    ],
    { exitOnError: false }
  );

  task.run().catch(() => {});
};
