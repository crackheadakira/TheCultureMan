const { MessageEmbed } = require('discord.js');
const API = require('kasu.nhentaiapi.js');
const api = new API();

module.exports = {
    name: 'random',
    description: 'This will give you a random doujin from nHentai.',
    type: 'hentai',
    run: async (client, message, args) => {

        if (!message.channel.nsfw) {
            message.reply("get your ass into an NSFW channel");
            return
        }

        let string = args.slice(1).join(" ");


        api.IsDiscord = true;
        await api.pRandSpecificTags("english " + string, data => {


            let hURL = data.url;
            let hTitle = data.title.translated;
            let hCover = data.images.cover;
            let hTags = data.tag_table.tag;
            let hArtist = data.tag_table.artist;
            let hLanguage = data.tag_table.languages;
            let hPages = data.number_pages;
            let hID = data.id;

            const embed = new MessageEmbed()
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

            message.channel.send({ embeds: [embed] });

        }).catch((error) => {
            message.channel.send("``" + error + "``");
            console.log(error);
        });
    }
}