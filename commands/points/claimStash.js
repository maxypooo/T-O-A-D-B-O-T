const { Command } = require('discord.js-commando');
const config = require('../../config.json')
const modelToadPoints = require("../../utility/models/modelToadPoints")
const Discord = require("discord.js")


module.exports = class ClaimStashCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'claimstash',
            aliases: ['stash', "claim"],
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
                let embed = new Discord.MessageEmbed()
                    .setAuthor("T O A D S T A C K E R S Banking Co.", 'https://i.imgur.com/MMh4NRQ.png')
                    .setTitle(`${msg.author.username}'s ToadBucks:tm: Stash`)
                    .setDescription(`${msg.author.username} claimed **${stashValue}** ToadBucks:tm:!`)
                    .setColor('#D6B704')
                    .setThumbnail(msg.author.displayAvatarURL())
                    .setFooter('Claim your stash with "toad stash"\n\n')
                    .setTimestamp();
                msg.say(embed);
            })
        })
    }
};