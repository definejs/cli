

const { exec, } = require('child_process');
const ora = require('ora');

const Home = require('./NPM/Home');
const Package = require('./NPM/Package');



module.exports = {

    download(template, project, force) {
        let home = Home.init(project, force);

        if (!home) {
            return;
        }


        let loading = ora();
        let pkg = `@definejs/template-${template}`;

        //先初始化一个空的 package.json 文件，
        //可以避免安装到含有 package.json 的父目录中。
        let cmd = `npm init -y && npm install ${pkg}`; 

        console.log('Start initializing...'.blue);
        loading.start(cmd.blue); //出现加载图标。


        exec(cmd, { 'cwd': home, }, function (error, stdout, stderr) {
            // console.log(stdout);

            if (error) {
                console.log('');
                console.log(`Initialization failed.`.red);
                loading.fail();
                console.log(error);
                return;
            }

          

            Package.render({ home, project, pkg, });


            loading.succeed();
            console.log('');
            console.log('Initialization completed!'.green);
            console.log('To get started, run commands:'.bold);

            //如果指定了子目录，则提示进入该目录。
            if (project) {
                console.log(`├──`, `cd ${project}`.blue);
            }

            console.log(`├──`, `npm install`.blue);
            console.log(`└──`, `definejs pack`.blue);

            

        });
    },
};