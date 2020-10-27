const { Command } = require('discord.js-commando');
const config = require('../../config.json')
const { exec } = require("child_process");

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

        const chatChannelName = msg.client.channels.cache.filter(ch => ch.name === `${config.minecraft.chatChannelName}`);
        let messageContent = `${config.emojis.discord} <${msg.author.username}> ${args.words}`;
        exec(`screen -S minecraft -X stuff "say [Discord - ${msg.author.username}] ${args.words}\n"`);
        await Promise.all(chatChannelName.map(c => c.send(messageContent)));
    }

};