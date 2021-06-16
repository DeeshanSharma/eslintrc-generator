const inquirer = require('inquirer');

module.exports = async function getUserInput() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'moduleType',
      message: 'What type of modules does your project use?',
      choices: [
        {
          value: 'js',
          name: 'JavaScript modules (Import/Export)',
        },
        {
          value: 'req',
          name: 'CommonJS (require)',
        },
        {
          value: 'none',
          name: 'None of these',
        },
      ],
    },
    {
      type: 'checkbox',
      name: 'codeRun',
      message: 'Where does your code run?',
      choices: [
        {
          value: 'browser',
          name: 'Browser',
          checked: true,
        },
        {
          value: 'node',
          name: 'Node',
        },
      ],
    },
    {
      type: 'list',
      name: 'isReact',
      message: 'Are you using React in your project?',
      choices: [
        {
          value: true,
          name: 'Yes',
        },
        {
          value: false,
          name: 'No',
        },
      ],
      default: false,
    },
    {
      type: 'list',
      name: 'language',
      message: 'What does your project use?',
      choices: [
        {
          value: 'ts',
          name: 'TypeScript',
        },
        {
          value: 'js',
          name: 'JavaScript',
        },
      ],
      default: 'js',
    },
    {
      type: 'list',
      name: 'isPrettier',
      message: 'Do you use Prettier as code formatter?',
      choices: [
        {
          value: true,
          name: 'Yes',
        },
        {
          value: false,
          name: 'No',
        },
      ],
      default: true,
    },
    {
      type: 'list',
      name: 'packageManager',
      message: 'Which package manager you use?',
      choices: ['yarn', 'npm'],
      default: 'npm',
    },
  ]);
  return answers;
};