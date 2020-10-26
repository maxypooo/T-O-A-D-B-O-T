fs = require('fs');
const config = require('../config.json')

function readChat(chatChannelName) {
    fs.watch(config.minecraft.logLocation, (curr, prev) => {
        fs.readFile(config.minecraft.logLocation, 'utf-8', (err, data) => {
            if (!chatChannelName) return;

            let regex = /<\w{3,16}> [\w\S ]*$/;
            let lines = data.trim().split("\n");
            let lastLine = lines[lines.length - 1];
            let chatMsg = lastLine.match(regex);
        

            if (chatMsg != null) {
                let messageContent = `${config.emojis.minecraft} ${chatMsg[0]}`;
                await Promise.all(client.channels.filter(c => c.name === chatChannelName).map(c => c.send(messageContent)));
                console.log(`Sent message "${chatMsg[0]}" to ${chatChannelName.toString()}.`)
            }
        });
    });
}

module.exports = {readChat};