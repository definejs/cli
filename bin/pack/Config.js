
const path = require('path');
const fs = require('fs');


//加载指定文件的配置对象。
function load(name) {
    let cwd = process.cwd();
    let file = path.join(cwd, name);

    return fs.existsSync(file) ? require(file) : null;

}


//检查配置对象。
function check(config) {

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

    get() {
        let file = exports.name;
        let config = load(file);

        if (!config) {
            console.log(`Not Found:`.bold.red, `${file.underline.red}`);
            console.log(`Please mask sure the current directory has a default config file: ${file}`.red);
            console.log(`Or you should run command first:`.bold);
            console.log(`└──`, `definejs init`.blue);
            return;
        }

        config = check(config);
        
        if (!config) {
            console.log(`Invalid:`.red, `the file '${file}' exports an invalid config object.`.red);
            return;
        }
        

        return config;

    },


    

};