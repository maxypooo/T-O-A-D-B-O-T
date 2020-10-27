const { Command } = require('discord.js-commando');
const config = require('../../config.json')
const { exec } = require("child_process");

module.exports = class PoofCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'poof',
            group: 'mc',
            memberName: 'poof',
            description: 'Plays some distracting particle effects at the target user.',
            throttling: {
                usages: 1,
                duration: 180
            },
            examples: [`${config.prefix} poof Zerukai`],
            args: [{
                key: 'mc_user',
                prompt: 'Who do you want to poof?',
                type: 'string',
            }]
        });
    }

    async run(msg, args) {
        msg.say(`${config.emojis.toadright} Poofed ${args.mc_user}! ${config.emojis.toadleft}`);
        exec(`screen -S minecraft -X stuff \"tellraw ${args.mc_user}"You were poofed by ${msg.author.username}!"\n\"`);
        exec(`screen -S minecraft -X stuff "execute at ${args.mc_user} run particle minecraft:totem_of_undying ~ ~ ~ 0 0 0 1 1500\n"`);
    }
};