const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");
const settings = require('./anitoken.json');
const anilist = require('anilist-node');
const nodemon = require('nodemon');
const Anilist = new anilist(settings.token);
const paginationEmbed = require('discord.js-pagination');

module.exports = class AnimeCommand extends BaseCommand {
  constructor() {
    super('anime', 'anilist', []);
  }

  run(client, message, args) {
    if (!message.content.startsWith('n.anime')) {
      return;
    }

    let trimString = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

    let string = message.content.replace("n.anime ", "");

    Anilist.searchEntry.anime(string, null, 1, 2).then(Data => {
      try {

        let Series1 = Data.media.splice(0, 1);
        let Series2 = Data.media.splice(0, 2);

        let S1FID = Series1.map(({ id }) => id);
        var S1ID = parseInt(S1FID);

        let S2FID = Series2.map(({ id }) => id);
        var S2ID = parseInt(S2FID);

        Anilist.media.anime(S1ID).then(S1Data => {

          let hSource = S1Data.source;
          let Title = S1Data.title.romaji;
          let cover = S1Data.coverImage.large;
          let hGenres = S1Data.genres.toString();
          let averageScore = S1Data.averageScore;
          let hStatus = S1Data.status.toLowerCase();
          let description = S1Data.description;
          let URL = S1Data.siteUrl;

          let startDate = S1Data.startDate;
          let endDate = S1Data.endDate;

          let sYear = startDate.year;
          let sMonth = startDate.month;
          let sDay = startDate.day;

          let eYear = endDate.year;
          let eMonth = endDate.month;
          let eDay = endDate.day;

          var sDate = sYear + "-" + sMonth + "-" + sDay;
          var eDate = eYear + "-" + eMonth + "-" + eDay;

          if (sYear == null) {
            sDate = "Hasn't Released Yet"
          }

          if (eYear == null) {
            eDate = "Hasn't Ended Yet"
          }

          let ffDesc = description.replace(/<[^>]*>?/gm, ''); // Removes the HTML Tags from the String

          let source = hSource.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase()); // Makes the first letter of each word capitalized, even if there is a space
          let status = hStatus.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase()); // Makes the first letter of each word capitalized, even if there is a space

          let genres = hGenres.replace(/,/g, ", ");

          // This part here limits the amount of letter's it displays. It does not cut off words
          let trimmedString = trimString(ffDesc, 1024);

          const Series1Embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(Title)
            .setURL(URL)
            .setThumbnail(cover)
            .addFields(
              { name: 'Average Score', value: averageScore + "%", inline: true },
              { name: 'Status', value: status, inline: true },
              { name: 'Source', value: source, inline: true },
              { name: 'Genres', value: genres, },
              { name: 'Start Date', value: sDate, inline: true },
              { name: 'End Date', value: eDate, inline: true },
              { name: 'Description', value: trimmedString }
            )

          if(Data.pageInfo.hasNextPage == false ) {
          return message.channel.send(Series1Embed);
          }

          Anilist.media.anime(S2ID).then(S2Data => {

            let hSource2 = S2Data.source.toLowerCase();
            let Title2 = S2Data.title.romaji;
            let cover2 = S2Data.coverImage.large;
            let hGenres2 = S2Data.genres.toString();
            let averageScore2 = S2Data.averageScore;
            let hStatus2 = S2Data.status.toLowerCase();
            let description2 = S2Data.description;
            let URL2 = S2Data.siteUrl;

            let startDate2 = S2Data.startDate;
            let endDate2 = S2Data.endDate;

            let sYear2 = startDate2.year;
            let sMonth2 = startDate2.month;
            let sDay2 = startDate2.day;

            let eYear2 = endDate2.year;
            let eMonth2 = endDate2.month;
            let eDay2 = endDate2.day;

            var sDate2 = sYear2 + "-" + sMonth2 + "-" + sDay2;
            var eDate2 = eYear2 + "-" + eMonth2 + "-" + eDay2;

            if (sYear2 == null) {
              sDate2 = "Hasn't Released Yet"
            }

            if (eYear2 == null) {
              eDate2 = "Hasn't Ended Yet"
            }

            let ffDesc2 = description2.replace(/<[^>]*>?/gm, ''); // Removes the HTML Tags from the String

            let source2 = hSource2.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase()); // Makes the first letter of each word capitalized, even if there is a space
            let status2 = hStatus2.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase()); // Makes the first letter of each word capitalized, even if there is a space

            let genres2 = hGenres2.replace(/,/g, ", ");

            // This part here limits the amount of letter's it displays. It does not cut off words
            let trimmedString2 = trimString(ffDesc2, 1024);

            const Series2Embed = new Discord.MessageEmbed()
              .setColor('RANDOM')
              .setTitle(Title2)
              .setURL(URL2)
              .setThumbnail(cover2)
              .addFields(
                { name: 'Average Score', value: averageScore2 + "%", inline: true },
                { name: 'Status', value: status2, inline: true },
                { name: 'Source', value: source2, inline: true },
                { name: 'Genres', value: genres2, },
                { name: 'Start Date', value: sDate2, inline: true },
                { name: 'End Date', value: eDate2, inline: true },
                { name: 'Description', value: trimmedString2 }
              )

            const pages = [
              Series1Embed,
              Series2Embed
            ]
            const emojiList = [
              "⬅️",
              "➡️"
            ];

            paginationEmbed(message, pages, emojiList);

          });
        });
      } catch (error) {
        message.channel.send("Bot received an error. Maybe there was a grammatical mistake?" + error)
      }
    });
  }
}