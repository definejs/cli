
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
    let file = `${config.outputDir}config-lock.json`;
    File.writeJSON(file, config);

    console.log(`---- definejs pack success ----`.green);

    let done = config.done;
    done && done(config, metaInfo);
});

