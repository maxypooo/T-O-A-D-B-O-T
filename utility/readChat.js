fs = require('fs');
const config = require('../config.json')


function readChat() {
    fs.watchFile(config.minecraft.logLocation, (curr, prev) => {
        // console.log(`the current mtime is: ${curr.mtime}`);
        // console.log(`the previous mtime was: ${prev.mtime}`);
        fs.readFile(dir, 'utf-8', (err, data) => {
            let lines = data.trim().split("\n")
            console.log(lines[lines.length - 1])
        });
    });
}

module.exports = {readChat};