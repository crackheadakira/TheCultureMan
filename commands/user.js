const settings = require('./anitoken.json');
const anilist = require('anilist-node');
const { MessageEmbed } = require('discord.js');
const Anilist = new anilist(settings.token);
const Command = require('../Structures/command.js');

module.exports = new Command({
    name: "user",
    description: "This will search Anilist for the specified user and give you info about them.",

    async run(message, args, client) {
        if (!message.content.startsWith('n.user')) {
            return;
        }


        let string = message.content.replace("n.user ", "");


        Anilist.user.all(string).then(data => {
            try {

                let userID = data.id;
                let userName = data.name;
                let userAvatar = data.avatar.large;
                let userURL = data.siteUrl;
                let userBanner = data.bannerImage;

                // User's Anime Statistics
                let animeStatistics = data.statistics.anime;
                let animeMeanScore = animeStatistics.meanScore;
                let animeWatched = animeStatistics.count;
                let animeEpisodes = animeStatistics.episodesWatched;

                // User's Manga Statistics
                let mangaStatistics = data.statistics.manga;
                let mangaMeanScore = mangaStatistics.meanScore;
                let mangaRead = mangaStatistics.count;
                let mangaChapters = mangaStatistics.chaptersRead;

                // User's Favourite Anime & Manga
                let animeFavourites = data.favourites.anime;
                let mangaFavourites = data.favourites.manga;

                // Sort user's favourite anime
                let aTitle = animeFavourites.map(({ title }) => title);
                var aTitles = aTitle.map(function (item) {
                    return item['romaji'];
                });

                // Sort user's favourite manga
                let mTitle = mangaFavourites.map(({ title }) => title);
                var mTitles = mTitle.map(function (item) {
                    return item['romaji'];
                });

                // Fixes the titles to be in a good order
                aTitles = aTitles.toString();
                mTitles = mTitles.toString();
                mTitles = mTitles.replace(/,/g, "\n");
                aTitles = aTitles.replace(/,/g, "\n");

                const embed = new MessageEmbed()
                    .setTitle(userName.toString() + "'s profile")
                    .setThumbnail(userAvatar)
                    .setImage(userBanner)
                    .setURL(userURL)
                    .addFields(
                        { name: "User ID", value: userID.toString() },
                        { name: "Anime Mean Score", value: animeMeanScore.toString(), inline: true },
                        { name: "Anime Watched", value: animeWatched.toString(), inline: true },
                        { name: "Episodes Watched", value: animeEpisodes.toString(), inline: true },
                        { name: "Manga Mean Score", value: mangaMeanScore.toString(), inline: true },
                        { name: "Manga Read", value: mangaRead.toString(), inline: true },
                        { name: "Chapters Read", value: mangaChapters.toString(), inline: true },
                    )
                    .setFooter("Requested by " + message.author.username)

                const favouritesEmbed = new MessageEmbed()
                    .setTitle(userName + "'s favourites")
                    .setThumbnail(userAvatar)
                    .setURL(userURL)
                    .addFields(
                        { name: "Favourite Anime", value: aTitles },
                        { name: "Favourite Manga", value: mTitles },
                    )
                    .setFooter("Requested by " + message.author.username)

                message.channel.send({ embeds: [embed] })
                message.channel.send({ embeds: [favouritesEmbed] })

            } catch (error) {
                message.channel.send("Bot received an error. Maybe there was a grammatical mistake?")
                console.log("Here's the error: " + error)
            }
        });
    }
});