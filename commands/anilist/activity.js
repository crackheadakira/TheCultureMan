const anilist = require(`anilist-node`);
let AnilistSchema = require('../../schemas/AnilistSchema');
const { MessageEmbed } = require(`discord.js`);
const Anilist = new anilist(process.env.anitoken);

module.exports = {
    name: `activity`,
    description: `This will fetch the one recent activity of the specified person from Anilist.`,
    run: async (client, message, args) => {

        const argz = message.content.split(" ");
        let string = message.content.replace(`${process.env.prefix}activity `, "");

        if (argz.length === 1) {
            const anilistCheck = await AnilistSchema.findOne({ userId: message.author.id });
            if (anilistCheck) {
                string = anilistCheck.anilistName;
            }
        }
        
        Anilist.user.profile(string).then(mData => {
            try {

                Anilist.activity.getUserActivity(mData.id, 1, 1).then(dData => {

                    let data = dData[0]

                    if (data.type.toString().includes("MESSAGE") || data.type.toString().includes("TEXT")) {

                        const embed = new MessageEmbed()
                            .setURL(`https://anilist.co/activity/${data.id}`)
                            .setDescription(data.text?.toString()?.replace(new RegExp(`!~`, `gi`), `||`).replace(new RegExp(`~!`, `gi`), `||`).replace(/~/gi, ``) || data.message?.toString()?.replace(new RegExp(`!~`, `gi`), `||`).replace(new RegExp(`~!`, `gi`), `||`).replace(/~/gi, ``))
                            .setFooter(`Requested by ${message.author.username} | Created at ${new Date(data.createdAt * 1000).toLocaleString()}`)
                            .setThumbnail(mData.avatar.large)

                        if(data.type.toString().includes("TEXT")) {
                            embed.setTitle(`Here's ${mData.name.toString()}'s most recent activity!`) } else { 
                            embed.setTitle(`${mData.name.toString()} was sent a message`) }

                        return message.channel.send({ embeds: [embed] });

                    } else if (data.type.toString().includes("ANIME_LIST")) {
                        Anilist.media.anime(parseInt(data.media.id)).then(aData => {

                            const embed = new MessageEmbed()
                                .setURL(`https://anilist.co/activity/${data.id}`)
                                .setTitle(`Here's ${mData.name.toString()}'s most recent activity!`)
                                .setThumbnail(aData.coverImage.large)
                                .setDescription(`**${data.status?.toString()?.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase())} ${data.progress.toString()} of ${data.media.title.romaji.toString()}**`)
                                .setFooter(`Requested by ${message.author.username} | Created at ${new Date(data.createdAt * 1000).toLocaleString()}`)

                            return message.channel.send({ embeds: [embed] })

                        });

                    } else if (data.type.toString().includes(`MANGA_LIST`)) {
                        Anilist.media.manga(mId).then(maData => {

                            const mangaList = new MessageEmbed()
                                .setURL(`https://anilist.co/activity/${data.id}`)
                                .setTitle(`Here's ${mData.name.toString()}'s most recent activity!`)
                                .setThumbnail(maData.coverImage.large)
                                .setFooter(`Requested by ${message.author.username} | Created at ${new Date(data.createdAt * 1000).toLocaleString()}`)
                                .addFields(
                                    { name: `${data.status?.toString()?.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase())} ${data.progress.toString()}`, value: data.media.title.romaji.toString() }
                                )

                            return message.channel.send({ embeds: [mangaList] });
                        });
                    }
                });
            } catch (error) {
                message.channel.send("``" + error + "``");
                console.log(error);
            }
        });
    }
}