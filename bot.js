const Discord = require('discord.js');
const fs = require('fs');
const { token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const prefix = 'n.';



// load commands
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}




/// process
client.once('ready', () => {
	console.log('The Culture Man is alive');
});


client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) {
		return;
	}

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
	} else if (command == 'anime') {
		client.commands.get('anime').execute(message, args);
	} else if (command == 'manga') {
		client.commands.get('manga').execute(message, args);
	} else if (command == 'user') {
		client.commands.get('user').execute(message, args);
	} else if (command == 'activity') {
		client.commands.get('activity').execute(message, args);
	}
})

client.login(`${token}`);
