const { Command } = require('discord.js-commando');
const config = require('../../config.json')
const { exec } = require("child_process");

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
                duration: 600
            },
            examples: [`${config.prefix} spectate Zerukai`],
            args: [{
                key: 'mc_user',
                prompt: 'Type your Minecraft Username.',
                type: 'string',
            }]
        });
    }

    async run(msg, args) {
        msg.say(`${config.emojis.toadright} Granted ${args.mc_user} Specatator Mode for 30 seconds. ${config.emojis.toadleft}`);
        exec(`screen -S minecraft -X stuff "tellraw ${args.mc_user} {\"text\":\"You've been granted Spectator Mode for 30 seconds.\",\"italic\":true,\"color\":\"dark_green\"}\n"`);
        exec(`screen -S minecraft -X stuff "tellraw ${args.mc_user} {\"text\":\"[Click Here to return to Survival Mode early.]\",\"italic\":true,\"color\":\"dark_red\",\"clickEvent\":{\"action\":\"run_command\",\"value\":\"/gamemode survival\"}}\n"`);
        exec(`screen -S minecraft -X stuff "gamemode spectator ${args.mc_user}\n"`);
        
        setTimeout(function(){
            exec(`screen -S minecraft -X stuff "gamemode survival ${args.mc_user}\n"`);
        }, 30000);
    }
};