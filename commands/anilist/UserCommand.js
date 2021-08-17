const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");
const settings = require('./anitoken.json');
const anilist = require('anilist-node');
const Anilist = new anilist(settings.token);
const paginationEmbed = require('discord.js-pagination');

module.exports = class UserCommand extends BaseCommand {
  constructor() {
    super('user', 'anilist', []);
  }

  run(client, message, args) {
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

        const embed = new Discord.MessageEmbed()
          .setTitle(userName + "'s profile")
          .setThumbnail(userAvatar)
          .setImage(userBanner)
          .setURL(userURL)
          .addFields(
            { name: 'User ID', value: userID },
            { name: "Anime Mean Score", value: animeMeanScore, inline: true },
            { name: "Anime Watched", value: animeWatched, inline: true },
            { name: "Episodes Watched", value: animeEpisodes, inline: true },
            { name: "Manga Mean Score", value: mangaMeanScore, inline: true },
            { name: "Manga Read", value: mangaRead, inline: true },
            { name: "Chapters Read", value: mangaChapters, inline: true },
          )
          .setAuthor("Requested by " + message.author.username, message.author.avatarURL())

        const favouritesEmbed = new Discord.MessageEmbed()
          .setTitle(userName + "'s favourites")
          .setThumbnail(userAvatar)
          .setURL(userURL)
          .addFields(
            { name: "Favourite Anime", value: aTitles },
            { name: "Favourite Manga", value: mTitles },
          )
          .setAuthor("Requested by " + message.author.username, message.author.avatarURL())

        const pages = [
          embed,
          favouritesEmbed
        ]
        const emojiList = [
          "⬅️",
          "➡️"
        ];

        paginationEmbed(message, pages, emojiList);

      } catch (error) {
        message.channel.send("Bot received an error. Maybe there was a grammatical mistake?" )
        console.log("Here's the error: " + error)
      }
    });
  }
}