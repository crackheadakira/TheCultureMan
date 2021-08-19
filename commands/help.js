const { MessageEmbed } = require('discord.js');
const Command = require('../Structures/command.js');

module.exports = new Command({
    name: "help",
    description: "Shows all the commands this bot has to feature.",

    async run(message, args, client) {

        const embed = new MessageEmbed()
        .setTitle("Here's are the commands!")
        .addFields(
            { name: "n.help", value: "Shows all the commands this bot has to feature."},
            { name: "n.activity", value: "Shows all the commands this bot has to feature."},
        )
        .setFooter("Made to test Discord.JS v13")

        message.channel.send({ embeds: [embed] })

    }
});