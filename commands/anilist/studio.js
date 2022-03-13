const anilist = require('anilist-node');
const { MessageEmbed } = require('discord.js');
const Anilist = new anilist(process.env.anitoken);

module.exports = {
    name: "studio",
    description: "This will search Anilist for the specified studio and give you info about them.",
    run: async (client, message, args) => {

        if (!message.content.startsWith(`${process.env.prefix}studio`)) {
            return;
        }

        let trimString = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

        let string = message.content.replace(`${process.env.prefix}studio `, "");

        Anilist.studio(string).then(data => {
            try {

                let name = data.name;
                let studioType = data.isAnimationStudio;
                let studioMedia = data.media;
                let URL = data.siteURL;
                let favourites = data.favourites;

                // Sort's studioMedia to be in an easy readable form
                let media = studioMedia.map(({ title }) => title);
                var correctMedia = media.map(function (item) {
                    return item['romaji'];
                });

                correctMedia = correctMedia.toString();
                correctMedia = correctMedia.replace(/,/g, "\n");

                // Show's if the studio is an animation studio
                if (studioType == true) {
                    studioType = "Animation Studio";
                }

                if (studioType == false) {
                    studioType = "Non-Animation Studio";
                }

                const embed = new MessageEmbed()
                    .setTitle(name)
                    .setURL(URL)
                    .setFooter("Requested by " + message.author.username + " | " + favourites + " Favourites")
                    .addFields(
                        { name: "Studio Type", value: studioType, inline: false },
                        { name: "The Studio's Works", value: correctMedia, inline: false },
                    )

                message.channel.send({ embeds: [embed] })
            } catch (error) {
                message.channel.send("Bot received an error. Maybe there was a grammatical mistake?");
                return console.log(error);
            }
        });

    }
}