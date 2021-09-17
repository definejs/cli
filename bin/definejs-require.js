require('colors');

const { program, } = require('commander');
const Requirer = require('@definejs/requirer');

//解析命令行参数。
program.parse(process.argv);

let dir = program.args[0] || process.cwd();
let pkg = require(`${dir}/package.json`);

console.log(dir.yellow.underline);
console.log(`${pkg.name}@${pkg.version}`.cyan.bold);


let {
    dependencies,
    ids,
    needAdds,
    needDeletes,
} = Requirer.parse(dir);

let hasError = false;


console.log(`dependencies:`, dependencies);
console.log(`requires:`, ids);

if (needAdds.length > 0) {
    hasError = true;
    console.log('needAdds ==>'.red, needAdds);
}

if (needDeletes.length > 0) {
    hasError = true;
    console.log('needDeletes ==>'.magenta, needDeletes);
}

if (!hasError) {
    console.log(` ---- ALL OK ---- `.bgGreen);
}