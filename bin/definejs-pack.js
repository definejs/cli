
const { program, } = require('commander');
const { pack, } = require('@definejs/packer');
const File = require('@definejs/file');
const Config = require('../modules/Config');


program.option('-i, --install', 'install packages from npm.');
program.option('-u, --no-install', 'do not install packages from npm.');
program.option('-p, --packages <ids...>', 'set seed package names without prefix `@definejs/`.');
program.option('-n, --global-name <name>', 'set global exports name.')
program.option('-b, --global-bind <binds...>', 'bind module method to global exports.');
program.option('-t, --temp-dir <dir>', 'set temporary directory to download packages from npm.');
program.option('-o, --output-dir <dir>', 'set output directory to build packages to modules.');
program.option('-c, --copy-dir <dir>', 'copy builded modules to test directory.');
program.option('--config <file>', 'set config file.');

//解析命令行参数。
program.parse(process.argv);

let opts = program.opts();
let config = Config.get(opts);

if (!config) {
    console.log('Please make sure the current directory has the `config.js` file'.red);
    console.log('or the config object is valid.'.red);
    return;
}

pack(config, () => {
    //输出最终的 config 以供查阅。
    let file = `${config.outputDir}config-lock.json`;
    File.writeJSON(file, config);
});

