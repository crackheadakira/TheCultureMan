const Discord = require('discord.js');

module.exports = {
    name: "help",
    description: "This lists all the possible commands this bot offers",
    execute(message, args) {

        const commandsEmbed = new Discord.MessageEmbed()
            .setColor('eb9840')
            .setTitle('Here are the fucking commands, beware im an NSFW bot')
            .addFields(
                { name: 'n.', value: "n. is the bot's prefix" },
                { name: 'n.search', value: 'This will search nHentai for the specified Doujin and give you info about it' },
                { name: 'n.culture', value: 'This gets you a random image from the database' },
                { name: 'n.read', value: "This allows you to read a doujin inside of Discord with the homies" },
                { name: 'n.random', value: 'This will give you a random doujin from nHentai' },
                { name: 'n.tags', value: 'This will show you all tags with an explanation of what it is.' },
            )
        message.channel.send(commandsEmbed)
    }
}
