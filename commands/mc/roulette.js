const { Command } = require('discord.js-commando');
const config = require('../../config.json')
const { exec } = require("child_process");
const modelDiscordMinecraft = require("../../utility/models/modelDiscordMinecraft")

module.exports = class RouletteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'roulette',
            group: 'mc',
            memberName: 'roulette',
            description: 'What will you get? A grand prize... or a horrible fate?',
            throttling: {
                usages: 1,
                duration: 300
            },
            examples: [`${config.prefix} roulette`],
        });
    }

    async run(msg, args) {
        let possibleOutcomes = [
            /* Luck -3 = Terrible Outcome */
            `kill ${results[0].minecraftUser}`,
            `execute at ${results[0].minecraftUser} run tp ${results[0].minecraftUser} ~ ~10000 ~`
            `execute at ${results[0].minecraftUser} run summon giant`,

            /* Luck -2 = Bad Outcome */
            `execute at ${results[0].minecraftUser} run summon illusioner`,
            `execute at ${results[0].minecraftUser} run summon blaze`,

            /* Luck -1 = Inconvenient Outcome */
            `execute at ${results[0].minecraftUser} run summon experience_bottle`,
            `execute at ${results[0].minecraftUser} run summon trident ~ ~15 ~`,

            /* Luck 0 = Null Outcome */
            `experience add ${results[0].minecraftUser} 5 levels`,

            /* Luck 1 = Ok Outcome */
            `give ${results[0].minecraftUser} emerald 1`,
            `execute at ${results[0].minecraftUser} run summon parrot`,
            `execute at ${results[0].minecraftUser} run summon cat`,
            `give ${results[0].minecraftUser} cooked_beef 8`,

            /* Luck 2 = Good Outcome */
            `execute at ${results[0].minecraftUser} run summon wolf`,
            `experience add ${results[0].minecraftUser} 10 levels`,
            `give ${results[0].minecraftUser} emerald 16`,
            `give ${results[0].minecraftUser} emerald 32`,
            `give ${results[0].minecraftUser} diamond 1`,
            `give ${results[0].minecraftUser} cooked_beef 32`,
            `give ${results[0].minecraftUser} golden_apple 1`,

            /* Luck 3 = Great Outcome */
            `experience add ${results[0].minecraftUser} 30 levels`,
            `give ${results[0].minecraftUser} diamond 3`,
            `give ${results[0].minecraftUser} golden_carrot 64`,
            



        ]
        modelDiscordMinecraft.query("discordID").eq(msg.author.id).exec()
        .then(results => {
            if (results[0] == undefined) {
                console.log("User not in database.");
                msg.reply(`You must first verify yourself using \`${config.prefix} verify\` before you can use this command.`)
            } else {
                exec(`screen -S minecraft -X stuff "execute at ${results[0].minecraftUser} run tp ${results[0].minecraftUser} ~ ~${args.num} ~\n"`);
            }
        });
    }
};