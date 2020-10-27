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
    // Model.query(hashkey).eq(q).exec((error, results) => {
    //     if (error) {
    //         console.log("Error!")
    //         console.error(error);
    //         dbResult = false;
    //     } else {
    //         if (results[0] == undefined) {
    //             console.log("User not in database.");
    //         } else {
    //             console.log("Success!");
    //             console.log(results[0]);
    //             dbResult = true;
    //         }
    //     }
    // });
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