const { Command } = require('discord.js-commando');
const config = require('../../config.json')
const { exec } = require("child_process");

module.exports = class BirbCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'birb',
            group: 'mc',
            memberName: 'birb',
            description: 'Birb.',
            throttling: {
                usages: 1,
                duration: 86400
            },
            examples: [`${config.prefix} birb`],
        });
    }

    async run(msg, args) {
        //TODO: VERIFICATION
        msg.reply(`${config.emojis.toadright} You've got birb. ${config.emojis.toadleft}`);
        exec(`screen -S minecraft -X stuff \"tellraw ${args.mc_user}"You were poofed by ${msg.author.username}!"\n\"`);
        exec(`screen -S minecraft -X stuff "execute at ${args.mc_user} run summon parrot\n"`);
    }
};