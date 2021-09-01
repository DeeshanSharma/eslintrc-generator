const args = require('yargs')
  .scriptName('eslintrc-generator')
  .version(false)
  .alias('t', 'moduleType')
  .describe(
    't',
    'Module type you use [JavaScript modules (Import/Export): js, CommonJS (require): req]'
  )
  .choices('t', ['js', 'req', 'none'])
  .alias('c', 'codeRun')
  .describe('c', 'Code will run on')
  .choices('c', ['browser', 'node'])
  .array('c')
  .alias('r', 'isReact')
  .describe('r', 'Using React in project')
  .boolean('r')
  .alias('l', 'language')
  .describe('l', 'Language you going to use')
  .choices('l', ['ts', 'js'])
  .alias('p', 'isPrettier')
  .describe('p', 'Using Prettier for formatting')
  .boolean('p')
  .alias('m', 'packageManager')
  .describe('m', 'Which package manager to use')
  .choices('m', ['yarn', 'npm'])
  .usage(
    'Usage: $0 [-t js|req|none] [-c browser|node] [-l ts|js] [-m yarn|npm] [-rp]'
  )
  .example('$0 -t js -c node -l ts -m yarn -rp')
  .help('h')
  .alias('h', 'help').argv;

const createAnswers = () => {
  const answers = {
    list: args.t || 'none',
    codeRun: args.c || ['browser'],
    isReact: args.r || false,
    language: args.l || 'js',
    isPrettier: args.p || true,
    packageManager: args.m || 'npm',
  };
  return answers;
};

module.exports = {createAnswers, args };
