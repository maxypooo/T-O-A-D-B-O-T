const { Command } = require('discord.js-commando');
const config = require('../../config.json')
const { exec } = require("child_process");
const dbUtils = require('../../utility/dbUtils')
const modelDiscordMinecraft = require("../../utility/models/modelDiscordMinecraft")

module.exports = class SpectatorCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'spectate',
            aliases: ['spectator', 'spec', 'sp'],
            group: 'mc',
            memberName: 'spectate',
            description: 'Places the target into Spectator Mode for 30 seconds.',
            throttling: {
                usages: 2,
                duration: 3600
            },
            examples: [`${config.prefix} spectate Zerukai`],
        });
    }

    async run(msg, args) {
        modelDiscordMinecraft.query("discordID").eq(msg.author.id).exec()
        .then(results => {
            if (results[0] == undefined) {
                console.log("User not in database.");
                msg.reply(`You must first verify yourself using \`${config.prefix} verify\` before you can use this command.`)
            } else {
                msg.say(`${config.emojis.toadright} Granted ${results[0].minecraftUser} Specatator Mode for 30 seconds. ${config.emojis.toadleft}`);
                exec(`screen -S minecraft -X stuff "tellraw ${results[0].minecraftUser} {\"text\":\"You've been granted Spectator Mode for 30 seconds.\",\"italic\":true,\"color\":\"dark_green\"}\n"`);
                exec(`screen -S minecraft -X stuff "tellraw ${results[0].minecraftUser} {\"text\":\"[Click Here to return to Survival Mode early.]\",\"italic\":true,\"color\":\"dark_red\",\"clickEvent\":{\"action\":\"run_command\",\"value\":\"/gamemode survival\"}}\n"`);
                exec(`screen -S minecraft -X stuff "gamemode spectator ${results[0].minecraftUser}\n"`);

                setTimeout(function(){
                    exec(`screen -S minecraft -X stuff "gamemode survival ${results[0].minecraftUser}\n"`);
                }, 30000);
            }
        });
    }
};