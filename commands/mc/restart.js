const { Command } = require('discord.js-commando');
const config = require('../../config.json')
const { exec } = require("child_process");
const modelDiscordMinecraft = require("../../utility/models/modelDiscordMinecraft")

module.exports = class RestartCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'restart',
            aliases: ['reboot'],
            group: 'mc',
            memberName: 'restart',
            description: 'Restart the Minecraft Server. Usable once every 4 hours per person.',
            examples: [`${config.prefix} restart`],
            throttling: {
                usages: 1,
                duration: 14400
            },
        });
    }

    //TODO: VERIFICATION
    async run(msg, args) {
        modelDiscordMinecraft.query("discordID").eq(msg.author.id).exec()
        .then(results => {
            if (results[0] == undefined) {
                console.log("User not in database.");
                msg.reply(`You must first verify yourself using \`${config.prefix} verify\` before you can use this command.`)
            } else {
                console.log("Success! User was found.");
                msg.say(`${config.emojis.toadright} Minecraft Server will restart in 1 minute, check back soon. ${config.emojis.toadleft}`)
                exec(`screen -S minecraft -X stuff "say Server restart initiated by ${msg.author.username}. Server will restart in 1 minute.\n"`);

                // There is probably a better way to do this...
                setTimeout(function(){
                    exec(`screen -S minecraft -X stuff "say Server will restart in 10 seconds.\n"`);
                }, 50000);
                setTimeout(function(){
                    exec(`screen -S minecraft -X stuff "say Server will restart in 5 seconds.\n"`);
                }, 55000);
                setTimeout(function(){
                    exec(`screen -S minecraft -X stuff "say Server will restart in 4 seconds.\n"`);
                }, 56000);
                setTimeout(function(){
                    exec(`screen -S minecraft -X stuff "say Server will restart in 3 seconds.\n"`);
                }, 57000);
                setTimeout(function(){
                    exec(`screen -S minecraft -X stuff "say Server will restart in 2 seconds.\n"`);
                }, 58000);
                setTimeout(function(){
                    exec(`screen -S minecraft -X stuff "say Server will restart in 1 second.\n"`);
                }, 59000);
                setTimeout(function(){
                    exec(`screen -S minecraft -X stuff "stop\n"`);
                }, 60000);
                }
        });

            
    }
};