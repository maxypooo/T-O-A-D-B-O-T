const config = require('../config.json');
const dynamoose = require("dynamoose");

dynamoose.aws.sdk.config.update({
    "accessKeyId": process.env.ACCESS_KEY,
    "secretAccessKey": process.env.SECRET_KEY,
    "region": process.env.REGION
});

const db = new dynamoose.aws.sdk.DynamoDB({
    "accessKeyId": `${config.aws.accessKeyId}`,
    "secretAccessKey": `${config.aws.secretAccessKey}`,
    "region": `${config.aws.region}`
});

module.exports = db;

