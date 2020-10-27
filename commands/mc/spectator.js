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
        if (dbUtils.isInDB(modelDiscordMinecraft, "discordID", msg.author.id)) {
            let mcUser = dbUtils.getMinecraftUser(model, "discordID", msg.author.id);

            msg.say(`${config.emojis.toadright} Granted ${mcUser} Specatator Mode for 30 seconds. ${config.emojis.toadleft}`);
            exec(`screen -S minecraft -X stuff "tellraw ${mcUser} {\"text\":\"You've been granted Spectator Mode for 30 seconds.\",\"italic\":true,\"color\":\"dark_green\"}\n"`);
            exec(`screen -S minecraft -X stuff "tellraw ${mcUser} {\"text\":\"[Click Here to return to Survival Mode early.]\",\"italic\":true,\"color\":\"dark_red\",\"clickEvent\":{\"action\":\"run_command\",\"value\":\"/gamemode survival\"}}\n"`);
            exec(`screen -S minecraft -X stuff "gamemode spectator ${mcUser}\n"`);

            setTimeout(function(){
                exec(`screen -S minecraft -X stuff "gamemode survival ${mcUser}\n"`);
            }, 30000);
        } else {
            msg.reply("You must first verify yourself using `toad verify` before you can use this command.")
        }
    }
};