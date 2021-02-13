const { Command } = require('discord.js-commando');
const config = require('../config.json')



module.exports = function() {
    this.givePointsInVoice = function(voiceChannelsArray, amountOfPoints) {
    //for (i = 0 ; i < voiceChannelsArray.length; i++) {
        //i.members.each(user => console.log(user.username));
        let voiceChannelNames = client.channels.cache.filter(ch => ch.id === voiceChannelsArray);
        voiceChannelNames.members.each(user => console.log(user.username));
    //}
    }
};