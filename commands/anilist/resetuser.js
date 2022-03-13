const { MessageEmbed } = require('discord.js');
const Anilist = require('../../schemas/AnilistSchema');

module.exports = {
    name: "resetuser",
    description: "This allows the user to reset their specified username.",
    run: async (client, message, args) => {

        try {

            let resetEntry = await Anilist.findOneAndRemove({ userId: message.author.id });
            if (!resetEntry) {
                message.channel.send("You haven't set an username.")
            } else {
                message.channel.send("Succesfully deleted username")

            }
        } catch (err) {
            console.log("There was an error, here it is: " + err);
            return message.channel.send("There was an error.");
        }

    }
}