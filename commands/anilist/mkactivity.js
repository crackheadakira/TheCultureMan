const { MessageEmbed } = require(`discord.js`);
let AnilistSchema = require('../../schemas/AnilistSchema');
const GraphQLRequest = require("../../handlers/GraphQLRequest");

module.exports = {
    name: `makeactivity`,
    description: `This allows you to make activities for AniList.`,
    type: 'anilist',
    run: async (client, message, args) => {

        let string = args.slice(0).join(" ");
        if(!string){ return message.channel.send("You forgot to add text that should be included in the activity!")}
        let authToken;

        try {
            const anilistCheck = await AnilistSchema.findOne({ where: { userId: message.author.id } });
            if (!anilistCheck) {
                return message.channel.send("You have yet to set an AniList token.")
            }
            authToken = anilistCheck.authToken;
        } catch (error) {
            message.channel.send("``" + error + "``");
            console.log(error);
        }

        let vars = {
            text: string
        }

        GraphQLRequest("makeactivity", vars, authToken)
            .then((data) => {
                data = data.SaveTextActivity;

                const embed = new MessageEmbed()
                    .setTitle("Activity has been made!")
                    .setDescription(data.text)
                    .setURL(data?.siteUrl)

                message.channel.send({ embeds: [embed] });

            }).catch((error) => {
                console.log(error);
                message.channel.send({ embeds: [EmbedError(error, vars)] });
            });
    }
}