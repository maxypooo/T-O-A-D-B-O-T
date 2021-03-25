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

    auction: {
        type: String,
        required: true
    },

    startingBid: {
        type: Number,
        required: true
    },

    currentBid: {
        type: Number,
        required: true
    },

    highestBidderID: {
        type: String,
        required: true
    },

    highestBidderUser: {
        type: String,
        required: true
    },

    concluded: {
        type: false,
        required: true
    }
});

const ModelAuctionHouse = dynamoose.model("toadbotAuctionHouse", schema);


module.exports = ModelAuctionHouse;