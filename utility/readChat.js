fs = require('fs');
const config = require('../config.json')


function readChat() {
    fs.watchFile(config.minecraft.logLocation, (curr, prev) => {
        console.log(`the current mtime is: ${curr.mtime}`);
        console.log(`the previous mtime was: ${prev.mtime}`);
    });
}

module.exports = {readChat};