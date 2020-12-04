
const path = require('path');
const fs = require('fs');
const File = require('@definejs/file');


//加载指定文件的配置对象。
function load(name) {
    let NAME = 'config.js';     //默认值。
    let cwd = process.cwd();
    let file = path.join(cwd, name || NAME);
    let config = null;

    if (!name) { //没指定值，则使用了默认值，检测是否存在文件。
        if (fs.existsSync(file)) {
            config = require(file);
        }
    }
    else { //已指定为其它的，则当作存在该文件去加载。 如果不存在，则加载会报错（这是我们想要的）。
        config = require(file);
    }

    return config;
}



//合并配置对象。
function merge(config, opts) {
    config = config || {};

    //先处理一级的。
    [
        'install',
        'packages',
        'tempDir',
        'outputDir',
        'copyDir',
    ].forEach((key) => {
        let value = opts[key];
        let has = (key in opts) && value !== undefined;

        if (has) {
            config[key] = value;
        }
    });

    //再处理二级的。
    let globalExports = config.globalExports || {};

    [
        { src: 'globalName', target: 'name', },
        { src: 'globalBind', target: 'bind', },

    ].forEach(({ src, target, }) => {
        let value = opts[src];
        let has = (src in opts) && value !== undefined;

        if (has) {
            globalExports[target] = value;
        }
    });

    config.packages = config.packages || [];
    config.globalExports = globalExports;

    return config;

}




module.exports = {

    get(opts) {
        let { config, } = opts;

        config = load(config);
        config = merge(config, opts);

        //这些都是必需字段。
        let invalid =
            !config.outputDir ||
            !config.tempDir ||
            !config.globalExports || 
            !config.globalExports.name;


        return invalid ? null : config;

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
        // let dest1 = path.relative(cwd, dest);

        File.copy(src, dest);
        console.log('copy'.bgGreen, src.green, '->', dest.green)
    },

};