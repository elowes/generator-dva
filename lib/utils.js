const chalk = require('chalk');
const inquirer = require('inquirer');
const spawn = require('cross-spawn');

const log = console.log;

function logGreen(msg) {
  log(chalk.green(msg));
}

function logRed(msg) {
  log(chalk.red(msg));
}

function installDependencies(appPath) {
  process.chdir(appPath);
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'tool',
        message: '使用什么工具安装项目依赖？',
        choices: ['npm', 'yarn', 'cnpm', 'tnpm'],
      }
    ]).then(answers => {
      const res = spawn.sync(answers.tool, ['install']);
      if (!res.error) {
        logGreen('安装依赖成功');
      }
      logGreen(answers.tool);
    })
}

module.exports = {
  logGreen,
  logRed,
  installDependencies
}