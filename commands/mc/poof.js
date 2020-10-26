/* Initial imports, do not remove these. You can add
   more as you wish. */
const { Command } = require('discord.js-commando');
const config = require('../../config.json')
const { exec } = require("child_process");


/* This is the templateCommand command.
   You can copy this file into your folder and replace it to make a new
   command from scratch. You will need to change the class name and
   file name, as well as the template strings in the file to suit
   what your command needs. To see what all is available to you,
   read the documentation below. 
   https: //discord.js.org/#/docs/commando/master/general/welcome */
module.exports = class PoofCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'poof',
            group: 'mc',
            memberName: 'poof',
            description: 'Plays some distracting particle effects at the target user.',
            throttling: { //Throttles the command so you can only use it 1 time every 30 seconds.
                usages: 1,
                duration: 600
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