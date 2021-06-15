const fs = require('fs');
const getUserInput = require('./getUserInput');
const creator = require('./creator');

module.exports = async function generateFile() {
  const { eslintrc, packages } = creator(await getUserInput());
  fs.writeFile('.eslintrc.json', JSON.stringify(eslintrc, null, 2), (err) => {
    if (err) console.log(err);
    console.log('Successfully Generated your file');
  });
  return packages;
};
