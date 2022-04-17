const { MessageEmbed, MessageButton } = require('discord.js');
const GraphQLRequest = require("../../handlers/GraphQLRequest");
const GraphQLQueries = require("../../handlers/GraphQLQueries");
const paginationEmbed = require('@acegoal07/discordjs-pagination');
const paginationOpts = require('../../handlers/paginationOptions');

module.exports = {
    name: "manga",
    description: "This will search Anilist for the specified Manga and give you info about it.",
    type: 'anilist',
    run: async (client, message, args) => {

        let string = args.slice(0).join(" ");
        let trimString = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

        if (string == null) {
            message.channel.send("You forgot to mention an manga.")
            return;
        }

        var vars = {
            search: string,
            page: 1,
            perPage: 5
        };

        GraphQLRequest(GraphQLQueries.manga, vars)
            .then((yeezies) => {
                let data = yeezies.Page;

                if (data.media.length < 1) {
                    throw ("Something went wrong with fetching the data. The series possibly doesn't exist or there has been a grammatical error.")
                }

                let embeds = [];

                // 5head @TibixDev gave this code
                for (let i = 0; i < data.media.length; i++) {
                    const embed = new MessageEmbed()
                        .setDescription(
                            trimString(data.media[i].description
                                ?.toString()
                                .replace(/<br><br>/g, "\n")
                                .replace(/<br>/g, "\n")
                                .replace(/<[^>]+>/g, "")
                                .replace(/&nbsp;/g, " ")
                                .replace(/\n\n/g, "\n") || "No description available.", 456))
                        .setColor('RANDOM')
                        .setTitle(data.media[i].title.romaji.toString())
                        .setURL(data.media[i].siteUrl)
                        .setThumbnail(data.media[i].coverImage.large)
                        .setImage(data.media[i].bannerImage)
                        .addFields(
                            { name: 'Start Date', value: `${data.media[i].startDate.year}-${data.media[i].startDate.month}-${data.media[i].startDate.day}`, inline: true },
                            { name: "Ended on", value: `${data.media[i]?.endDate.year}-${data.media[i]?.endDate.month}-${data.media[i]?.endDate.day}`, inline: true },
                            { name: 'Average Score', value: `${data.media[i].averageScore}%` || "Unknown", inline: true },
                            { name: 'Status', value: data.media[i].status?.toString().replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase()) || "Unknown", inline: true },
                            { name: 'Source', value: data.media[i]?.source?.toString().replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase()) || "Unknown", inline: true },
                            { name: 'Chapters', value: data.media[i]?.chapters?.toString() || "Unknown", inline: true },
                            { name: 'Genres', value: data.media[i].genres?.toString().replace(/,/g, ", "), },
                        )
                        .setFooter(`Requested by ${message.author.username}`);
                    embeds.push(embed);
                }

                paginationEmbed(paginationOpts(message, embeds))

            })
            .catch((error) => {
                console.log(error);
                message.channel.send({ embeds: [EmbedError(error, vars)] });
            });
    }
}