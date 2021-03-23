const { Command } = require('discord.js-commando');
const config = require('../config.json')
const modelGambaInfo = require("./models/modelGambaInfo")
const Discord = require("discord.js")


module.exports = function() {
    this.getGambaInfo = function(msg, status) {

        modelGambaInfo.scan().exec((err, gambaInfo) => {
            if (err) {
                return console.log(err);
            }
            if (gambaInfo[0] == undefined) {
                return msg.reply('Could not find a gamba.')
            }
            
            embed = new Discord.MessageEmbed()
            .setTitle(`Gamba ${status}`)
            .setDescription(`${gambaInfo[0].prompt}`)
            .setColor('#3E8B9B')
            .setThumbnail('https://i.imgur.com/MMh4NRQ.png')
            .setTimestamp();

            let valueRatio1 = 0;
            let valueRatio2 = 0;
            if (gambaInfo[0].optionOnePoints != 0) {
                valueRatio1 = `1:${((gambaInfo[0].optionOnePoints + gambaInfo[0].optionTwoPoints)/gambaInfo[0].optionOnePoints).toFixed(2)}`;
            }
            if (gambaInfo[0].optionTwoPoints != 0) {
                valueRatio2 = `1:${((gambaInfo[0].optionOnePoints + gambaInfo[0].optionTwoPoints)/gambaInfo[0].optionTwoPoints).toFixed(2)}`;
            }

            console.log(gambaInfo[0].winner)
            if (gambaInfo[0].winner == 1 || gambaInfo[0].winner == 2) {
                embed.addFields(
                    { name: "__WINNER!!!__", value: `**${(gambaInfo[0].winner == 1 ? gambaInfo[0].optionOneTxt : gambaInfo[0].optionTwoTxt)}**`, inline: false},
                    { name: "__Option 1__", value: gambaInfo[0].optionOneTxt, inline: true},
                    { name: "__Votes (Opt 1)__", value: gambaInfo[0].optionOneVoters, inline: true}, //o1
                    { name: "__Points Bet (Opt 1)__", value: gambaInfo[0].optionOnePoints, inline: true}, //o1
                    { name: "__Option 2__", value: gambaInfo[0].optionTwoTxt + "\n", inline: true},
                    { name: "__Votes (Opt 2)__", value: gambaInfo[0].optionTwoVoters, inline: true}, //o2
                    { name: "__Points Bet (Opt 2)__", value: gambaInfo[0].optionTwoPoints, inline: true}, //o2
                    { name: "__Total Points Bet__", value: gambaInfo[0].optionOnePoints + gambaInfo[0].optionTwoPoints, inline: true},
                    { name: "__Return Ratios__", value: valueRatio1 + " | " + valueRatio2, inline: true},
                );
            } else if (gambaInfo[0].winner == 0) {
                embed.addFields(
                    { name: "__WINNER!!!__", value: `**Points Refunded**`, inline: false},
                    { name: "__Option 1__", value: gambaInfo[0].optionOneTxt, inline: true},
                    { name: "__Votes (Opt 1)__", value: gambaInfo[0].optionOneVoters, inline: true}, //o1
                    { name: "__Points Bet (Opt 1)__", value: gambaInfo[0].optionOnePoints, inline: true}, //o1
                    { name: "__Option 2__", value: gambaInfo[0].optionTwoTxt + "\n", inline: true},
                    { name: "__Votes (Opt 2)__", value: gambaInfo[0].optionTwoVoters, inline: true}, //o2
                    { name: "__Points Bet (Opt 2)__", value: gambaInfo[0].optionTwoPoints, inline: true}, //o2
                    { name: "__Total Points Bet__", value: gambaInfo[0].optionOnePoints + gambaInfo[0].optionTwoPoints, inline: false},
                    { name: "__Return Ratios__", value: valueRatio1 + " | " + valueRatio2, inline: true},
                );
            } else {
                embed.addFields(
                    { name: "__Option 1__", value: gambaInfo[0].optionOneTxt, inline: true},
                    { name: "__Votes (Opt 1)__", value: gambaInfo[0].optionOneVoters, inline: true}, //o1
                    { name: "__Points Bet (Opt 1)__", value: gambaInfo[0].optionOnePoints, inline: true}, //o1
                    { name: "__Option 2__", value: gambaInfo[0].optionTwoTxt + "\n", inline: true},
                    { name: "__Votes (Opt 2)__", value: gambaInfo[0].optionTwoVoters, inline: true}, //o2
                    { name: "__Points Bet (Opt 2)__", value: gambaInfo[0].optionTwoPoints, inline: true}, //o2
                    { name: "__Total Points Bet__", value: gambaInfo[0].optionOnePoints + gambaInfo[0].optionTwoPoints, inline: false},
                    { name: "__Return Ratios__", value: valueRatio1 + " | " + valueRatio2, inline: true},
                );
            }


            msg.say(embed);
        });

    }
}