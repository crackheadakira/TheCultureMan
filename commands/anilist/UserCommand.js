const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");
const settings = require('./anitoken.json');
const anilist = require('anilist-node');
const Anilist = new anilist(settings.token);

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

        const embed = new Discord.MessageEmbed()
        .setTitle(userName + "'s profile")
        .setThumbnail(userAvatar)
        .setImage(userBanner)
        .setURL(userURL)
        .addFields(
          { name: 'User ID', value: userID },
          { name: "Anime Mean Score", value: animeMeanScore, inline : true },
          { name: "Anime Watched", value: animeWatched, inline : true },
          { name: "Episodes Watched", value: animeEpisodes, inline : true },
          { name: "Manga Mean Score", value: mangaMeanScore, inline : true },
          { name: "Manga Read", value: mangaRead, inline : true },
          { name: "Chapters Read", value: mangaChapters, inline : true },
        )

        message.channel.send(embed)

      } catch (error) {
       message.channel.send("Bot received an error. Maybe there was a grammatical mistake?")
      }
    });
  }
}
