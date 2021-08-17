const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");
const API = require('kasu.nhentaiapi.js');
const api = new API();

module.exports = class SearchCommand extends BaseCommand {
    constructor() {
        super('search', 'hentai', []);
    }

    run(client, message, args) {
        if (!message.content.startsWith('n.search')) {
            return;
        }

        if (!message.channel.nsfw) {
            message.reply("get your ass into an NSFW channel");
            return;
        }

        let number = message.content.replace("n.search ", "");

        if (isNaN(number)) {
            message.reply("Usage: n.search <ID> where <ID> is the nHentai.net ID");
            return;
        }

        api.getID(number).json(data => {
            try {

                let hURL = data.url;
                let hTitle = data.title.translated;
                let hCover = data.images.cover;
                let hTags = data.tag_table.tag;
                let hArtist = data.tag_table.artist;
                let hLanguage = data.tag_table.languages;
                let hPages = data.number_pages;

                const embed = new Discord.MessageEmbed()
                    .setTitle(hTitle)
                    .setURL(hURL)
                    .setThumbnail(hCover)
                    .setColor('RANDOM')
                    .addFields(
                        { name: 'Tags', value: hTags },
                        { name: 'Artists', value: hArtist },
                        { name: 'Page Count', value: hPages },
                        { name: 'Language', value: hLanguage },
                    )
                    .setAuthor("Requested by " + message.author.username, message.author.avatarURL())

                message.channel.send(embed)
            } catch (error) {
                message.channel.send("One of these tags or more that this doujin has goes against Discord ToS");
            }
        });
    }
}