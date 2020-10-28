const { Command } = require('discord.js-commando');
const config = require('../../config.json')
const { exec } = require("child_process");
const dbUtils = require('../../utility/dbUtils')
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

        Model.query(hashkey).eq(q).exec()
        .then(results => {
            if (results[0] == undefined) {
                console.log("User not in database.");
                msg.reply("You must first verify yourself using `toad verify` before you can use this command.")
            } else {
                console.log("Success! User was found.");
                msg.say(`${config.emojis.toadright} Minecraft Server will restart in 1 minute, check back soon. ${config.emojis.toadleft}`)
                exec(`screen -S minecraft -X stuff "say Server restart initiated by ${msg.author.username}. Server will restart in 1 minute.\n"`);
                setTimeout(function(){
                    exec(`screen -S minecraft -X stuff "say Server will restart in 10 seconds.\n"`);
                }, 50000);
                setTimeout(function(){
                    exec(`screen -S minecraft -X stuff "stop\n"`);
                }, 60000);
                }
        });

            
    }
};