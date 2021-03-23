const dynamoose = require("dynamoose");

const schema = new dynamoose.Schema({

    discordID: {
        type: String,
        required: true,
        hashKey: true
    },

    discordIDStarter: {
        type: String,
        required: true,
    },

    active: {
        type: Boolean,
        required: true,
    },

    prompt: {
        type: String,
        required: true
    },

    optionOneTxt: {
        type: String,
        required: true
    },

    optionTwoTxt: {
        type: String,
        required: true
    },

    optionOneVoters: {
        type: Number,
        required: true
    },

    optionTwoVoters: {
        type: Number,
        required: true
    },

    optionOnePoints: {
        type: Number,
        required: true
    },

    optionTwoPoints: {
        type: Number,
        required: true
    }, 

    winner: {
        type: Number,
        required: true,
    }

});

const ModelGambaInfo = dynamoose.model("toadbotGambaInfo", schema);


module.exports = ModelGambaInfo;