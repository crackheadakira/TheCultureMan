const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const paginationEmbed = require('discord.js-pagination');

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('help', 'general', []);
  }

  run(client, message, args) {
    const cmdEmbed1 = new Discord.MessageEmbed()
      .setColor('eb9840')
      .setTitle('HENTAI COMMANDS')
      .addFields(
        { name: 'n.', value: "n. is the bot's prefix" },
        { name: 'n.search', value: 'This will search nHentai for the specified Doujin and give you info about it' },
        { name: 'n.culture', value: 'This gets you a random image from the database' },
        { name: 'n.read', value: "This allows you to read a doujin inside of Discord with the homies" },
        { name: 'n.random', value: 'This will give you a random doujin from nHentai' },
      )

      const cmdEmbed2 = new Discord.MessageEmbed()
      .setColor('eb9840')
      .setTitle('ANILIST COMMANDS')
      .addFields(
        { name: 'n.anime', value: 'This will search Anilist for the specified Anime and give you info about it.' },
        { name: 'n.manga', value: 'This will search Anilist for the specified Manga and give you info about it.' },
        { name: 'n.activity', value: 'This will fetch the one recent activity of the specified person.' },
        { name: 'n.user', value: 'This will search the specified Anilist user and give you info about them.' },
      )

    const pages = [
      cmdEmbed1,
      cmdEmbed2
    ]
    const emojiList = [
      "⬅️",
      "➡️"
    ];

    paginationEmbed(message, pages, emojiList);
  }
}
