const { MessageEmbed } = require('discord.js');
const Anilist = require('../../schemas/AnilistSchema');

module.exports = {
    name: "setuser",
    description: "This allows the user to set their Anilist profile.",
    run: async (client, message, args) => {

        let UserName = message.content.replace("n.setuser ", "");
        let DiscordID = message.author.id;

        try {

            const anilistID = await Anilist.findOne({ userId: DiscordID });
            const anilistNAME = await Anilist.findOne({ anilistName: UserName });
            if (anilistID) {
                message.channel.send("You've already set an username.")
            } else if (anilistNAME) {
                message.channel.send(`<@${anilistNAME.userId}> is already using this username`)
            } else {

                const anilist = await Anilist.create({
                    anilistName: UserName,
                    userId: message.author.id,
                    userName: message.author.username,
                });
                message.channel.send("Username set.")
            };

        } catch (err) {
            console.log("There was an error, here it is: " + err);
            message.channel.send("There was an error.")
        }

    }
}