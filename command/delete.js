'use strict'
const co = require('co');
const prompt = require('co-prompt');
const templates = require('../templates.json');
const chalk = require('chalk');
const fs = require('fs');

module.exports = () => {
  co(function *() {
    let tempName = yield prompt('模板名称: ');

    if (templates.tpl[tempName]) {
      templates.tpl[tempName] = undefined;
    } else {
      console.log(chalk.red('模板不存在!'));
      process.exit(0);
    }

    fs.writeFile(__dirname + '/../templates.json', JSON.stringify(templates), 'utf-8', (err) => {
      if (err) console.log(err);
      console.log(chalk.green('模板已经删除!'));
      console.log(chalk.grey('当前的模板有: '), '\n');
      console.log(templates);
      console.log('\n');
      process.exit(0);
    })
  });
}
