const { Command } = require('discord.js-commando');
const config = require('../../config.json')
const {
    RichEmbed
} = require('discord.js');
const Discord = require("discord.js")
const modelGambaInfo = require("../../utility/models/modelGambaInfo")
require('../../utility/gambaUtils.js')();

module.exports = class StartGambaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'startgamba',
            aliases: ['sg',"startbet"],
            group: 'points',
            memberName: 'startgamba',
            description: 'Start a Gamba that people can bet their ToadBucks:tm: on.',
            throttling: {
                usages: 1,
                duration: 60
            },
            examples: [`${config.prefix} startgamba "This is my example prompt" "This is option 1;This is option 2" 180 <----- starts a gamba with 2 options and 180 seconds to vote on them.`],
            args: [{
                key: 'prompt',
                prompt: 'Provide a prompt for this gamba.',
                type: 'string',
                validate: question => {
                    if (question.length <= 100 && question.length >= 10) return true;
                    return 'Gamba prompts must be between 10 and 100 characters in length.';
                }
            }, {
                key: 'options',
                prompt: 'What options do you want for the gamba? Enter your options as a list separated with semicolons and surrounded by quotes, like this:\n\`option 1; option 2; option 3\`',
                type: 'string',
                validate: options => {
                    var optionsList = options.split(";");
                    if (optionsList.length == 2) return true;
                    return 'Gamba must have 2 options.';
                }
            }, {
                key: 'time',
                prompt: 'How many __**seconds**__ before the gamba is locked?',
                type: 'integer',
                validate: time => {
                    if (time >= 60 && time <= 240) return true;
                    return 'Voting time must be between 60 and 240 seconds.';
                }
            }]
    });
}

async run(msg, {prompt, options, time}) {
    const emojiList = ['1⃣', '2⃣'];
    var optionsList = options.split(";");
    var optionsText = "";

    msg.say(`${config.points.gambaRolePing}, a new Gamba has been created. Vote now!`)

    modelGambaInfo.scan().exec((err, gambaInfo) => {
        if (err) {
            return console.log(err);
        }
        if (gambaInfo[0] != undefined) {
            if (gambaInfo[0].winner == -1) {
                return msg.reply('The current gamba must be closed and a winner must have been picked to start a new gamba.');
            }
        }

        for (var i = 0; i < optionsList.length; i++) {
            optionsText += emojiList[i] + "   " + optionsList[i] + "\n";
        }
    
        var embed = new Discord.MessageEmbed()
            .setAuthor(`${msg.author.username} started a gamba!`, msg.author.displayAvatarURL())
            .setTitle(`Gamba - ${prompt}`)
            .setDescription(optionsText)
            .setColor('#E30BBB') 
            .setThumbnail('https://i.imgur.com/MMh4NRQ.png')
            .setFooter('Vote with "toad gamba"!\n')
            .setTimestamp();
        
        msg.say(embed).then(sentEmbed => {
            let entry = new modelGambaInfo();
            entry.discordID = config.botID;
            entry.discordIDStarter = msg.author.id;
            entry.active = true;
            entry.prompt = prompt;
            entry.optionOneTxt = optionsList[0];
            entry.optionTwoTxt = optionsList[1];
            entry.optionOneVoters = 0;
            entry.optionTwoVoters = 0;
            entry.optionOnePoints = 0;
            entry.optionTwoPoints = 0;
            entry.winner = -1;
            entry.save({overwrite: true}, function(err) {
                if(err) {
                    if (err.code === 'ConditionalCheckFailedException' && err.statusCode === 400)
                        console.log('Message ID already exists.');
                    else
                        console.log(err);
                } else {
                    console.log(`Added new Gamba to the Database`)
                }
            });
        })
    
        setTimeout(function(){
            modelGambaInfo.update({discordID: config.botID}, {active: false}, function(err, user) {
                if (err) {
                    return console.log(err);
                }
                getGambaInfo(msg, "Voting Period Over");
            });
        }, time * 1000);
    })    
}};