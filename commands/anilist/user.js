let anilist = require('anilist-node');
let { MessageEmbed, MessageButton } = require('discord.js');
let Anilist = new anilist(process.env.anitoken);
let AnilistSchema = require('../../schemas/AnilistSchema');
let paginationEmbed = require('@acegoal07/discordjs-pagination');
let paginationOpts = require('../../handlers/paginationOptions');
let GraphQLRequest = require("../../handlers/GraphQLRequest");
let GraphQLQueries = require("../../handlers/GraphQLQueries");

module.exports = {
    name: "user",
    description: "This will search Anilist for the specified user and give you info about them.",
    run: async (client, message, args) => {

        if (!message.content.startsWith(`${process.env.prefix}user`)) {
            return;
        }

        const argz = message.content.split(" ");

        let string = message.content.replace(`${process.env.prefix}user `, "");

        if (argz.length === 1) {
            const anilistCheck = await AnilistSchema.findOne({ userId: message.author.id });
            if (anilistCheck) {
                string = anilistCheck.anilistName;
            } else {
                string = message.content.replace(`${process.env}user `, "");
            }
        }

        Anilist.user.all(string).then(data => {
            try {

                let userID = data.id;
                let userName = data.name;
                let userAvatar = data.avatar.large;
                let userURL = data.siteUrl;
                let userBanner = data.bannerImage;
                var vars = {
                    userid: userID,
                };

                GraphQLRequest(GraphQLQueries.user, vars)
                    .then((yeezies) => {
                        let followers = yeezies.Page.pageInfo.total;

                        let donatorTier = data.donatorTier;

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
                                { name: "User ID", value: userID.toString(), inline: true },
                                { name: "Followers", value: followers.toString(), inline: true },
                                { name: "Donator Tier", value: `Tier ${donatorTier.toString()}`, inline: true },
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
                                { name: "Favourite Anime", value: `${aTitles || "No Favourites"}` },
                                { name: "Favourite Manga", value: `${mTitles || "No Favourites"}` },
                            )
                            .setFooter("Requested by " + message.author.username)

                        const pages = [embed, favouritesEmbed]
                        paginationEmbed(paginationOpts(message, pages))

                    });
            } catch (error) {
                message.channel.send("The user doesn't exist or you haven't set your AniList user, set it using n.setuser.")
                return console.log(error);
            }
        });
    }
}