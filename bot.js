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


client
    .on('error', console.error)
    .on('warn', console.warn)
    .on('debug', console.log)
    .on('ready', () => {
        // Minecraft Discord chat channel stuff
        const chatChannelName = client.channels.cache.filter(ch => ch.name === `${config.minecraft.chatChannelName}`);
        console.log(`Client ready; logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
        client.user.setActivity(`[${config.prefix} help]`, {
            type: 'PLAYING'
        })
        .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
        .then(rc.readChat(chatChannelName))
        .catch(console.error);

        client.setInterval(function() {
            let voiceChannelNames = client.channels.cache.filter(ch => ch.id === '729730025582231662');
            voiceChannelNames.members.each(user => console.log(user.username));
        }, 1000);



        
    })
    .on('disconnect', () => {
        console.warn('Disconnected!');
    })
    .on('reconnecting', () => {
        console.warn('Reconnecting...');
    })
    .on('commandError', (cmd, err) => {
        console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
    })
    .on('commandBlocked', (msg, reason) => {
        console.log(oneLine `
			Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}
			blocked; ${reason}
		`);
    })
    .on('commandPrefixChange', (guild, prefix) => {
        console.log(oneLine `
			Prefix ${prefix === '' ? 'removed' : `changed to ${prefix || 'the default'}`}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
    })
    .on('commandStatusChange', (guild, command, enabled) => {
        console.log(oneLine `
			Command ${command.groupID}:${command.memberName}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
    })
    .on('groupStatusChange', (guild, group, enabled) => {
        console.log(oneLine `
			Group ${group.id}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
    });

// To add a new command group just add a new entry in the registerGroups call
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

