'use strict'

const co = require('co');
const prompt = require('co-prompt');
const chalk = require('chalk');
const fs = require('fs');
const templates = require('../templates.json');
const path = require('path');
const exec = require('child_process').exec;

const deleteFolder = (path) => {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file, index) => {
      let currentPath = path + '/' + file;
      if (fs.statSync(currentPath).isDirectory()) {
        deleteFolder(currentPath);
      } else {
        fs.unlinkSync(currentPath);
      }
    });
    fs.rmdirSync(path);
  }
};

module.exports = () => {
  co(function *() {
    let tempName = yield prompt('模板名称: ');
    let projectName = yield prompt('项目名称: ');
    let gitUrl;
    let branch;
    tempName = tempName.toLocaleLowerCase().trim();
    if (!templates.tpl[tempName]) {
      console.log(chalk.red('模板不存在!'));
      process.exit(0);
    }
    gitUrl = templates.tpl[tempName].url;
    console.log('模板存在', gitUrl);
    branch = templates.tpl[tempName].branch || master;
    const comStr = `git clone ${gitUrl} ${projectName} && cd ${projectName} && git checkout ${branch}`;
    console.log(chalk.green('\n Start.....'));
    exec(comStr, (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        process.exit(0);
      }
      const gitPath = path.join(process.cwd(), projectName, '.git');
      deleteFolder(gitPath);
      console.log(chalk.green('\n process completed'));
      console.log(chalk.green(`\n cd ${projectName}`));
      console.log(chalk.green('\n npm install or yarn'));
      console.log(chalk.green('\n npm start or yarn start'));
      process.exit();
    })

  })
};
