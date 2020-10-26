const dynamoose = require("dynamoose");
let schema = new dynamoose.Schema({

    discordID: {
        type: String,
        required: true,
        hashKey: true,
    },

    level: {
        type: Integer,
        required: true,
        default: 0
    },

    exp: {
        type: Integer,
        require: true,
        default: 0
    }
})
let DiscordUser = dynamoose.model('UserExp', schema);