const config = require('../config.json');
const dynamoose = require("dynamoose");
const tableDiscordMinecraft = require("./models/modelDiscordMinecraft");

const db = new dynamoose.aws.sdk.DynamoDB({
    "accessKeyId": `${config.aws.accessKeyId}`,
    "secretAccessKey": `${config.aws.secretAccessKey}`,
    "region": `${config.aws.region}`
});

module.exports = db;

