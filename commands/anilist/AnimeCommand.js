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

        let source = mData.source;
        let Title = mData.title.romaji;
        let cover = mData.coverImage.large;
        let genres = mData.genres;
        let averageScore = mData.averageScore;
        let status = mData.status;
        let description = mData.description;


        let fDesc = description.replace(/<[^>]*>?/gm, ''); // Removes the HTML Tags from the String
        let ffDesc = fDesc.replace(/\r?\n?[^\r\n]*$/, ""); // Removes the last line aka (Source: X)


        const embed = new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setTitle(Title)
          .setURL("https://anilist.co/anime/" + ID)
          .setThumbnail(cover)
          .setDescription("**Average Score:** " + averageScore + "%" + "** Status:** " + status + "** Source:** " + source + "** Genres: **" + genres)
          .addFields(
            { name: 'Description', value: ffDesc },
          )

        message.channel.send(embed)
      });
    });
  }
}