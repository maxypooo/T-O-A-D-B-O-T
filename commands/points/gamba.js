const { Command } = require('discord.js-commando');
const config = require('../../config.json')
const {
    RichEmbed
} = require('discord.js');
const Discord = require("discord.js")
const modelGambaInfo = require("../../utility/models/modelGambaInfo")
const modelGambaPoints = require("../../utility/models/modelGambaPoints")
const modelToadPoints = require("../../utility/models/modelToadPoints");
const { options } = require('../../utility/models/modelToadPoints');

module.exports = class GambaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'gamba',
            aliases: ['bet'],
            group: 'points',
            memberName: 'gamba',
            description: 'Bet on an active Gamba.',
            throttling: {
                usages: 1,
                duration: 3
            },
            examples: [`${config.prefix} gamba 1 34 <--- Place a bet on option 1 for 34 ToadBucks:tm:`],
            args: [{
                key: 'optionSelection',
                prompt: 'Which option do you want to vote for? (1 or 2)',
                type: 'integer',
                validate: optionSelection => {
                    if (optionSelection == 1 || optionSelection == 2) return true;
                    return 'You must choose either option **1** or option **2**.'
                }
            }, {
                key: 'pointsToBet',
                prompt: 'How many points do you want to bet?',
                type: 'integer',
                validate: pointsToBet => {
                    if (pointsToBet >= 1 && pointsToBet <= 250000) return true;
                    return 'You must gamba between 1 and 250,000 ToadBucks:tm:.'
                }
            }]
    });
}

async run(msg, {optionSelection, pointsToBet}) {
    modelGambaInfo.scan().exec((err, gambaInfo) => {
        if (err) {
            return console.log(err);
        }
        if (gambaInfo[0] == undefined || gambaInfo[0].active == false) {
            return msg.reply('There are no active gambas.')
        }
        modelToadPoints.get({discordID: msg.author.id}, function(err, userAccount) {
            // Check for any errors
            if (err) {
                return console.log(err);
            }
            // Check if they exist
            if (userAccount == undefined) {
                return msg.reply('You haven\'t earned any ToadBucks:tm: yet. :(')
            }
            // Check if they actually have enough points to bet that much
            if (userAccount.points < pointsToBet) {
                return msg.reply('You don\'t have enough ToadBucks:tm: to bet that much. :(')
            }
                
            // See if they're already in the gamba points table
            modelGambaPoints.get({discordID: msg.author.id}, function(err, userGamba) {
                // Check for any errors
                if (err) {
                    return console.log(err);
                }
                // If the user hasn't placed a bet yet then put them in the bets table
                if (userGamba == undefined) {
                    let entry = new modelGambaPoints();
                    entry.discordID = msg.author.id;
                    entry.discordUser = msg.author.username;
                    entry.selectedOption = optionSelection;
                    entry.points = pointsToBet;
                    entry.save({overwrite: false}, function(err) {
                        if(err) {
                            if (err.code === 'ConditionalCheckFailedException' && err.statusCode === 400)
                                console.log('Discord ID already exists.');
                            else
                                console.log(err);
                        } else {
                            console.log(`${msg.author.username} - ${msg.author.id} Added to the Gamba Points Database`)                        
                        }
                    });
                } else {
                    // Otherwise, if they have placed a bet then update their bet
                    // Don't let them update if they vote for a different option
                    if (optionSelection != userGamba.selectedOption) {
                        return msg.reply("You can't change your vote once it's placed!");
                    } else {
                    modelGambaPoints.update({discordID: msg.author.id}, {$ADD: {points: pointsToBet}}, function(err) {
                        if (err) {
                            return console.log(err);
                        }
                    })};
                }
                // Remove those points from their account main and let them know
                modelToadPoints.update({discordID: msg.author.id}, {$ADD: {points: (-1 * pointsToBet)}}, function(err) {
                    if (err) {
                        return console.log(err);
                    }
                    modelGambaPoints.get({discordID: msg.author.id}, function(err, userBetInfo) {
                        var embed = new Discord.MessageEmbed()
                        .setTitle(`${userAccount.discordUser} deposited【${pointsToBet}】${(pointsToBet == 1 ? "ToadBuck:tm:" : "ToadBucks:tm:")}`)
                        .setDescription(`- Question: ${gambaInfo[0].prompt}
                                         - Voted for option **${(optionSelection == 1 ? gambaInfo[0].optionOneTxt : gambaInfo[0].optionTwoTxt)}**.
                                         - Total deposit: ${(userBetInfo.points <= 1 ? pointsToBet : userBetInfo.points)} ToadBucks:tm:`)
                        .setColor('#DB6B63') 
                        .setThumbnail(msg.author.displayAvatarURL())
                        .setFooter('Help: toad help gamba')

                    msg.say(embed);
                    });

                });
                
                // Finally, update the gamba info for displaying later
                if (optionSelection == 1) {
                    modelGambaInfo.update({discordID: config.botID}, {$ADD: {optionOnePoints: pointsToBet}});
                    modelGambaInfo.update({discordID: config.botID}, {$ADD: {optionOneVoters: 1}});
                } else {
                    modelGambaInfo.update({discordID: config.botID}, {$ADD: {optionTwoPoints: pointsToBet}});
                    modelGambaInfo.update({discordID: config.botID}, {$ADD: {optionTwoVoters: 1}});
                }
            });
        });
    });
}};

