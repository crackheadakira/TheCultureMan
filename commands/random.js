const Discord = require("discord.js");
const API = require('kasu.nhentaiapi.js');
const api = new API();

module.exports = {
    name: "random",
    description: "This will give you a random doujin from nHentai",
    execute(message, args) {

        if (!message.content.startsWith('n.random')) {
            return;
        }

        if (!message.channel.nsfw) {
            message.reply("get your ass into an NSFW channel");
            return
        }

        api.pRandSpecificTags("english", data => { // The "english" exists to make sure that the doujin can't be in japanese. You can remove this if you want it to recommend all possible languages

            let hID = data.id;
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
                    { name: 'ID', value: hID },
                    { name: 'Tags', value: hTags },
                    { name: 'Artists', value: hArtist },
                    { name: 'Page Count', value: hPages },
                    { name: 'Language', value: hLanguage },
                )

            message.channel.send(embed)
        });
    }
}