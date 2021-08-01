const Discord = require("discord.js");
const API = require('kasu.nhentaiapi.js');
const api = new API();
const client = new Discord.Client();

module.exports = {
    name: "search",
    description: "This will search nHentai for the specified Doujin and give you info about it",
    execute(message, args) {
        if (message.content.startsWith('n.search')) {
            if (message.channel.nsfw !== true) {
                message.reply("get your ass into an NSFW channel");
            } else {
                let number = message.content.replace("n.search ", "");

                if (isNaN(number)) {
                    message.reply("Usage: n.search <ID> where <ID> is the nHentai.net ID");
                } else {
                    api.getID(number).list(data => {


                        let hURL = data.url;
                        let hTitle = data.title;
                        let hCover = data.cover;
                        let hTags = data.tags;
                        let hArtist = data.artist;
                        let hLanguage = data.language;
                        let hPages = data.pages;

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
        }
    }
}
