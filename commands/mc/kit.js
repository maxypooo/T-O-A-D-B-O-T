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
module.exports = class QueryCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'query',
            group: 'mc',
            memberName: 'query',
            description: 'Gives you a kit.',
            throttling: { //Throttles the command so you can only use it 1 time every 30 seconds.
                usages: 1,
                duration: 86400
            },
            examples: [`${config.prefix} spectate Zerukai`],
            args: [{
                key: 'kit_type',
                prompt: 'Type your Minecraft Username.',
                type: 'string',
            }]
        });
    }

    async run(msg, args) {
        if (args.kit_type === "")
        exec(`screen -S minecraft -X stuff "gamemode spectator ${args.mc_user}\n"`);
        
        setTimeout(function(){
            exec(`screen -S minecraft -X stuff "gamemode survival ${args.mc_user}\n"`);
        }, 30000);
    }
};