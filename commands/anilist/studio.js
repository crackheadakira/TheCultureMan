const { MessageEmbed } = require('discord.js');
const GraphQLRequest = require("../../handlers/GraphQLRequest");
const GraphQLQueries = require("../../handlers/GraphQLQueries");

module.exports = {
    name: "studio",
    description: "This will search Anilist for the specified studio and give you info about them.",
    type: 'anilist',
    run: async (client, message, args) => {

        let trimString = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
        let string = args.slice(0).join(" ");

        let vars = {
            studio: string,
        }

        GraphQLRequest(GraphQLQueries.studio, vars)
            .then((data) => {
                data = data?.Studio;

                let series = []
                for (serie of data.media.nodes) {
                    let serieEntry = `[${serie?.title?.english || serie?.title?.romaji || "Unknown"}](${serie.siteUrl})`
                    series = series.concat(serieEntry)
                }
                
                series = series.toString().replaceAll(",", "\n")

                const embed = new MessageEmbed()
                    .setTitle(data?.name || "Unknown")
                    .setURL(data?.siteUrl)
                    .setFooter(`Requested by ${message.author.username} | ${data?.favourites || "Unknown amount of "} Favourites`)
                    .setDescription(series.toString())

                message.channel.send({ embeds: [embed] })

            }).catch((error) => {
                message.channel.send("``" + error + "``");
                console.log(error);
            });

    }
}