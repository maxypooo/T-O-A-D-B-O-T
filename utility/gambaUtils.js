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
            .setThumbnail('https://i.imgur.com/MMh4NRQ.png')
            .setTimestamp();

            let valueRatio1 = 0;
            let valueRatio2 = 0;
            if (gambaInfo[0].optionOnePoints != 0) {
                if (((gambaInfo[0].optionOnePoints + gambaInfo[0].optionTwoPoints)/gambaInfo[0].optionOnePoints) == 1) {
                    valueRatio1 = `(One-Sided 20% Bonus) 1:1.2`;
                } else {
                    valueRatio1 = `1:${((gambaInfo[0].optionOnePoints + gambaInfo[0].optionTwoPoints)/gambaInfo[0].optionOnePoints).toFixed(2)}`;
                }
            }
            if (gambaInfo[0].optionTwoPoints != 0) {
                if (((gambaInfo[0].optionOnePoints + gambaInfo[0].optionTwoPoints)/gambaInfo[0].optionTwoPoints) == 1) {
                    valueRatio2 = `(One-Sided 20% Bonus) 1:1.2`;
                } else {
                    valueRatio2 = `1:${((gambaInfo[0].optionOnePoints + gambaInfo[0].optionTwoPoints)/gambaInfo[0].optionTwoPoints).toFixed(2)}`;
                }
            }

            if (gambaInfo[0].winner == 1 || gambaInfo[0].winner == 2) { //winner chosen
                embed.addFields(
                    { name: "__WINNER!!!__", value: `**${(gambaInfo[0].winner == 1 ? gambaInfo[0].optionOneTxt : gambaInfo[0].optionTwoTxt)}**`, inline: false},
                    { name: "__Option 1__", value: gambaInfo[0].optionOneTxt, inline: true},
                    { name: "__Votes__", value: gambaInfo[0].optionOneVoters, inline: true}, //o1
                    { name: "__Points Bet__", value: gambaInfo[0].optionOnePoints, inline: true}, //o1
                    { name: "__Option 2__", value: gambaInfo[0].optionTwoTxt + "\n", inline: true},
                    { name: "__Votes__", value: gambaInfo[0].optionTwoVoters, inline: true}, //o2
                    { name: "__Points Bet__", value: gambaInfo[0].optionTwoPoints, inline: true}, //o2
                    { name: "__Total Points Bet__", value: gambaInfo[0].optionOnePoints + gambaInfo[0].optionTwoPoints, inline: true},
                    { name: "__Return Ratios__", value: valueRatio1 + " | " + valueRatio2, inline: true},
                )            
                .setColor('#E30BBB                                                                                                                                                                                                                              ');
            } else if (gambaInfo[0].winner == 0) { //refund
                embed.addFields(
                    { name: "__WINNER!!!__", value: `**Points Refunded**`, inline: false},
                    { name: "__Option 1__", value: gambaInfo[0].optionOneTxt, inline: true},
                    { name: "__Votes__", value: gambaInfo[0].optionOneVoters, inline: true}, //o1
                    { name: "__Points Bet__", value: gambaInfo[0].optionOnePoints, inline: true}, //o1
                    { name: "__Option 2__", value: gambaInfo[0].optionTwoTxt + "\n", inline: true},
                    { name: "__Votes__", value: gambaInfo[0].optionTwoVoters, inline: true}, //o2
                    { name: "__Points Bet__", value: gambaInfo[0].optionTwoPoints, inline: true}, //o2
                    { name: "__Total Points Bet__", value: gambaInfo[0].optionOnePoints + gambaInfo[0].optionTwoPoints, inline: false},
                    { name: "__Return Ratios__", value: valueRatio1 + " | " + valueRatio2, inline: true},
                )
                .setColor('#E09010');
            } else { //stats info
                embed.addFields(
                    { name: "__Option 1__", value: gambaInfo[0].optionOneTxt, inline: true},
                    { name: "__Votes__", value: gambaInfo[0].optionOneVoters, inline: true}, //o1
                    { name: "__Points Bet__", value: gambaInfo[0].optionOnePoints, inline: true}, //o1
                    { name: "__Option 2__", value: gambaInfo[0].optionTwoTxt + "\n", inline: true},
                    { name: "__Votes__", value: gambaInfo[0].optionTwoVoters, inline: true}, //o2
                    { name: "__Points Bet__", value: gambaInfo[0].optionTwoPoints, inline: true}, //o2
                    { name: "__Total Points Bet__", value: gambaInfo[0].optionOnePoints + gambaInfo[0].optionTwoPoints, inline: false},
                    { name: "__Return Ratios__", value: valueRatio1 + " | " + valueRatio2, inline: true},
                )
                .setColor('#3E8B9B');
            }


            msg.say(embed);
        });

    }
}