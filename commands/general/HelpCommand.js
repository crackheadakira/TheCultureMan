const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('help', 'general', []);
  }

  run(client, message, args) {
    const commandsEmbed = new Discord.MessageEmbed()
      .setColor('eb9840')
      .setTitle('Here are the fucking commands, beware im an NSFW bot')
      .addFields(
        { name: 'n.', value: "n. is the bot's prefix" },
        { name: 'n.search', value: 'This will search nHentai for the specified Doujin and give you info about it' },
        { name: 'n.culture', value: 'This gets you a random image from the database' },
        { name: 'n.read', value: "This allows you to read a doujin inside of Discord with the homies" },
        { name: 'n.random', value: 'This will give you a random doujin from nHentai' },
        { name: 'n.anime', value: 'This will search Anilist for the specified Anime and give you info about it' },
        { name: 'n.manga', value: 'This will search Anilist for the specified Manga and give you info about it' },
        { name: 'n.activity', value: 'This will fetch the one recent activity of the specified person' },
        { name: 'n.user', value: 'This will search the specified Anilist user and give you info about them"' },
      )
    message.channel.send(commandsEmbed)
  }
}
