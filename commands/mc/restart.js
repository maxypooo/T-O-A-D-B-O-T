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

    async run(msg, args) {
        let toadright = '<:toadright:770118404480696322>';
        let toadleft = '<:toadleft:770118404857528360>';
        msg.say(`${toadright} Restarting the Minecraft Server, it should be up again in the next ~2 minutes. ${toadleft}`)
        exec(`screen -S minecraft -X stuff "say Server will restart in 1 minute.\n"`);
        setTimeout(function(){
            exec(`screen -S minecraft -X stuff "stop\n"`);
        }, 60000);
    }
};