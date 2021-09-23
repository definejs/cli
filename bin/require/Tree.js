
require('colors');
const path = require('path');

module.exports = {
    render(id$files, dir) {
        let ids = Object.keys(id$files).sort();

        ids.forEach((id) => {
            // if (id.startsWith('./') || id.startsWith('../')) {
            //     return;
            // }

            console.log(`  ${id.green}`);


            let files = id$files[id];
            let maxIndex = files.length - 1;

            files.forEach((file, index) => {
                let linker = index == maxIndex ? `└──` : `├──`;
                let name = path.relative(dir, file);
                
                console.log(`  ${linker.grey} ${name.grey}`);
            });

        });
    },
};