const dynamoose = require("dynamoose");

const schema = new dynamoose.Schema({
    "discordID": {
        "type": String,
        "hashKey": true
    },
    "discordUser": String,
    "minecraftUser": String
});

const ModelDiscordMinecraftUsers = dynamoose.model("toadbotDiscordMinecraft", schema);


module.exports = { ModelDiscordMinecraftUsers };