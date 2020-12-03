#!/usr/bin/env node
const { program, } = require('commander');
const pkg = require('../package.json');

program.storeOptionsAsProperties(false);
program.version(pkg.version, '-v, --version');

//定义使用方法。
program.usage('<command> [options]');
program.command('init', 'generate a new project from a template.');
program.command('pack', 'pack modules of `@definejs` from NPM.');


//解析命令行参数。
program.parse(process.argv);

