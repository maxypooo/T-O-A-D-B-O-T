const { Command } = require('discord.js-commando');
const config = require('../config.json')



module.exports = function() {
    this.givePointsInVoice = function(client, voiceChannelID, amountOfPoints) {
    //for (i = 0 ; i < voiceChannelsArray.length; i++) {
        // i.members.each(user => console.log(user.username));
        client.channels.fetch(voiceChannelID).then(voiceChannel => console.log(voiceChannel.name))
        // voiceChannelNames.members.each(user => console.log(user.username));
    //}
    }
};