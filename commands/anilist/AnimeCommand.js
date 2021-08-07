const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");
const settings = require('./anitoken.json');
const anilist = require('anilist-node');
const Anilist = new anilist(settings.token);

module.exports = class AnimeCommand extends BaseCommand {
  constructor() {
    super('anime', 'anilist', []);
  }

  run(client, message, args) {
    if (!message.content.startsWith('n.anime')) {
      return;
    }


    let string = message.content.replace("n.anime ", "");


    Anilist.searchEntry.anime(string).then(Data => {


      let nData = Data.media;
      let ID = nData.map(({ id }) => id);

      var nID = parseInt(ID);

      Anilist.media.anime(nID).then(mData => {

        let hSource = mData.source.toLowerCase();
        let Title = mData.title.romaji;
        let cover = mData.coverImage.large;
        let hGenres = mData.genres.toString();
        let averageScore = mData.averageScore;
        let hStatus = mData.status.toLowerCase();
        let description = mData.description;
        let URL = mData.siteUrl;

        let fDesc = description.replace(/<[^>]*>?/gm, ''); // Removes the HTML Tags from the String
        let ffDesc = fDesc.replace(/\r?\n?[^\r\n]*$/, ""); // Removes the last line aka (Source: X)

        let source = hSource.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase()); // Makes the first letter capitalized, even if there is a space
        let status = hStatus.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase()); // Makes the first letter capitalized, even if there is a space

        let genres = hGenres.replace(/,/g, ", ");

        // This part here limits the amount of letter's it displays. It does not cut off words

        var maxLength = 500 // maximum number of characters to extract
        var trimmedString = ffDesc.substr(0, maxLength);
        trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))

        const embed = new Discord.MessageEmbed()
          .setColor('RANDOM')

          .setTitle(Title)
          .setURL(URL)
          .setThumbnail(cover)
          .addFields(
            { name: 'Average Score', value: averageScore + "%", inline: true },
            { name: 'Status', value: status, inline: true },
            { name: 'Source', value: source, inline: true },
            { name: 'Genres', value: genres, },
            { name: 'Description', value: trimmedString + "..." },
          )

        message.channel.send(embed)
      });
    });
  }
}
