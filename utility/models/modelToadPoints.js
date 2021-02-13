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

    points: {
        type: Number,
        required: true
    }
});

const ModelToadPoints = dynamoose.model("toadbotToadPoints", schema);


module.exports = ModelToadPoints;