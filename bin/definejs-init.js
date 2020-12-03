
require('colors');

const path = require('path');
const File = require('@definejs/file');
const { program, } = require('commander');
const inquirer = require('inquirer');
const Config = require('../modules/Config');

program.usage('<template-name> [project-name]');
program.parse(process.argv);

if (program.args.length < 1) {
    return program.help();
}

let type = program.args[0];
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

if (File.exists(dest)) {
    console.log('target'.yellow, 'config.js'.magenta, 'is already existed.'.yellow);
    prompt();
}
else {
    copy();
}
