const { Command } = require('discord.js-commando');
const config = require('../../config.json')
const modelToadPoints = require("../../utility/models/modelToadPoints")

module.exports = class ClaimStashCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'claim',
            aliases: ['stash', "claimstash"],
            group: 'points',
            memberName: 'claimstash',
            description: 'Claim your stash once every 30 minutes.',
            throttling: {
                usages: 1,
                duration: 1800
            },
            examples: [`${config.prefix} claim`],
        });
    }

    async run(msg) {
        // Generate a random stash value between the minimum and maximum values from the config file.
        const stashValue = Math.floor(Math.random() * (config.points.maxStash - config.points.minStash + 1) + config.points.minStash);

        // Query the points database to see if the user exists.
        modelToadPoints.get({discordID: msg.author.id}, function(err, user) {
            if (err) { return console.log(err); }
            if (user == undefined) { return msg.reply(`you haven't earned any ToadBucks:tm: yet. :(`); }

            // If the user exists, update the database by adding the stashValue to their points value.
            modelToadPoints.update({discordID: msg.author.id}, {$ADD: {points: stashValue}}, function(err, user) {
                if (err) { return console.log(err); }
                if (user == undefined) { return msg.reply(`you haven't earned any ToadBucks:tm: yet. You need to have earned at least 1 ToadBuck:tm: to claim a stash. :(`); }

                // Let the user know that they claimed their stash and how much.
                msg.reply(`you claimed **${stashValue}** ToadBucks:tm:! ${config.emojis.toadleft}`);
            })
        })
    }
};