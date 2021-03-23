const { Command } = require('discord.js-commando');
const config = require('../../config.json')
const {
    RichEmbed
} = require('discord.js');
const Discord = require("discord.js")
const modelGambaInfo = require("../../utility/models/modelGambaInfo")
const modelGambaPoints = require("../../utility/models/modelGambaPoints")
const modelToadPoints = require("../../utility/models/modelToadPoints")

module.exports = class CloseGambaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'closegamba',
            aliases: ['cg',"stopbet"],
            group: 'points',
            memberName: 'closegamba',
            description: 'Close a Gamba and distribute all earned ToadBucks:tm:.',
            examples: [`${config.prefix} points`],
            args: [{
                key: 'winningOption',
                prompt: 'Which option won?',
                type: 'integer',
                validate: winningOption => {
                    if (winningOption == 0 || winningOption == 1 || winningOption == 2) return true;
                    return 'The winner must be either 0 (refund points), 1 (option 1 wins), or 2 (option 2 wins).'
                }
            }]
    });
}

async run(msg, {winningOption}) {
    msg.delete();
    let totalPts = 0;
    let winnerPts = 0;
    let winnerRatio = 0;

    // display info to users
    modelGambaInfo.scan().exec((err, gambaInfo) => {
        if (err) {
            console.log(err);
        }
        if (gambaInfo[0].winner != -1) {
            return msg.reply("This gamba has already had a winner declared.");
        }
        if (msg.author.id != gambaInfo[0].discordIDStarter) {
            return msg.reply("Only the person who started the gamba can close it.")
        }

        if (winningOption == 0) { // Ties/Refunds
            modelGambaPoints.scan().exec((err, users) => {
                for (let i = 0; i < users.count; i++) {
                    modelToadPoints.update({discordID: users[i].discordID}, {$ADD: {points: users[i].points}}, function(err) {
                        if (err) {
                            return console.log(err);
                        }
                    });
                }

                // delete all points in gamba table
                for (let i = 0; i < users.length; i++) {
                    modelGambaPoints.delete({discordID: users[i].discordID}, function(err, user) {
                        if (err) {
                            return console.log(err);
                        }
                    });
                }
        
                // set the gamba's winner in the table
                modelGambaInfo.update({discordID: config.botID}, {winner: winningOption}, function(err, user) {
                    if (err) {
                        return console.log(err);
                    }
                    getGambaInfo(msg, "Ended");
                });
            });
        } else { // Normal point distribution
            modelGambaPoints.scan().exec((err, users) => {
                // collect total points
                for (let i = 0; i < users.count; i++) {
                    totalPts += users[i].points;
                }
        
                for (let i = 0; i < users.length; i++) {
                    if (users[i].selectedOption == winningOption) {
                        winnerPts += users[i].points;
                    } 
                }
        
                winnerRatio = totalPts / winnerPts;
                if (winnerRatio == 1) {
                    winnerRatio = 1.2;
                }
                
                //WINNERS
                for (let i = 0; i < users.length; i++) {
                    if (users[i].selectedOption == winningOption) {
                        modelToadPoints.update({discordID: users[i].discordID}, {$ADD: {points: (Math.ceil(winnerRatio * users[i].points))}}, function(err, user) {
                            if (err) {
                                return console.log(err);
                            }
                        });
                    }
                }
        
                // delete all points in gamba table
                for (let i = 0; i < users.length; i++) {
                    modelGambaPoints.delete({discordID: users[i].discordID}, function(err, user) {
                        if (err) {
                            return console.log(err);
                        }
                    });
                }
        
                // set the gamba's winner in the table
                modelGambaInfo.update({discordID: config.botID}, {winner: winningOption}, function(err, user) {
                    if (err) {
                        return console.log(err);
                    }
                    getGambaInfo(msg, "Ended");
                });
        
                
            });
        }
    });
}};