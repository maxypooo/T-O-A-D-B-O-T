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
                    if (words.includes("\\n")) {return 'No command injection allowed you stinky cheat.'}
                    if (words.length <= 0 && words.length > 150) return 'Message must be between 1 and 150 characters in length.';
                    return true;  
                }
            }],
        });
    }

    async run(msg, args) {
        msg.delete();

        const chatChannelName = msg.client.channels.cache.find(ch => ch.name === `${config.minecraft.chatChannelName}`);
        let messageContent = `${config.emojis.discord} [${msg.author.username}] ${args.words}`;
                await Promise.all(client.channels.filter(c => c.name === chatChannelName).map(c => c.send(messageContent)));

        exec(`screen -S minecraft -X stuff "say [Discord] [${msg.author.username}] ${args.words}\n"`);
    }

};