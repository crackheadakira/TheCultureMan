const settings = require('../../config.json');
const anilist = require('anilist-node');
const { MessageEmbed } = require('discord.js');
const Anilist = new anilist(settings.anitoken);

module.exports = {
    name: "activity",
    description: "This will fetch the one recent activity of the specified person from Anilist.",
    run: async (client, message, args) => {

        if (!message.content.startsWith('n.activity')) {
            return;
        }


        let string = message.content.replace("n.activity ", "");

        Anilist.user.profile(string).then(mData => {
            try {
                let userID = mData.id;
                let userName = mData.name;
                let userAvatar = mData.avatar.large;

                Anilist.activity.getUserActivity(userID, 1, 1).then(data => {

                    var text = data.map(function (item) {
                        return item['text'];
                    });

                    var ID = data.map(function (item) {
                        return item['id'];
                    });
                    var likeCount = data.map(function (item) {
                        return item['likeCount'];
                    });
                    var progress = data.map(function (item) {
                        return item['progress'];
                    });

                    var hStatus = data.map(function (item) {
                        return item['status'];
                    });

                    let URL = "https://anilist.co/activity/" + ID;

                    let type = data.map(function (item) {
                        return item['type'];
                    });

                    let hType = type.toString();

                    let media = data.map(function (item) {
                        return item['media'];
                    });

                    if (hType.includes("MESSAGE")) {
    
                        var m1 = data.map(function (item) {
                            return item['message'];
                        });
                        
                        var fText = m1.toString();
                        fText = fText.replace(new RegExp('!~', 'gi'), '||') // Makes spoiler tag's work in Discord
                        fText = fText.replace(new RegExp('~!', 'gi'), '||') // Makes spoiler tag's work in Discord
                        fText = fText.replace(/~/gi, ''); // Removes the centering marks

                        const embed = new MessageEmbed()
                            .setURL(URL)
                            .setTitle(`${userName} was sent a message`)
                            .setDescription(fText)
                            .setFooter("Requested by " + message.author.username + " | " + likeCount + " Likes")
                            .setThumbnail(userAvatar)

                        return message.channel.send({ embeds: [embed] });
                    } else if (hType.includes('TEXT')) {

                        var fText = text.toString();
                        fText = fText.replace(new RegExp('!~', 'gi'), '||') // Makes spoiler tag's work in Discord
                        fText = fText.replace(new RegExp('~!', 'gi'), '||') // Makes spoiler tag's work in Discord
                        fText = fText.replace(/~/gi, ''); // Removes the centering marks

                        const embed = new MessageEmbed()
                            .setURL(URL)
                            .setTitle(`Here's ${userName.toString()}'s most recent activity!`)
                            .setDescription(fText)
                            .setFooter(`Requested by ${message.author.username} | ${likeCount} likes`)
                            .setThumbnail(userAvatar)

                        return message.channel.send({ embeds: [embed] });
                    } else if (hType.toLowerCase().includes("anime_list") || hType.toLowerCase().includes("manga_list")) {

                        let mId = media.map(function (item) {
                            return item['id'];
                        });
                        mId = parseInt(mId)

                        if (hType.toLowerCase().includes("anime_list")) {
                            Anilist.media.anime(mId).then(mData => {
                                let animeCover = mData.coverImage.large;

                                var Media = data.map(function (item) {
                                    return item['media'];
                                });

                                var MediaTitle = Media.map(function (item) {
                                    return item['title'];
                                });

                                let romajiTitle = MediaTitle.map(({ romaji }) => romaji);

                                hStatus = hStatus.toString();

                                let status = hStatus.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());

                                const animeList = new MessageEmbed()
                                    .setURL(URL)
                                    .setTitle(`Here's ${userName.toString()}'s most recent activity!`)
                                    .setThumbnail(animeCover)
                                    .setFooter(`Requested by ${message.author.username} | ${likeCount} likes`)
                                    .addFields(
                                        { name: `${status.toString()} ${progress.toString()}`, value: romajiTitle.toString() }
                                    )
                                return message.channel.send({ embeds: [animeList] })
                            });
                        } else if (hType.toLowerCase().includes("manga_list")) {
                            Anilist.media.manga(mId).then(mData => {
                                let mangaCover = mData.coverImage.large;

                                var Media = data.map(function (item) {
                                    return item['media'];
                                });

                                var MediaTitle = Media.map(function (item) {
                                    return item['title'];
                                });

                                let romajiTitle = MediaTitle.map(({ romaji }) => romaji);

                                hStatus = hStatus.toString();

                                let status = hStatus.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());

                                const mangaList = new MessageEmbed()
                                    .setURL(URL)
                                    .setTitle(`Here's ${userName.toString()}'s most recent activity!`)
                                    .setThumbnail(mangaCover)
                                    .setFooter(`Requested by ${message.author.username} | ${likeCount} likes`)
                                    .addFields(
                                        { name: `${status.toString()} ${progress.toString()}`, value: romajiTitle.toString() }
                                    )

                                return message.channel.send({ embeds: [mangaList] });
                            });
                        }
                    }
                });
            } catch (error) {
                message.channel.send("Bot received an error. Maybe there was a grammatical mistake?");
                console.log(error);
            }
        });
    }
}