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
                id: (await UserChecker(message)).anilistID
            }
        }

        GraphQLRequest("user", vars)
            .then((uData) => {
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
            }).catch((error) => {
                console.log(error);
                message.channel.send({ embeds: [EmbedError(error, vars)] });
            });
    }
}
