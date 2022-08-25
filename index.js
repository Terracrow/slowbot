const { Client, GatewayIntentBits, Collection } = require('discord.js');

const fs = require('node:fs');

const path = require('node:path');

require('dotenv').config();

let token = process.env.TOKEN;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

client.commands = new Collection();

client.once('ready', () => {
    console.log('Ready!');
});

const commandsPath = path.join(__dirname, 'commands');

const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);

	const command = require(filePath);

	client.commands.set(command.data.name, command);
}

client.on('guildMemberAdd', (member) => {
    var targetChannel = client.channels.cache.get('1011702926697304164');

    member.roles.add('1011969938946277408');

    return targetChannel.send(`**Un ${member.displayName} sauvage apparait ${targetChannel}**\nA wild ${member.displayName} appears!`)
})


client.on('interactionCreate', async interaction => {
    if (interaction.isButton()) {
        if(interaction.customId == 'deleteMsg') {
            await interaction.deferUpdate();
            await interaction.deleteReply();
        } else if (interaction.customId == 'allowVerif') {
            await interaction.deferUpdate();
            await interaction.deleteReply();
            interaction.member.roles.remove('1011969938946277408');
            return interaction.member.roles.add('1011973326454919202');
        } else if (interaction.customId == 'acceptRules') {
            interaction.member.roles.remove('1011973326454919202');
            return interaction.member.roles.add('1011966401105375274');
        }

        if (interaction.member.roles.cache.has('1011973326454919202') && interaction.member.roles.cache.has('1011966401105375274')) {
            interaction.member.roles.remove('1011973326454919202');
        }
    }


	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
	}
});

client.login(token);