const moment = require('moment');
const axios = require('axios');
const config = require('../../config.json')
const { Command } = require('discord.js-commando');
const Discord = require("discord.js")
const client = new Discord.Client()
   

module.exports = class ServerCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'mcserver',
            aliases: ['mcserver', 'server'],
            group: 'mc',
            memberName: 'server',
            description: 'Minecraft Server Status',
        });
    }

    async run(msg, args) {
        let description = "";
        let toadright = '<:toadright:770118404480696322>';
        let toadleft = '<:toadleft:770118404857528360>';
        axios.get('https://api.mcsrvstat.us/2/' + config.minecraft.serverIP).then(async res => {
            // handle success
            if (res.data.online) {
                description = `IP: ${config.minecraft.serverIP}\n`
                + 'Server Status: Online' + '\n' 
                + 'Player: ' + res.data.players.online + ' / ' + res.data.players.max + '\n'
                + 'Player List: ' + res.data.players.list.toString(); + '\n'
                + 'Last Updated: ' +  await formatTime(res.data.debug.cachetime * 1000) + '\n'
            }
            else {
                description = `IP: ${config.minecraft.serverIP}\n` + 'Server Status: Offline' + '\n' + 'Last Updated: ' + 
                 await formatTime(res.data.debug.cachetime * 1000) + '\n'
            }

            /* Embed message */
            const embed = new Discord.MessageEmbed()
                .setColor('#F56600')
                .setTitle(`${toadright} T O A D S T A C K E R S Minecraft Server ${toadleft}`)
                .setDescription(description)
                .setThumbnail('https://api.mcsrvstat.us/icon/' + config.minecraft.serverIP)
                .setTimestamp();

            msg.say(embed)
        })
        .catch(function (error) {
            // handle error
            msg.say(error);
        })
    }
}

async function formatTime(time){
    if (time) {
        return moment(time).format('MMMM Do YYYY, h:mm:ss a');
    }
}