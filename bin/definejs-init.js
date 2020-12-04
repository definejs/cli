
require('colors');

const path = require('path');
const File = require('@definejs/file');
const { program, } = require('commander');
const inquirer = require('inquirer');
const Config = require('../modules/Config');

program.usage('<template-name> [project-name]');
program.option('-f, --force', 'force overwite the target config.js file when it is existed.');
program.parse(process.argv);

let opts = program.opts();
let type = program.args[0];

if (!type) {
    type = 'default';
    console.log(`param <template-name> is not specified, it's value will be`.yellow, ` 'default'`.magenta);
}

let dir = program.args[1] || '';
let cwd = process.cwd();
let dest = path.join(cwd, dir, 'config.js');



function copy() {
    Config.copy(type, dest);

    if (dir) {
        console.log('Please change directory to'.magenta, dir.yellow);
    }
}

function  prompt() {
    inquirer.prompt([
        {
            name: 'overwrite',
            type: 'input',
            message: 'overwrite? ' + 'Y/N'.cyan,
        },
    ]).then((answer) => {
        let { overwrite, } = answer;
        
        overwrite = overwrite.toUpperCase();

        if (overwrite == 'N') {
            return;
        }

        if (overwrite == 'Y') {
            copy();
        }
        else {
            prompt();
        }
    });
}

//没有显式指定要强制覆盖，且已存在目标文件，则弹出确认提示。
if (!opts.force && File.exists(dest) ) {
    console.log('target'.yellow, 'config.js'.magenta, 'is already existed.'.yellow);
    prompt();
}
else {
    copy();
}
