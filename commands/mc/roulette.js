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
        modelDiscordMinecraft.query("discordID").eq(msg.author.id).exec()
        .then(results => {
            if (results[0] == undefined) {
                console.log("User not in database.");
                msg.reply(`You must first verify yourself using \`${config.prefix} verify\` before you can use this command.`)
            } else {
                let possibleOutcomes = [
                    /* Luck 0 = Terrible Outcome */
                    [`kill ${results[0].minecraftUser}`,
                    `execute at ${results[0].minecraftUser} run tp ${results[0].minecraftUser} ~ ~10000 ~`,
                    `execute at ${results[0].minecraftUser} run summon vindicator`,
                    `execute at ${results[0].minecraftUser} run summon illusioner`,
                    `execute at ${results[0].minecraftUser} run summon evoker`,
                    `execute at ${results[0].minecraftUser} run summon ravager`,
                    `execute at ${results[0].minecraftUser} run summon creeper`,
                    `execute at ${results[0].minecraftUser} setblock ~ ~ ~ lava`
                    `effect give ${results[0].minecraftUser} poison 180 1`,
                    `execute at ${results[0].minecraftUser} run fill ~1 ~1 ~2 ~-1 ~-1 ~-1 minecraft:obsidian keep`,
                    `execute at ${results[0].minecraftUser} run summon elder_guardian`],

                    /* Luck 1 = Bad Outcome */
                    [`execute at ${results[0].minecraftUser} run summon lightning_bolt`,
                    `execute at ${results[0].minecraftUser} run summon blaze`,
                    `execute at ${results[0].minecraftUser} run summon cave_spider`,
                    `execute at ${results[0].minecraftUser} run summon guardian`,
                    `execute at ${results[0].minecraftUser} run summon zoglin`,
                    `execute at ${results[0].minecraftUser} run summon witch`,
                    `effect give ${results[0].minecraftUser} hunger 3 255`,
                    `effect give ${results[0].minecraftUser} slowness 120 3`,
                    `effect give ${results[0].minecraftUser} poison 10 1`,
                    `effect give ${results[0].minecraftUser} blindness 30 3`],

                    /* Luck 2 = Inconvenient Outcome */
                    [`execute at ${results[0].minecraftUser} run summon experience_bottle`,
                    `execute at ${results[0].minecraftUser} run summon trident ~ ~15 ~`,
                    `execute at ${results[0].minecraftUser} run fill ~1 ~3 ~2 ~-1 ~5 ~ minecraft:gravel keep`,
                    `effect give ${results[0].minecraftUser} hunger 10 50`,
                    `effect give ${results[0].minecraftUser} slowness 30 2`,
                    `effect give ${results[0].minecraftUser} poison 5 1`,

                    `execute at ${results[0].minecraftUser} setblock ~ ~ ~ fire`
                    `execute at ${results[0].minecraftUser} run summon anvil ~ ~80 ~`],


                    /* Luck 3 = Ok Outcome */
                    [`give ${results[0].minecraftUser} emerald 1`,
                    `execute at ${results[0].minecraftUser} run summon parrot`,
                    `execute at ${results[0].minecraftUser} run summon cat`,
                    `give ${results[0].minecraftUser} cooked_beef 8`,
                    `experience add ${results[0].minecraftUser} 5 levels`],

                    /* Luck 4 = Good Outcome */
                    [`execute at ${results[0].minecraftUser} run summon wolf`,
                    `experience add ${results[0].minecraftUser} 10 levels`,
                    `give ${results[0].minecraftUser} emerald 16`,
                    `give ${results[0].minecraftUser} diamond 1`,
                    `give ${results[0].minecraftUser} end_crystal 1`,
                    `execute at ${results[0].minecraftUser} run summon wandering_trader`,
                    `give ${results[0].minecraftUser} cooked_beef 32`,
                    `give ${results[0].minecraftUser} golden_apple 1`,
                    `give ${results[0].minecraftUser} nautilus_shell 1`,
                    `effect give ${results[0].minecraftUser} absorption 9999 4`],


                    /* Luck 5 = Great Outcome */
                    [`experience add ${results[0].minecraftUser} 30 levels`,
                    `give ${results[0].minecraftUser} diamond 3`,
                    `give ${results[0].minecraftUser} emerald 32`,
                    `give ${results[0].minecraftUser} golden_carrot 64`,
                    `effect give ${results[0].minecraftUser} haste 600 1`,
                    `give ${results[0].minecraftUser} enchanted_book{StoredEnchantments:[{id:mending,lvl:1}]} 1`,
                    `give ${results[0].minecraftUser} heart_of_the_sea 1`,
                    `give ${results[0].minecraftUser} nautilus_shell 3`,
                    `give ${results[0].minecraftUser} ancient_debris 1`]
                ]

                let luck = Math.floor(Math.random() * (5 - 0) + 0);
                let luck_choice = Math.floor(Math.random() * (possibleOutcomes[luck].length - 1) + 0);
                console.log(`command was: ${possibleOutcomes[luck][luck_choice]}`)
                msg.say(`Your luck was ${luck}. (0 lowest, 5 highest)`);
                exec(`screen -S minecraft -X stuff "${possibleOutcomes[luck][luck_choice]}\n"`);
            }
        });
    }
};