const { MessageEmbed } = require(`discord.js`);
let AnilistSchema = require('../../schemas/AnilistSchema');
const GraphQLRequest = require("../../handlers/GraphQLRequest");

module.exports = {
    name: `activity`,
    description: `This will fetch the one recent activity of the specified person from Anilist.`,
    type: 'anilist',
    run: async (client, message, args) => {

        let string = args.slice(0).join(" ");
        let vars = {
            name: string
        };

        if (!string) {
            try {
                const anilistCheck = await AnilistSchema.findOne({ where: { userId: message.author.id } });
                if (!anilistCheck) {
                    return message.channel.send("You have yet to set an AniList username.")
                }
                vars = {
                    id: anilistCheck.anilistID
                }
            } catch (error) {
                message.channel.send("``" + error + "``");
                console.log(error);
            }
        }

        let uData = await GraphQLRequest("user", vars)
        uData = uData.User;
        vars = {
            userid: uData.id
        };
        

        GraphQLRequest("activity", vars)
            .then((dData) => {

                let data = dData.Activity;

                const embed = new MessageEmbed()
                    .setURL(data.siteUrl)
                    .setFooter(`Requested by ${message.author.username} | Created at ${new Date(data.createdAt * 1000).toLocaleString()}`)

                if (data.__typename.includes("TextActivity")) {
                    embed
                        .setTitle(`Here's ${uData?.name?.toString() || "Unknown Name"}'s most recent activity!`)
                        .setDescription(data?.text?.replace(`!~`, `||`)
                            .replace(`~!`, `||`)
                            .replaceAll('~', ``))
                        .setThumbnail(uData?.avatar?.large)

                    return message.channel.send({ embeds: [embed] });

                } else if (data.__typename.includes("MessageActivity")) {
                    embed
                        .setTitle(`${uData.name.toString()} was sent a message`)
                        .setDescription(data?.message?.toString()?.replace(new RegExp(`!~`, `gi`), `||`).replace(new RegExp(`~!`, `gi`), `||`).replace(/~/gi, ``))
                        .setThumbnail(uData.avatar.large)

                    return message.channel.send({ embeds: [embed] });

                } else
                    embed
                        .setTitle(`Here's ${uData.name.toString()}'s most recent activity!`)
                        .setThumbnail(data?.media?.coverImage?.large || data?.media?.coverImage?.medium)
                        .setDescription(`**${data?.status?.toString().replace(/(^\w{1})|(\s{1}\w{1})/g, (match) => match.toUpperCase())} ${data?.progress?.toString() || ""} ${data?.media?.title?.romaji || data?.media?.title?.english || data?.media?.title?.native}**`)
                return message.channel.send({ embeds: [embed] });
            }).catch((error) => {
                console.log(error);
                message.channel.send({ embeds: [EmbedError(error, vars)] });
            });
    }
}
