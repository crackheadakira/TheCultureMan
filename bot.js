console.clear();
const Client = require("./Structures/client.js");
const client = new Client();
const config = require('./config.json');
const fs = require("fs");
const Command = require("./Structures/command.js");

fs.readdirSync("./commands")
    .filter(file => file.endsWith(".js"))
    .forEach(file => {
        /**
         * @type {Command}
         */
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);

    });

client.on("ready", () => console.log("The Culture Man is online."));

client.on("messageCreate", message => {

    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content.substring(config.prefix.length).split(/ +/);

    const command = client.commands.find(cmd => cmd.name == args[0]);

    if(!command) return message.channel.send("There is no command by that name.");

    command.run(message, args, client);
});

client.login(config.token);