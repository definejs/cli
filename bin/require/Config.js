
const File = require('@definejs/file');

const name = `requirer.config.js`; //默认使用的配置文件名。

module.exports = {
    read(dir) {
        let file = `${dir}/${name}`;

        if (!File.exists(file)) {
            return {};
        }

        let config = require(file);
        return config;
    },
};