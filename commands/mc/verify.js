const { Command } = require('discord.js-commando');
const config = require('../../config.json')
const { exec } = require("child_process");
const verificationHandler = require("../../utility/readChat.js")

module.exports = class VerifyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'verify',
            group: 'mc',
            memberName: 'verify',
            description: 'Connect your Discord and Minecraft Username. Required for other commands.',
            examples: [`${config.prefix} verify`],
        });
    }

    async run(msg, args) {
        let randomString = Math.random().toString(36).substring(7);
        msg.reply(`To verify your account, type the following string EXACTLY AS SHOWN into Minecraft: ${randomString}`);
        verificationHandler.verifyCode(randomString);
    }
};