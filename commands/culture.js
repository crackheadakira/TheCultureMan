const Discord = require('discord.js');
const Culture69 = require('Culture69').Culture69;
const c69 = new Culture69();

module.exports = {
    name: "culture",
    description: "This gets you a random image from the database",
    execute(message, args) {
        if (!message.content.startsWith('n.culture')) {
            return;
        }

        if (!message.channel.nsfw) {
            message.reply("get your ass into an NSFW channel");
            return;
        }


        let cam69 = c69.getCulture69();

        embed = new Discord.MessageEmbed()
            .setTitle("Here's an image/gif from our Handcrafted database!")
            .setImage(cam69)

        message.channel.send(embed)
    }
}
