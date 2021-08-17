const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const Culture69 = require('Culture69').Culture69;
const c69 = new Culture69();

module.exports = class CultureCommand extends BaseCommand {
  constructor() {
    super('culture', 'hentai', []);
  }

  run(client, message, args) {
    if (!message.content.startsWith('n.culture')) {
      return;
    }

    if (!message.channel.nsfw) {
      message.reply("get your ass into an NSFW channel");
      return;
    }


    let cam69 = c69.getCulture69();

    const embed = new Discord.MessageEmbed()
      .setTitle("Here's an image/gif from our Handcrafted database!")
      .setImage(cam69)
      .setAuthor("Requested by " + message.author.username, message.author.avatarURL())

    message.channel.send(embed)
  }
}