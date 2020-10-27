const config = require('../config.json');
const dynamoose = require("dynamoose");

async function isInDB(Model, hashkey, q) {
    await Model.query(hashkey).eq(q).exec()
    .then(results => {
        if (results[0] == undefined) {
            console.log("User not in database.");
        } else {
            console.log("Success! User was found.");
            return true;
        }
    });
}

async function getDiscordUser(Model, hashkey, discordID) {
    let user;
    Model.query(hashkey).eq(discordID).exec()
    .then(results => {
        results[0].discordUser = user;
    });
    return user;
}

async function getMinecraftUser(Model, hashkey, discordID) {
    let user;
    Model.query(hashkey).eq(discordID).exec()
    .then(results => {
        results[0].minecraftUser = user;
    });
    return user;
}

module.exports = { isInDB, getDiscordUser, getMinecraftUser };