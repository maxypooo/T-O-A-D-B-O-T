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
module.exports = class MCSayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'mcsay',
            aliases: ['say', 'mcs', "saymc", "mcchat"],
            group: 'mc',
            memberName: 'mcsay',
            description: 'Write say something to the Minecraft Server.',
            examples: [`${config.prefix} say Your message here`],
            args: [{
                key: 'words',
                prompt: 'What do you want to say?',
                type: 'string',
                validate: words => {
                    if (words.length < 50) return true;
                    return 'Message must be less than 50 characters in length.';
                }
            }],
        });
    }

    async run(msg, args) {
        exec(`screen -S minecraft -X stuff "say Discord Message from ${msg.author.username}: ${args.words}\n"`);
    }
};