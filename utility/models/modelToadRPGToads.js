const dynamoose = require("dynamoose");

const schema = new dynamoose.Schema({
    toadID: {
        type: Number,
        required: true,
        hashKey: true
    },

    // The "type" of toad, equivalent the pokemon species
    species: {
        type: String,
        required: true
    },

    // Players get to nickname their toads like in pokemon
    nickname: {
        type: String,
        required: true
    },

    // URL to an Imgur Link or something similar
    picture: {
        type: String,
        required: true
    },

    // Typing like fire, water, etc.
    type: {
        type: String,
        required: true
    },

    // Self explanatory
    level: {
        type: Number,
        required: true
    },

    // need exp to gain levels
    exp: {
        type: Number,
        required: true
    },

    hp: {
        type: Number,
        required: true
    },

    atk: {
        type: Number,
        required: true
    },

    spatk: {
        type: Number,
        required: true
    },

    def: {
        type: Number,
        required: true
    },

    spdef: {
        type: Number,
        required: true
    },

    speed: {
        type: Number,
        required: true
    },

});

const ModelToadRPGToads = dynamoose.model("toadbotToadRPGToads", schema);


module.exports = ModelToadRPGToads;