const { MessageEmbed } = require(`discord.js`);
let AnilistSchema = require('../../schemas/AnilistSchema');
const GraphQLRequest = require("../../handlers/GraphQLRequest");
let UserChecker = require("../../handlers/UserChecker");

module.exports = {
    name: `makeactivity`,
    description: `This allows you to make activities for AniList.`,
    type: 'anilist',
    run: async (client, message, args) => {
        let string = args.slice(0).join(" ");
        if (!string) { return message.channel.send("You forgot to add text that should be included in the activity!") }
        let authToken = (await UserChecker(message)).authToken;

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