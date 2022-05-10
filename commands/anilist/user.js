let { MessageEmbed, MessageButton } = require('discord.js');
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

        let vars = {
            name: string,
        };

        GraphQLRequest(GraphQLQueries.user, vars)
            .then((data) => {

                data = data.User;

                let userID = data?.id || "Unknown ID";
                let userName = data?.name?.toString() || "Unknown";
                let userAvatar = data?.avatar?.large || data?.avatar?.medium;
                let userURL = data?.siteUrl?.toString() || "Unknown URL";
                let userBanner = data?.bannerImage || "Unknown";
                vars = {
                    userid: userID,
                };

                GraphQLRequest(GraphQLQueries.followers, vars)
                    .then((followerData) => {

                        let followers = followerData.Page.pageInfo.total;

                        // User's Anime Statistics
                        let animeWatched = data?.statistics?.anime?.count.toString() || "Unknown amount";
                        let animeEpisodes = data?.statistics?.anime?.episodesWatched.toString() || "Unknown amount";

                        // User's Manga Statistics
                        let mangaRead = data?.statistics?.manga?.count.toString() || "Unknown amount";
                        let mangaChapters = data?.statistics?.manga?.chaptersRead.toString() || "Unknown amount";

                        let animeSeries = [];
                        let mangaSeries = []

                        data.favourites.anime.nodes.forEach(serie => {
                            animeSeries.unshift(`[${serie?.title?.userPreferred || serie?.title?.romaji || serie?.title?.english || serie?.title?.native || "Unknown"}](${serie?.siteUrl || "Unknown"})`);
                        });

                        data.favourites.manga.nodes.forEach(serie => {
                            mangaSeries.unshift(`[${serie?.title?.userPreferred || serie?.title?.romaji || serie?.title?.english || serie?.title?.native || "Unknown"}](${serie?.siteUrl || "Unknown"})`);
                        });

                        animeSeries = animeSeries.toString().replace(/,/g, "\n");
                        mangaSeries = mangaSeries.toString().replace(/,/g, "\n");


                        const embed = new MessageEmbed()
                            .setTitle(`${userName}'s profile`)
                            .setThumbnail(userAvatar)
                            .setImage(userBanner)
                            .setURL(userURL)
                            .addFields(
                                { name: "User ID", value: userID.toString(), inline: true },
                                { name: "Followers", value: followers.toString(), inline: true },
                                { name: "Anime Statistics", value: `${animeWatched} anime watched \n ${animeEpisodes} episodes watched` },
                                { name: "Manga Statistics", value: `${mangaRead} manga read \n ${mangaChapters} chapters read` },
                            )
                            .setFooter("Requested by " + message.author.username)

                        const favouritesEmbed = new MessageEmbed()
                            .setTitle(`${userName}'s favourites`)
                            .setThumbnail(userAvatar)
                            .setURL(userURL)
                            .addFields(
                                { name: "Favourite Anime", value: `${animeSeries || "No Favourites"}`, inline: true },
                                { name: "Favourite Manga", value: `${mangaSeries || "No Favourites"}`, inline: true },
                            )
                            .setFooter(`Requested by ${message.author.username}`)

                        const pages = [embed, favouritesEmbed]
                        paginationEmbed(paginationOpts(message, pages))

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