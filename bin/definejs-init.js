
require('colors');

const path = require('path');
const { program, } = require('commander');
const inquirer = require('inquirer');
const fs = require('fs');
const Config = require('../lib/Config');


program.usage('<template-name> [project-name]');
program.option('-f, --force', 'force overwite the target config.js file when it is existed.');
program.parse(process.argv);

let opts = program.opts();
let type = program.args[0];

if (!type) {
    return program.help();
}

let dir = program.args[1] || '';
let cwd = process.cwd();
let dest = path.join(cwd, dir, Config.name);



//没有显式指定要强制覆盖，且已存在目标文件，则弹出确认提示。
if (!opts.force && fs.existsSync(dest) ) {
    console.log(`Target '${Config.name}' is already existed.`.red);
    prompt(copy);
}
else {
    copy();
}





function copy() {
    Config.copy(type, dest);

    console.log('Init completed!'.green);
    console.log('To get started, run command:'.bold);

    //如果指定了子目录，则提示进入该目录。
    if (dir) {
        console.log(`├──`, `cd ${dir}`.blue);
    }

    console.log(`└──`, `definejs pack`.blue);


}

function prompt(next) {
    inquirer.prompt([
        {
            name: 'overwrite',
            type: 'input',
            message: 'Overwrite? ' + 'Y/N'.cyan,
        },
    ]).then((answer) => {
        let { overwrite, } = answer;

        overwrite = overwrite.toUpperCase();

        if (overwrite == 'N') {
            return;
        }

        if (overwrite == 'Y') {
            next();
        }
        else {
            prompt(next);
        }
    });
}