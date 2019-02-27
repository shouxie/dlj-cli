'use strict'
const co = require('co');
const prompt = require('co-prompt');
const templates = require('../templates.json');
const chalk = require('chalk');
const fs = require('fs');

module.exports = () => {
  co(function *() {
    let tempName = yield prompt('模板名称: ');
    let gitUrl = yield prompt('git链接: ');
    let branch = yield prompt('分支: ');

    if (!templates.tpl[tempName]) {
      templates.tpl[tempName] = {};
      templates.tpl[tempName]['url'] = gitUrl;
      templates.tpl[tempName]['branch'] = branch;
    } else {
      console.log(chalk.red('模板已经存在'));
      process.exit(0);
    }
    console.log('start install.....');
    fs.writeFile(__dirname + '/../templates.json', JSON.stringify(templates), 'utf-8', (err) => {
      if (err) console.log(err);
      console.log(chalk.green('成功添加新的模板!\n'));
      console.log(chalk.grey('最新的模板有： \n'));
      console.log(templates, '\n');
      process.exit();
    })
  });
}
