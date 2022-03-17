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
    type: 'anilist',
    run: async (client, message, args) => {

        const argz = message.content.split(" ");

        let string = message.content.replace(`${process.env.prefix}user `, "");

        if (argz.length === 1) {
            const anilistCheck = await AnilistSchema.findOne({ userId: message.author.id });
            if (anilistCheck) {
                string = anilistCheck.anilistName.toString();
            }
        }

        Anilist.user.all(string).then(data => {
            try {

                let userID = data.id;
                let userName = data.name.toString();
                let userAvatar = data.avatar.large;
                let userURL = data.siteUrl.toString();
                let userBanner = data.bannerImage;
                var vars = {
                    userid: userID,
                };

                GraphQLRequest(GraphQLQueries.user, vars).then((yeezies) => {

                    let followers = yeezies.Page.pageInfo.total;

                    let donatorTier = data.donatorTier.toString();

                    // User's Anime Statistics
                    let animeStatistics = data.statistics.anime;
                    let animeMeanScore = animeStatistics.meanScore.toString();
                    let animeWatched = animeStatistics.count.toString();
                    let animeEpisodes = animeStatistics.episodesWatched.toString();

                    // User's Manga Statistics
                    let mangaStatistics = data.statistics.manga;
                    let mangaMeanScore = mangaStatistics.meanScore.toString();
                    let mangaRead = mangaStatistics.count.toString();
                    let mangaChapters = mangaStatistics.chaptersRead.toString();

                    // Sort user's favourite anime
                    let aTitle = data.favourites.anime.map(({ title }) => title);
                    let aTitles = aTitle.map(({ romaji }) => romaji);

                    // Sort user's favourite manga
                    let mTitle = data.favourites.manga.map(({ title }) => title);
                    let mTitles = mTitle.map(({ romaji }) => romaji);

                    // Fixes the titles to be in a good order
                    aTitles = aTitles.toString().replace(/,/g, "\n");
                    mTitles = mTitles.toString().replace(/,/g, "\n");


                    const embed = new MessageEmbed()
                        .setTitle(`${userName}'s profile`)
                        .setThumbnail(userAvatar)
                        .setImage(userBanner)
                        .setURL(userURL)
                        .addFields(
                            { name: "User ID", value: userID.toString(), inline: true },
                            { name: "Followers", value: followers.toString(), inline: true },
                            { name: "Donator Tier", value: `Tier ${donatorTier}`, inline: true },
                            { name: "Anime Mean Score", value: animeMeanScore, inline: true },
                            { name: "Anime Watched", value: animeWatched, inline: true },
                            { name: "Episodes Watched", value: animeEpisodes, inline: true },
                            { name: "Manga Mean Score", value: mangaMeanScore, inline: true },
                            { name: "Manga Read", value: mangaRead, inline: true },
                            { name: "Chapters Read", value: mangaChapters, inline: true },
                        )
                        .setFooter("Requested by " + message.author.username)

                    const favouritesEmbed = new MessageEmbed()
                        .setTitle(`${userName}'s favourites`)
                        .setThumbnail(userAvatar)
                        .setURL(userURL)
                        .addFields(
                            { name: "Favourite Anime", value: `${aTitles || "No Favourites"}` },
                            { name: "Favourite Manga", value: `${mTitles || "No Favourites"}` },
                        )
                        .setFooter(`Requested by ${message.author.username}`)

                    const pages = [embed, favouritesEmbed]
                    paginationEmbed(paginationOpts(message, pages))

                });
            } catch (error) {
                message.channel.send("``" + `${error}, you have possibly not set an username` + "``");
                console.log(error);
            }
        });
    }
}