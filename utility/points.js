const { Command } = require('discord.js-commando');
const config = require('../config.json')
const modelToadPoints = require("./models/modelToadPoints")


module.exports = function() {
    // Takes in a Discord CommandoClient, a voice channel's ID as a string, and an amount (integer) of points to give to the user per call.
    // TODO: Validate ID belongs to a voice channel not just any other channel type.
    this.givePointsInVoice = function(client, voiceChannelID, amountOfPoints) {
        // Find the voice channel from the ID
        client.channels.fetch(voiceChannelID).then(voiceChannel => {
            // Loop through all members in that voice channel
            for (const [memberID, member] of voiceChannel.members) {
                // Query the database to see if the discordID key has the value of the member in the voice chat
                modelToadPoints.query("discordID").eq(member.user.id).exec().then(results => {
                    // If they aren't in the database...
                    if (results[0] == undefined) {
                        // Make their database entry and add them to the database
                        let entry = new modelToadPoints();
                        entry.discordID = member.user.id;
                        entry.discordUser = member.user.username;
                        entry.points = amountOfPoints;
                        entry.save({overwrite: false}, 
                        function(err) {
                            if(err) {
                                if (err.code === 'ConditionalCheckFailedException' && err.statusCode === 400)
                                    console.log('Discord ID already exists.');
                                else
                                    console.log(err);
                            } else {
                                console.log(`${member.user.username} - ${memberID} Added to the Points Database`)                            }
                        });
                    // If they are in the database...
                    } else {
                        // Add ${amountOfPoints} points to their points value!
                        modelToadPoints.update({discordID: member.user.id}, {$ADD: {points: amountOfPoints}}, function(err, user) {
                            if (err) {
                                return console.log(err);
                            }
                        })
                    }
                })
            }
        })
    }
}