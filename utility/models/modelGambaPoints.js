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

    selectedOption: {
        type: Number,
        required: true
    },

    points: {
        type: Number,
        required: true
    }
});

const ModelGambaPoints = dynamoose.model("toadbotGambaPoints", schema);


module.exports = ModelGambaPoints;