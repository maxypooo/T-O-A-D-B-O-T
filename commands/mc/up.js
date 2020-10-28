const { Command } = require('discord.js-commando');
const config = require('../../config.json')
const { exec } = require("child_process");
const modelDiscordMinecraft = require("../../utility/models/modelDiscordMinecraft")

module.exports = class UpCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'up',
            group: 'mc',
            memberName: 'up',
            description: 'Makes you go up X amount of blocks.',
            throttling: {
                usages: 2,
                duration: 3600
            },
            examples: [`${config.prefix} up 20`],
            args: [{
                key: 'num',
                prompt: 'What do you want to say?',
                type: 'integer',
                validate: num => {
                    if (num < 1 || num > 128) 
                        return 'Amount must be greater than 0 and less than 128 blocks.';
                    return true;  
                }
            }],
        });
    }

    async run(msg, args) {
        modelDiscordMinecraft.query("discordID").eq(msg.author.id).exec()
        .then(results => {
            if (results[0] == undefined) {
                console.log("User not in database.");
                msg.reply(`You must first verify yourself using \`${config.prefix} verify\` before you can use this command.`)
            } else {
                exec(`screen -S minecraft -X stuff "tellraw ${results[0].minecraftUser} {\"text\":\"You've been granted Spectator Mode for 30 seconds.\",\"italic\":true,\"color\":\"dark_green\"}\n"`);
                exec(`screen -S minecraft -X stuff "tellraw ${results[0].minecraftUser} {\"text\":\"[Click Here to return to Survival Mode early.]\",\"italic\":true,\"color\":\"dark_red\",\"clickEvent\":{\"action\":\"run_command\",\"value\":\"/gamemode survival\"}}\n"`);
                exec(`screen -S minecraft -X stuff "effect give ${results[0].minecraftUser} minecraft:slow_falling 30\n"`);
                exec(`screen -S minecraft -X stuff "execute at ${results[0].minecraftUser} run particle minecraft:cloud ~ ~ ~ 0 0 0 0.1 15000\n"`);
                exec(`screen -S minecraft -X stuff "tp ${results[0].minecraftUser} ~ ~${args.num} ~\n"`);
            }
        });
    }
};