const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");
const API = require('kasu.nhentaiapi.js');
const api = new API();

module.exports = class RandomCommand extends BaseCommand {
  constructor() {
    super('random', 'hentai', []);
  }

  async run(client, message, args) {
    if (!message.content.startsWith('n.random')) {
      return;
    }

    if (!message.channel.nsfw) {
      message.reply("get your ass into an NSFW channel");
      return
    }

    let string = message.content.replace("n.random ", "");

    api.IsDiscord = true;

    api.pRandSpecificTags("english " + string, data => { // The "english" exists to make sure that the doujin can't be in japanese. You can remove this if you want it to recommend all possible languages
      try {


        let hURL = data.url;
        let hTitle = data.title.translated;
        let hCover = data.images.cover;
        let hTags = data.tag_table.tag;
        let hArtist = data.tag_table.artist;
        let hLanguage = data.tag_table.languages;
        let hPages = data.number_pages;
        let hID = data.id;


        const embed = new Discord.MessageEmbed()
          .setTitle(hTitle)
          .setURL(hURL)
          .setThumbnail(hCover)
          .setColor('RANDOM')
          .addFields(
            { name: 'ID', value: hID },
            { name: 'Tags', value: hTags },
            { name: 'Artists', value: hArtist },
            { name: 'Page Count', value: hPages },
            { name: 'Language', value: hLanguage },
          )
          .setAuthor("Requested by " + message.author.username, message.author.avatarURL())

        message.channel.send(embed);

      } catch (error) {
        message.channel.send("One of these tags or more that this doujin has goes against Discord ToS");
      }

    });
  }
}