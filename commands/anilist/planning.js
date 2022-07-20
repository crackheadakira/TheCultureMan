const { MessageEmbed } = require(`discord.js`);
let AnilistSchema = require('../../schemas/AnilistSchema');
const GraphQLRequest = require("../../handlers/GraphQLRequest");

module.exports = {
    name: `planning`,
    description: `This allows you to add series to your planning if you've authenticated yourself, just use the media ID when trying to add a series.`,
    type: 'anilist',
    run: async (client, message, args) => {

        let string = args.slice(0).join(" ");
        if(!string){ return message.channel.send("You forgot to mention a media ID!")}
        let authToken;

        try {
            const anilistCheck = await AnilistSchema.findOne({ where: { userId: message.author.id } });
            if (!anilistCheck) {
                return message.channel.send("You have yet to set an AniList username.")
            }
            authToken = anilistCheck.authToken;
        } catch (error) {
            message.channel.send("``" + error + "``");
            console.log(error);
        }

        let vars = {
            mediaId: +string
        }

        GraphQLRequest("p2w", vars, authToken)
            .then((data) => {
                data = data.SaveMediaListEntry;

                const embed = new MessageEmbed()
                    .setTitle(`Added ${data?.media?.title?.userPreferred || "Unknown"} to Planning`)
                    .setThumbnail(data?.media?.coverImage?.large || "Unknown")
                    .setURL(data?.media?.siteUrl)
                    .setImage(data?.media?.bannerImage);

                message.channel.send({ embeds: [embed] });

            }).catch((error) => {
                console.log(error);
                message.channel.send({ embeds: [EmbedError(error, vars)] });
            });
    }
}