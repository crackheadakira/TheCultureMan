const anilist = require('anilist-node');
const { MessageEmbed } = require('discord.js');
const Anilist = new anilist();

module.exports = {
    name: "studio",
    description: "This will search Anilist for the specified studio and give you info about them.",
    type: 'anilist',
    run: async (client, message, args) => {

        let trimString = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
        let string = args.slice(0).join(" ");

        Anilist.studio(string).then(data => {
            try {

                let name = data.name;
                let studioMedia = data.media;
                let URL = data.siteURL;
                let favourites = data.favourites;

                // Sort's studioMedia to be in an easy readable form
                let media = studioMedia.map(({ title }) => title);
                var correctMedia = media.map(({ romaji}) => romaji).toString().replace(/,/g, "\n");

                const embed = new MessageEmbed()
                    .setTitle(name)
                    .setURL(URL)
                    .setFooter(`Requested by ${message.author.username} | ${favourites} Favourites`)
                    .setDescription(correctMedia)

                message.channel.send({ embeds: [embed] })
            } catch (error) {
                message.channel.send("``" + error + "``");
                console.log(error);
            }
        });

    }
}