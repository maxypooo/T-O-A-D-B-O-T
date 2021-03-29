const { Command } = require('discord.js-commando');
const config = require('../../config.json')
const modelToadPoints = require("../../utility/models/modelToadPoints")
const Discord = require('discord.js')

module.exports = class LeaderboardCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'leaderboard',
            aliases: ['top', 'board', 'lb'],
            group: 'points',
            memberName: 'leaderboard',
            description: 'Display top 10 ToadBucks:tm: earners.',
            examples: [`${config.prefix} points`],
        });
    }

    async run(msg) {
        msg.delete();
        modelToadPoints.scan("points").gt(0).exec((err, pointsInfo) => {
            if (err) {
                return console.log(err);
            }
            if (pointsInfo == undefined) {
                return msg.reply(`you haven't earned any ToadBucks:tm: yet. Earn ToadBucks:tm by joining a voice channel and hanging out.`)
            }

            this.bubbleSort(pointsInfo);
            let desc = `1. **${pointsInfo[0].discordUser}** has **${pointsInfo[0].points}** ToadBucks:tm:!
            2. **${pointsInfo[1].discordUser}** has **${pointsInfo[1].points}** ToadBucks:tm:!
            3. **${pointsInfo[2].discordUser}** has **${pointsInfo[2].points}** ToadBucks:tm:!
            4. **${pointsInfo[3].discordUser}** has **${pointsInfo[3].points}** ToadBucks:tm:!
            5. **${pointsInfo[4].discordUser}** has **${pointsInfo[4].points}** ToadBucks:tm:!
            6. **${pointsInfo[5].discordUser}** has **${pointsInfo[5].points}** ToadBucks:tm:!
            7. **${pointsInfo[6].discordUser}** has **${pointsInfo[6].points}** ToadBucks:tm:!
            8. **${pointsInfo[7].discordUser}** has **${pointsInfo[7].points}** ToadBucks:tm:!
            9. **${pointsInfo[8].discordUser}** has **${pointsInfo[8].points}** ToadBucks:tm:!
            10. **${pointsInfo[9].discordUser}** has **${pointsInfo[9].points}** ToadBucks:tm:!`

            let embed = new Discord.MessageEmbed()
                .setAuthor("T O A D S T A C K E R S Banking Co.", 'https://i.imgur.com/MMh4NRQ.png')
                .setTitle(`ToadBucks:tm: Leaderboard`)
                .setDescription(desc)
                .setColor('#00FFB6')
                .setThumbnail('https://i.imgur.com/MMh4NRQ.png')
                .setFooter('View the leaderboard with "toad leaderboard"\n\n')
                .setTimestamp();
            msg.say(embed);
        })
    }

    // I know bubble sort is bad but for what I'm using it for it should be fine
    bubbleSort(inputArr) {
        let len = inputArr.length;
        let swapped;
        do {
            swapped = false;
            for (let i = 0; i < len - 1; i++) {
                if (inputArr[i].points < inputArr[i + 1].points) {
                    let tmp = inputArr[i];
                    inputArr[i] = inputArr[i + 1];
                    inputArr[i + 1] = tmp;
                    swapped = true;
                }
            }
        } while (swapped);
        return inputArr;
    };
};