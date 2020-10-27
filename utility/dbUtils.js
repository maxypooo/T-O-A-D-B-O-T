const config = require('../config.json');
const dynamoose = require("dynamoose");

async function isInDB(Model, hashkey, q) {
    await Model.query(hashkey).eq(q).exec()
    .then(results => {
        if (results[0] == undefined) {
            console.log("User not in database.");
        } else {
            console.log("Success!");
            console.log(results[0]);
            return true;
        }
    });
}

async function getDiscordUser(Model, hashkey, discordID) {
    await Model.query(hashkey).eq(discordID).exec()
    .then(results => {return results[0].discordUser;});
}

async function getMinecraftUser(Model, hashkey, discordID) {
    await Model.query(hashkey).eq(discordID).exec()
    .then(results => {return results[0].minecraftUser;});
}

module.exports = { isInDB, getDiscordUser, getMinecraftUser };