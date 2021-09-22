#!/usr/bin/env node

//使用指定的模板初始化一个 definejs 打包框架项目。
//
//用法：
//  definejs init <template-name> [project-name] 使用指定的模板初始化一个 definejs 打包框架项目。
//参数：
//  <template-name> 必选，要使用的模板。 可用的值有 `mobile`、`pc`。 可以加上具体的版本号，如 `pc@1.0.3`。
//  [project-name]  可选，要新建的项目名称。 如果指定，则在当前目录下新建一个子目录作为项目专用目录。
//示例：
//  definejs init pc
//  definejs init pc@1.0.3
//  definejs init pc definejs-pc
//  definejs init pc@1.0.3 definejs-pc
//
//  definejs init mobile
//  definejs init mobile@1.0.2
//  definejs init mobile definejs-mobile
//  definejs init mobile@1.0.2 definejs-mobile


require('colors');

const { program, } = require('commander');
const NPM = require('./init/NPM');

program.usage('<template-name> [project-name]');
program.option('-f, --force', 'force overwite the target config.js file when it is existed.');
program.parse(process.argv);

let opts = program.opts();
let args = program.args;

if (args.length < 1) {
    return program.help();
}

let template = args[0];
let project = args[1];

NPM.download(template, project, opts.force);





