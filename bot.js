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

	if (client.commands.has(command)) {
		client.commands.get(command).execute(message, args);
	}
})

client.login(`${token}`);