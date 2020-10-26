fs = require('fs');
const config = require('../config.json')
const {CommandoClient} = require('discord.js-commando');
const client = new CommandoClient({
    commandPrefix: config.prefix,
    owner: config.owner
});

function readChat() {
    fs.watch(config.minecraft.logLocation, (curr, prev) => {
        fs.readFile(config.minecraft.logLocation, 'utf-8', async (err, data) => {

            let regex = /<\w{3,16}> [\w\S ]*$/;
            let lines = data.trim().split("\n");
            let lastLine = lines[lines.length - 1];
            let chatMsg = lastLine.match(regex);
        

            if (chatMsg != null) {
                let messageContent = `${config.emojis.minecraft} ${chatMsg[0]}`;

                let guildList = client.guilds.array();
                console.log(guildList);


                console.log(`Sent message "${chatMsg[0]}" to ${chatChannelName.toString()}.`)
            }
        });
    });
}

module.exports = {readChat};