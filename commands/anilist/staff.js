const { MessageEmbed } = require('discord.js');
const GraphQLRequest = require("../../handlers/GraphQLRequest");

module.exports = {
    name: "staff",
    description: "This will search Anilist for the specified staff and give you info about them.",
    type: 'anilist',
    run: async (client, message, args) => {

        let trimString = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
        let string = args.slice(0).join(" ");

        let vars = {
            staff: string,
        }

        GraphQLRequest("staff", vars)
            .then((data) => {

                data = data.Staff;

                const embed = new MessageEmbed()
                    .setTitle(data?.name?.full || data?.name?.native || "Unknown")
                    .setURL(data.siteUrl)
                    .setThumbnail(data?.image?.large || data?.image?.medium)
                    .setDescription(trimString(data?.description?.replace(/<[^>]*>?/gm, '').replace(new RegExp('!~|~!', 'gi'), '||') || "Unknown", 456))
                    .setFooter(`Requested by ${message.author.username} | ${+data?.favourites || "Unknown amount of"} Favourites`)

                message.channel.send({ embeds: [embed] });

            }).catch((error) => {
                message.channel.send("``" + error + "``");
                console.log(error);
            });
    }
}