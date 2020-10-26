fs = require('fs');
const config = require('../config.json')

function readChat(client) {
    fs.watch(config.minecraft.logLocation, (curr, prev) => {
        // console.log(`the current mtime is: ${curr.mtime}`);
        // console.log(`the previous mtime was: ${prev.mtime}`);
        fs.readFile(config.minecraft.logLocation, 'utf-8', (err, data) => {
            let lines = data.trim().split("\n");
            let lastLine = lines[lines.length - 1];
            console.log(`Sent message "${lastline}" to channel ${config.minecraft.chat}.`)
            client.channels.get(config.minecraft.chat).send(lastLine);
        });
    });
}

module.exports = {readChat};