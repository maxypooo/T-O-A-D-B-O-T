/* Initial imports, do not remove these. You can add
   more as you wish. */
const { Command } = require('discord.js-commando');
const config = require('../../config.json')
const modelToadPoints = require("../../utility/models/modelToadPoints")

module.exports = class PointsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'points',
            aliases: ['pts'],
            group: 'points',
            memberName: 'points',
            description: 'Display how many points you have.',
            throttling: {
                usages: 1,
                duration: 60
            },
            examples: [`${config.prefix} points`],
        });
    }

    async run(msg) {
        modelToadPoints.get({discordID: msg.author.id}, function(err, user) {
            if (err) {
                return console.log(err);
            }
            if (user == undefined) {
                return msg.reply(`you haven't earned any points yet. :(`)
            }
            msg.reply(`you have **${user.points}** points! ${config.emojis.toadleft}`);
        })
    }
};