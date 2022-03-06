const { MessageEmbed } = require('discord.js');
const Culture69 = require('Culture69').Culture69;
const c69 = new Culture69();

module.exports = {
    name: 'culture',
    description: 'This will give you an image from our handcrafted database.',
    run: async (client, message, args) => {

        if (!message.content.startsWith(`${process.env.prefix}culture`)) {
            return;
        }

        if (!message.channel.nsfw) {
            message.reply("get your ass into an NSFW channel");
            return;
        }

        let cam69 = c69.getCulture69();

        const embed = new MessageEmbed()
            .setTitle("Here's an image from our handcrafted database")
            .setImage(cam69)
            .setFooter("Requested by " + message.author.username)

        message.channel.send({ embeds: [embed] })

    }
}