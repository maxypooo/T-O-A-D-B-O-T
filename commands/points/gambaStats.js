const { Command } = require('discord.js-commando');
const config = require('../../config.json')
const modelToadPoints = require("../../utility/models/modelToadPoints")
require('../../utility/gambaUtils.js')();

module.exports = class GambaStatsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'gambastats',
            aliases: ['gstat', 'gstats', 'gstatus', 'ginfo'],
            group: 'points',
            memberName: 'gambastats',
            description: 'Display how many points you have.',
            examples: [`${config.prefix} gambastatus`],
        });
    }

    async run(msg) {
        getGambaInfo(msg, "Stats");
    }
};