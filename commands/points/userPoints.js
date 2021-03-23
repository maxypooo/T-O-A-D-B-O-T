const { Command } = require('discord.js-commando');
const config = require('../../config.json')
const modelToadPoints = require("../../utility/models/modelToadPoints")
const Discord = require('discord.js')

module.exports = class PointsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'points',
            aliases: ['pts', 'toadbucks', 'bucks'],
            group: 'points',
            memberName: 'points',
            description: 'Display how many points you have.',
            examples: [`${config.prefix} points`],
        });
    }

    async run(msg) {
        msg.delete();
        modelToadPoints.get({discordID: msg.author.id}, function(err, user) {
            if (err) {
                return console.log(err);
            }
            if (user == undefined) {
                return msg.reply(`you haven't earned any ToadBucks:tm: yet. Earn ToadBucks:tm by joining a voice channel and hanging out.`)
            }
            let embed = new Discord.MessageEmbed()
            .setAuthor("T O A D S T A C K E R S Banking Co.", 'https://i.imgur.com/MMh4NRQ.png')
            .setTitle(`${msg.author.username}'s ToadBucks:tm: Account Balance`)
            .setDescription(`${msg.author.username} has **${user.points}** ToadBucks:tm:!`)
            .setColor('#3E8B9B')
            .setThumbnail(msg.author.displayAvatarURL())
            .setFooter('View your balance with "toad points"\n\n')
            .setTimestamp();
            msg.say(embed);
        })
    }
};