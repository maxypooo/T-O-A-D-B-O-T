const { exec } = require("child_process");

function givePointsInVoice(voiceChannelsArray, amountOfPoints) {
    for (i = 0 ; i < voiceChannelsArray.length; i++) {
        i.members.each(user => console.log(user.username));
    }
}

module.exports = givePointsInVoice;