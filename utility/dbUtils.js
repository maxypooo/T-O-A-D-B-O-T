const config = require('../config.json');
const dynamoose = require("dynamoose");

async function isInDB(Model, hashkey, q) {
    const results = await Model.query(hashkey).eq(q).exec();
    if (results[0] == undefined) {
        console.log("User not in database.");
    } else {
        console.log("Success!");
        console.log(results[0]);
        return true;
    }
}

function getDiscordUser(Model, hashkey, discordID) {
    const results = await Model.query(hashkey).eq(q).exec();
    return results[0].discordUser;
}

function getMinecraftUser(Model, hashkey, discordID) {
    const results = await Model.query(hashkey).eq(q).exec();
    return results[0].minecraftUser;
}

module.exports = { isInDB, getDiscordUser, getMinecraftUser };