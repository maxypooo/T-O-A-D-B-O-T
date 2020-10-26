fs = require('fs');
const config = require('../config.json')
const Discord = require('discord.js');
const client = new Discord.Client();

function readChat() {
    fs.watch(config.minecraft.logLocation, (curr, prev) => {
        // console.log(`the current mtime is: ${curr.mtime}`);
        // console.log(`the previous mtime was: ${prev.mtime}`);
        fs.readFile(config.minecraft.logLocation, 'utf-8', (err, data) => {
            let lines = data.trim().split("\n");
            let lastLine = lines[lines.length - 1];
            client.channels.fetch(config.minecraft.chat)
            .then(channel => {
                channel.send(lastLine);
                console.log(`Sent message "${lastline}" to ${channel.toString()}.`)
            })
        });
    });
}

module.exports = {readChat};