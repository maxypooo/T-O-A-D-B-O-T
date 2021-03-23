const { Command } = require('discord.js-commando');
const config = require('../../config.json')
const modelToadPoints = require("../../utility/models/modelToadPoints")

module.exports = class ClaimStashCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'claim',
            aliases: ['stash'],
            group: 'points',
            memberName: 'claimstash',
            description: 'Claim your stash once every 30 minutes.',
            throttling: {
                usages: 1,
                duration: 1800
            },
            examples: [`${config.prefix} points`],
        });
    }

    async run(msg) {
        const minStash = 3;
        const maxStash = 8;
        const stashValue = Math.floor(Math.random() * (maxStash - minStash + 1) + minStash);
        modelToadPoints.get({discordID: msg.author.id}, function(err, user) {
            if (err) {
                return console.log(err);
            }
            if (user == undefined) {
                return msg.reply(`you haven't earned any ToadBucks:tm: yet. :(`)
            }
            modelToadPoints.update({discordID: msg.author.id}, {$ADD: {points: stashValue}}, function(err, user) {
                if (err) {
                    return console.log(err);
                }
                if (user == undefined) {
                    return msg.reply(`you haven't earned any ToadBucks:tm: yet. You need to have earned at least 1 ToadBuck:tm: to claim a stash. :(`)
                }
                msg.reply(`you claimed **${stashValue}** ToadBucks:tm:! ${config.emojis.toadleft}`);
            })
        })
    }
};