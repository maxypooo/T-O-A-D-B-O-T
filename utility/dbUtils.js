const config = require('../config.json');
const dynamoose = require("dynamoose");

function isInDB(Model, hashkey, q) {
    Model.query(hashkey).eq(q).exec((error, results) => {
        if (error) {
            console.log("Error!")
            console.error(error);
            return false;
        } else {
            if (results[0] == undefined) {
                console.log("User not in database.");
            } else {
                console.log("Success!");
                console.log(results[0]);
                return true;
            }
        }
    });
}

function getDiscordUser(Model, hashkey, discordID) {
    Model.query(hashkey).eq(q).exec((error, results) => {
        if (error) {
            console.error(error);
        } else {
            console.log(results);
            return results[0].discordUser;
        }
    });
}

function getMinecraftUser(Model, hashkey, discordID) {
    Model.query(hashkey).eq(q).exec((error, results) => {
        if (error) {
            console.error(error);
        } else {
            console.log(results);
            return results[0].minecraftUser;
        }
    });
}

module.exports = { isInDB, getDiscordUser, getMinecraftUser };