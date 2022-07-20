const { MessageEmbed } = require('discord.js');
const cultureDB = require('culture69');

module.exports = {
    name: 'culture',
    description: 'This will give you an image from our handcrafted database.',
    type: 'hentai',
    run: async (client, message, args) => {
        try {

            if (!message.channel.nsfw) {
                message.reply("get your ass into an NSFW channel");
                return;
            }

            const embed = new MessageEmbed()
                .setTitle("Here's an image from our handcrafted database")
                .setImage(cultureDB())
                .setFooter("Requested by " + message.author.username)

            message.channel.send({ embeds: [embed] })

        } catch (error) {
            message.channel.send("``" + error + "``");
            console.log(error);
        }
    }
}