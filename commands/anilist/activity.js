const anilist = require(`anilist-node`);
let AnilistSchema = require('../../schemas/AnilistSchema');
const { MessageEmbed } = require(`discord.js`);
const Anilist = new anilist();

module.exports = {
    name: `activity`,
    description: `This will fetch the one recent activity of the specified person from Anilist.`,
    type: 'anilist',
    run: async (client, message, args) => {

        let string = args.slice(0).join(" ");

        if (!string) {
            try {
                const anilistCheck = await AnilistSchema.findOne({ where: { userId: message.author.id } });
                if (!anilistCheck) {
                    return message.channel.send("You have yet to set an AniList username.")
                }
                string = anilistCheck.anilistName
            } catch (error) {
                message.channel.send("``" + error + "``");
                console.log(error);
            }
        }

        Anilist.user.profile(string).then((uData) => {
            try {

                Anilist.activity.getUserActivity(uData.id, 1, 1).then((dData) => {

                    let data = dData[0]

                    const embed = new MessageEmbed()
                        .setURL(`https://anilist.co/activity/${data.id}`)
                        .setFooter(`Requested by ${message.author.username} | Created at ${new Date(data.createdAt * 1000).toLocaleString()}`)

                    if (data.type.toString().includes("TEXT")) {
                        embed
                            .setTitle(`Here's ${uData.name.toString()}'s most recent activity!`)
                            .setDescription(data.text?.toString()?.replace(new RegExp(`!~`, `gi`), `||`).replace(new RegExp(`~!`, `gi`), `||`).replace(/~/gi, ``))
                            .setThumbnail(uData.avatar.large)

                        message.channel.send({ embeds: [embed] });

                    } else if (data.type.toString().includes("MESSAGE")) {
                        embed
                            .setTitle(`${uData.name.toString()} was sent a message`)
                            .setDescription(data.message?.toString()?.replace(new RegExp(`!~`, `gi`), `||`).replace(new RegExp(`~!`, `gi`), `||`).replace(/~/gi, ``))
                            .setThumbnail(uData.avatar.large)

                        message.channel.send({ embeds: [embed] });

                    } else
                        embed
                            .setTitle(`Here's ${uData.name.toString()}'s most recent activity!`)
                            .setThumbnail(data?.media?.coverImage?.large || data?.media?.coverImage?.medium)
                            .setDescription(`**${data?.status?.toString().replace(/(^\w{1})|(\s{1}\w{1})/g, (match) => match.toUpperCase())} ${data?.progress?.toString() || ""} ${data?.media?.title?.romaji?.toString()}**`)
                    message.channel.send({ embeds: [embed] });
                });
            } catch (error) {
                message.channel.send("``" + error + "``");
                console.log(error);
            }
        });
    }
}
