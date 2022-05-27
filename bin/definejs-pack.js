#!/usr/bin/env node

//开始打包。
//当前工作目录下必须存在 `definejs.packer.config.js` 配置文件。
//建议先用 `definejs init <template-name> [project-name]` 命令进行初始化以下载相应的模板，
//然后根据实际需要修改 [project-name] 目录中的 `definejs.packer.config.js` 配置文件后，
//再进行运行 `definejs pack` 进行打包。
//
//示例：
//  definejs pack

const { program, } = require('commander');
const { pack, } = require('@definejs/packer');
const File = require('@definejs/file');
const Config = require('./pack/Config');

let config = Config.get();

if (!config) {
    return;
}


program.option('-i, --install', 'run command `npm install`');

//解析命令行参数。
program.parse(process.argv);

let opts = program.opts();
let args = program.args;

if (typeof opts.install == 'boolean') {
    config.install = opts.install;
}



pack(config, function (config, metaInfo) {
    //输出最终的 config 以供查阅。
    File.writeJSON(`${config.outputDir}config.json`, config);

    //输出最终的依赖包对应的具体版本号，以供查阅。
    File.writeJSON(`${config.outputDir}info.json`, metaInfo);
    File.writeJSON(`${config.outputDir}dependencies.json`, metaInfo.name$version);


    console.log(`---- definejs pack success ----`.green);

    let done = config.done;
    done && done(config, metaInfo);
});

