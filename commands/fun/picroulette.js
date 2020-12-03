/* Initial imports, do not remove these. You can add
   more as you wish. */
    const { Command } = require('discord.js-commando');
    const config = require('../../config.json')
    
    module.exports = class TemplateCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'picroulette',
            aliases: ['pr', 'picr'],
            group: 'fun',
            memberName: 'picroulette',
            description: 'RANDOM PICTURE TIME.',
            examples: [`${config.prefix} pr`],
        });
    }
    
    async run(msg, args) {
        let i;
        let rnd;
        let url = "https://prnt.sc/";
        for (i = 0; i < 6; i++)
        {
            picker = Math.floor(Math.random() * 2)
            if (picker == 0)
            {
                rnd = Math.floor(Math.random() * 10);

            } else if (picker == 1)
            {
                rnd = Math.random().toString(36).substring(2);
            }
           url += rnd;
        }
        msg.say(url);
        
    }
};