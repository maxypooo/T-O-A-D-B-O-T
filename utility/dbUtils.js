const config = require('../config.json');
const dynamoose = require("dynamoose");

function isInDB(Model, hashkey, q) {
    Model.query(hashkey).eq(q).exec((error, results) => {
        if (error) {
            console.error(error);
            return false;
        } else {
            console.log(results);
            if (results) return true;
            else return false;
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