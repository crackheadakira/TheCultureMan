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

            let hURL = data.url;
            let hTitle = data.title.translated;
            let hCover = data.images.cover;
            let hTags = data.tag_table.tag;
            let hArtist = data.tag_table.artist;
            let hLanguage = data.tag_table.languages;
            let hPages = data.number_pages;

            const wEmbed = new Discord.MessageEmbed()
                .setTitle("This doujin goes against the Discord TOS")
                .setDescription("Because it has the tags " + hTags)


            if (hTags.toLowerCase().includes("loli") || hTags.toLowerCase().includes("beastiality") || hTags.toLowerCase().includes("torture") || hTags.toLowerCase().includes("minigirl") || hTags.toLowerCase().includes("lolicon") || hTags.toLowerCase().includes("blood") || hTags.toLowerCase().includes("shotacon") || hTags.toLowerCase().includes("shota") || hTags.toLowerCase().includes("guro") || hTags.toLowerCase().includes("cannibalism")) {
                return message.channel.send(wEmbed);
            }

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

            message.channel.send(embed)
        });
    }
}
