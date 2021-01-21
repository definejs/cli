
const path = require('path');
const fs = require('fs');
const File = require('@definejs/file');


//加载指定文件的配置对象。
function load(name) {
    let cwd = process.cwd();
    let file = path.join(cwd, name);

    return fs.existsSync(file) ? require(file) : null;

}


//合并配置对象。
function merge(config, opts) {
    
    //先处理一级的。
    [
        'install',
    ].forEach((key) => {
        let value = opts[key];
        let has = (key in opts) && value !== undefined;

        if (has) {
            config[key] = value;
        }
    });

    config.packages = config.packages || [];
   

    //这些都是必需字段。
    let invalid =
        !config.outputDir ||
        !config.tempDir ||
        !config.globalExports ||
        !config.globalExports.name;
    
    return invalid ? null : config;

}




module.exports = exports = {
    name: 'definejs.packer.config.js', //默认文件名，只读。

    get(opts) {
        let file = opts.config || exports.name;
        let config = load(file);

        if (!config) {
            console.log(`Not Found:`.bold.red, `${file.underline.red}`);
            if (opts.config) {
                console.log(`Please make sure the specific config file is existed.`.red);
            }
            else {
                console.log(`Please mask sure the current directory has a default config file.`.red);
            }
            console.log(`Or you should run command first:`.bold);
            console.log(`└──`, `definejs init`.blue);
            return;
        }

        config = merge(config, opts);
        
        if (!config) {
            console.log(`Invalid:`.red, `the file '${file}' exports an invalid config object.`.red);
            return;
        }
        

        return config;

    },


    /**
    * 复制指定类型的配置文件到目标路径。
    * @param {*} type 配置文件类型，取值有 `default`、`mobile`、`pc`。
    * @param {*} dest 目标路径。
    */
    copy(type, dest) {
        let src = path.join(__dirname, '../config', `${type}.js`);
        let cwd = process.cwd();
        // let src1 = path.relative(cwd, src);
        let dest1 = path.relative(cwd, dest);

        File.copy(src, dest);

        console.log('copy'.bgCyan, src.underline.cyan, '→', dest1.underline.cyan)
    },

};