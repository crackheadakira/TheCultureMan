const { MessageEmbed } = require(`discord.js`);
const GraphQLRequest = require("../../handlers/GraphQLRequest");
let UserChecker = require("../../handlers/UserChecker");

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

            vars = {
                userid: (await UserChecker(message))?.anilistID || "Unable to find ID"
            }

        } else {

            try {
                let uData = (await GraphQLRequest("user", vars))?.User;
                vars = {
                    userid: uData?.id || "Unable to find ID"
                }
            } catch (error) {
                console.log(error);
                message.channel.send({ embeds: [EmbedError(error, vars)] });
            }

        }

        GraphQLRequest("activity", vars)
            .then((dData) => {

                let data = dData.Activity;

                const embed = new MessageEmbed()
                    .setURL(data?.siteUrl)
                    .setFooter(`Requested by ${message?.author?.username}, ${data?.likes?.length} likes | Created at ${new Date(data?.createdAt * 1000).toLocaleString()}`)

                if (data?.__typename.includes("TextActivity")) {
                    embed
                        .setTitle(`Here's ${data?.user?.name?.toString() || "Unknown Name"}'s most recent activity!`)
                        .setDescription(data?.text?.replace(`!~`, `||`)
                            .replace(`~!`, `||`)
                            .replaceAll('~', ``))
                        .setThumbnail(data?.user?.avatar?.large)

                    return message.channel.send({ embeds: [embed] });

                } else if (data?.__typename.includes("MessageActivity")) {
                    embed
                        .setTitle(`${data?.recipient?.name?.toString()} was sent a message by ${data?.messenger?.name?.toString()}`)
                        .setDescription(data?.message?.toString()?.replace(new RegExp(`!~`, `gi`), `||`).replace(new RegExp(`~!`, `gi`), `||`).replace(/~/gi, ``))
                        .setThumbnail(data?.recipient?.avatar?.large)

                    return message.channel.send({ embeds: [embed] });

                } else
                    embed
                        .setTitle(`Here's ${data?.user?.name?.toString()}'s most recent activity!`)
                        .setThumbnail(data?.media?.coverImage?.large || data?.media?.coverImage?.medium)
                        .setDescription(`**${data?.status?.toString().replace(/(^\w{1})|(\s{1}\w{1})/g, (match) => match.toUpperCase())} ${data?.progress?.toString() || ""} ${data?.media?.title?.romaji || data?.media?.title?.english || data?.media?.title?.native}**`)
                return message.channel.send({ embeds: [embed] });
            }).catch((error) => {
                console.log(error);
                message.channel.send({ embeds: [EmbedError(error, vars)] });
            });
    }
}
