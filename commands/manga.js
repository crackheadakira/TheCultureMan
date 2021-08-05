const Discord = require("discord.js");
const settings = require('./anitoken.json');
const anilist = require('anilist-node');
const Anilist = new anilist(settings.token);

module.exports = {
    name: "manga",
    description: "This will search Anilist for the specified Manga and give you info about it",
    async execute(message, args) {
        if (!message.content.startsWith('n.manga')) {
            return;
        }


        let string = message.content.replace("n.manga ", "");


        Anilist.searchEntry.manga(string).then(Data => {


            let nData = Data.media;
            let ID = nData.map(({ id }) => id);

            var nID = parseInt(ID);

            Anilist.media.manga(nID).then(mData => {

                let format = mData.format;
                let Title = mData.title.romaji;
                let cover = mData.coverImage.large;
                let genres = mData.genres;
                let averageScore = mData.averageScore;
                let status = mData.status;
                let description = mData.description;
                

                let fDesc = description.replace(/<[^>]*>?/gm, ''); // Removes the HTML Tags from the String
                let ffDesc = fDesc.replace(/\r?\n?[^\r\n]*$/, ""); // Removes the last line aka (Source: X)

                const embed = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle(Title)
                    .setURL("https://anilist.co/manga/" + ID)
                    .setThumbnail(cover)
                    .setDescription("**Average Score:** " + averageScore + "%" + "** Status:** " + status + "** Format:** " + format + "** Genres: **" + genres)
                    .addFields(
                        { name: 'Description', value: ffDesc },
                    )

                message.channel.send(embed)
            });
        });
    }
}