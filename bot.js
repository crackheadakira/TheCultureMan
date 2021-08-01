const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const prefix = 'n.';
const config = require('./config.json');
const { token } = config;

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('The Culture Man is alive');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'culture') {
		client.commands.get('culture').execute(message, args);
	} else if (command == 'search') {
		client.commands.get('search').execute(message, args);
	} else if (command == 'help') {
		client.commands.get('help').execute(message, args);
	} else if (command == 'read') {
		client.commands.get('read').execute(message, args);
	} else if (command == 'random') {
		client.commands.get('random').execute(message, args);
	} else if (command == 'tags') {
		client.commands.get('tags').execute(message, args);
	}
}) 

client.login(`${token}`);