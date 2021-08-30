
const { program, } = require('commander');
const { pack, } = require('@definejs/packer');
const File = require('@definejs/file');
const Config = require('../lib/Config');




//解析命令行参数。
program.parse(process.argv);


let config = Config.get();


if (!config) {
    return;
}

pack(config, (config, metaInfo) => {
    //输出最终的 config 以供查阅。
    File.writeJSON(`${config.outputDir}config.json`, config);

    //输出最终的依赖包对应的具体版本号，以供查阅。
    File.writeJSON(`${config.outputDir}info.json`, metaInfo);
    File.writeJSON(`${config.outputDir}dependencies.json`, metaInfo.name$version);


    console.log(`---- definejs pack success ----`.green);

    let done = config.done;
    done && done(config, metaInfo);
});

