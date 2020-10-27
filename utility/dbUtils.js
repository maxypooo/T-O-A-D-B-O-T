const config = require('../config.json');
const dynamoose = require("dynamoose");

function isInDB(Model, hashkey, q) {
    Model.query(hashkey).eq(q).exec((error, results) => {
        if (error) {
            console.log("Error!")
            console.error(error);
            return false;
        } else {
            console.log("Success!");
            console.log(results);
            return true;
        }
    });
}

function getDiscordUser(Model, hashkey, discordID) {
    Model.query(hashkey).eq(q).exec((error, results) => {
        if (error) {
            console.error(error);
        } else {
            console.log(results);
            return results.discordUser;
        }
    });
}

function getMinecraftUser(Model, hashkey, discordID) {
    Model.query(hashkey).eq(q).exec((error, results) => {
        if (error) {
            console.error(error);
        } else {
            console.log(results);
            return results.minecraftUser;
        }
    });
}

module.exports = { isInDB, getDiscordUser, getMinecraftUser };