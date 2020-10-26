fs = require('fs');
const config = require('../config.json')

function readChat(chatChannelName) {
    fs.watch(config.minecraft.logLocation, (curr, prev) => {
        fs.readFile(config.minecraft.logLocation, 'utf-8', (err, data) => {
            if (!chatChannelName) return;

            let regex = /<\w{3,16}> [\w\S ]*$/;
            let lines = data.trim().split("\n");
            let lastLine = lines[lines.length - 1];
            let chatMsg = lastLine.match(regex)[0];

            if (chatMsg != null) {
                chatChannelName.send(`${config.emojis.minecraft} [Minecraft] ${chatMsg}`);
                console.log(`Sent message "${chatMsg}" to ${chatChannelName.toString()}.`)
            }
        });
    });
}

module.exports = {readChat};