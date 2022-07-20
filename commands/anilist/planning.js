const { MessageEmbed } = require(`discord.js`);
const GraphQLRequest = require("../../handlers/GraphQLRequest");
let UserChecker = require("../../handlers/UserChecker");

module.exports = {
    name: `planning`,
    description: `This allows you to add series to your planning if you've authenticated yourself, just use the media ID when trying to add a series.`,
    type: 'anilist',
    run: async (client, message, args) => {

        let string = args.slice(0).join(" ");
        if (!string) { return message.channel.send("You forgot to mention a media ID!") }
        let authToken = (await UserChecker(message)).authToken;

        let vars = {
            mediaId: +string
        }

        GraphQLRequest("p2w", vars, authToken)
            .then((data) => {
                data = data.SaveMediaListEntry;

                const embed = new MessageEmbed()
                    .setTitle(`Added ${data?.media?.title?.userPreferred || "Unknown"} to Planning`)
                    .setURL(data?.media?.siteUrl)
                    .setImage(data?.media?.bannerImage);

                message.channel.send({ embeds: [embed] });

            }).catch((error) => {
                console.log(error);
                message.channel.send({ embeds: [EmbedError(error, vars)] });
            });
    }
}