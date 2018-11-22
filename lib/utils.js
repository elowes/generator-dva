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

function logYellow(msg) {
  log(chalk.yellow(msg));
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
      logGreen('安装项目依赖中，受网络和机器性能影响，可能需要一些时间，请稍候');
      const res = spawn.sync(answers.tool, ['install'], { stdio: 'inherit' });
      if (!res.error) {
        logGreen('安装项目依赖成功');
        runDevServer(appPath);
      } else {
        logYellow(`系统没有找到${answers.tool}命令，将使用npm安装项目依赖`);
        const npmRes = spawn.sync('npm', ['install'], { stdio: 'inherit' });
        if (!npmRes.error) {
          logGreen('安装项目依赖成功');
          runDevServer(appPath);
        } else {
          logRed('安装项目依赖失败，请手动安装');
        }
      }
    })
}

function runDevServer(appPath) {
  logGreen(`启动开发服务`);
  logGreen(`您也可以手动切换到${appPath}目录，然后执行npm start启动开发服务`);
  spawn.sync('npm', ['start'], { stdio: 'inherit' });
}

module.exports = {
  logGreen,
  logRed,
  installDependencies
}