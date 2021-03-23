const config = require('./config.json')
const path = require('path');
const {CommandoClient} = require('discord.js-commando');
const rc = require('./utility/readChat.js')
require('./utility/points.js')();
const dbCreds = require('./utility/dbSetup.js') // should run on its own
const client = new CommandoClient({
    commandPrefix: config.prefix,
    owner: config.owner
});

// Client event handler
client
    .on('error', console.error)
    .on('warn', console.warn)
    .on('debug', console.log)
    .on('ready', () => {
        // Minecraft Discord chat channel stuff
        console.log(`Client ready; logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);

        const chatChannelName = client.channels.cache.filter(ch => ch.name === `${config.minecraft.chatChannelName}`);
        client.user.setActivity(`[${config.prefix} help]`, {
            type: 'PLAYING'
        })
        .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
        .then(rc.readChat(chatChannelName))
        .catch(console.error);

        // Give points to people in voice chat in an interval defined in the config.
        client.setInterval(function() {
            givePointsInVoice(client, config.points.pointsVoiceChannels, config.points.pointsPerInterval);
        }, config.points.pointsDelayInMilliseconds);
    })
    .on('disconnect', () => { console.warn('Disconnected!'); })
    .on('reconnecting', () => { console.warn('Reconnecting...'); })
    .on('commandError', (cmd, err) => { console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err); })

client.registry
    .registerGroups([
        ['mc', 'Minecraft'],
        ['fun', 'Fun Commands'],
        ['templates', 'For testing/dev team'],
        ['points', 'Points spending and obtaining.'],
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.login(config.token);