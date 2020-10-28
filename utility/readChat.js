fs = require('fs');
const config = require('../config.json')
const {CommandoClient} = require('discord.js-commando');
const client = new CommandoClient({
    commandPrefix: config.prefix,
    owner: config.owner
});
const Entry = require("../utility/models/modelDiscordMinecraft")


function readChat(chatChannelName) {
    fs.watch(config.minecraft.logLocation, (curr, prev) => {
        fs.readFile(config.minecraft.logLocation, 'utf-8', async (err, data) => {

            let regex = /<\w{3,16}> [\w\S ]*$/;
            let lines = data.trim().split("\n");
            let lastLine = lines[lines.length - 1];
            let chatMsg = lastLine.match(regex); //need to return this to Verify()
            
            if (chatMsg != null) { 
                let messageContent = `${config.emojis.minecraft} ${chatMsg[0]}`;
                chatChannelName.map(c => c.send(messageContent));
                console.log(`Sent message "${chatMsg[0]}" from Minecraft.`)
            }
        });
    });
}

//TODO: TIMEOUT THE THING SO IT DOESN'T LAST FOREVER IN VERIFY
function verifyCode(code, msg) {
    let watcher = fs.watch(config.minecraft.logLocation, (curr, prev) => {
        fs.readFile(config.minecraft.logLocation, 'utf-8', async (err, data) => {

            let regex = /<\w{3,16}> [\w\S ]*$/;
            let lines = data.trim().split("\n");
            let lastLine = lines[lines.length - 1];
            let chatMsg = lastLine.match(regex);
            
            if (chatMsg != null) { 
                if (chatMsg[0].includes(code)) {
                    setTimeout(function(){
                        watcher.close();
                    }, 120000);
                    console.log("Code found! Verification pog!");
                    let mcUsername = chatMsg[0].substring(chatMsg[0].lastIndexOf("<") + 1, chatMsg[0].lastIndexOf(">"));
                    let entry = new Entry();
                    entry.discordID = msg.author.id;
                    entry.discordUser = msg.author.username;
                    entry.minecraftUser = mcUsername;
                    entry.save({overwrite: false}, 
                        function(err){
                        if(err) {
                            if (err.code === 'ConditionalCheckFailedException' && err.statusCode === 400)
                                console.log('discord id already exists.');
                            else
                                console.log(err);
                        }
                        msg.reply("Verification Successful! You can now use commands which require verification.");
                    });
                }
            } 
        });
    });
}

module.exports = {readChat, verifyCode};