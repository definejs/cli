#!/usr/bin/env node

//用来提取和分析一个开发包中所有的 require 到的包名，并对比 package.json 中 dependencies 字段中提供的包。  
//给出结论是否需要在 dependencies 字段中增加缺少的包，或删除多余的（没有实际 require 到）的包。
//此工具仅用于辅助检查，给出的结论还要结合人工具体识别。
//
//示例：
// definejs require

require('colors');

const { program, } = require('commander');
const Requirer = require('@definejs/requirer');
const Config = require('./require/Config');
const Tree = require('./require/Tree');

//解析命令行参数。
program.parse(process.argv);

let dir = program.args[0] || process.cwd();
let pkg = require(`${dir}/package.json`);
let config = Config.read(dir);

console.log(dir.yellow.underline, `==>`, `${pkg.name}@${pkg.version}`.bgCyan);


let {
    dependencies,
    ids,
    id$files,
    needAdds,
    needDeletes,
} = Requirer.parse(dir, config.patterns);



console.log(`dependencies:`.bold, dependencies);
console.log(`requires:`.bold, ids);
console.log(`id$files:`.bold);

Tree.render(id$files, dir);


let hasError = false;

if (needAdds.length > 0) {
    hasError = true;
    console.log('needAdds ==>'.bold.red, needAdds);
}

if (needDeletes.length > 0) {
    hasError = true;
    console.log('needDeletes ==>'.bold.magenta, needDeletes);
}

if (!hasError) {
    console.log(` ---- ALL OK ---- `.bgGreen);
}