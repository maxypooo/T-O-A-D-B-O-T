const dynamoose = require("dynamoose");

const schema = new dynamoose.Schema({
    discordID: {
        type: String,
        required: true,
        hashKey: true
    },

    discordUser: {
        type: String,
        required: true
    },

    minecraftUser: {
        type: String,
        required: true
    }
});

const ModelDiscordMinecraftUsers = dynamoose.model("toadbotDiscordMinecraft", schema);


module.exports = ModelDiscordMinecraftUsers;