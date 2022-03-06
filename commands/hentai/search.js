const { MessageEmbed } = require('discord.js');
const API = require('kasu.nhentaiapi.js');
const api = new API();

module.exports = {
    name: 'search',
    description: 'This will search nHentai for the specified doujin using the ID and give you info about it.',
    run: async (client, message, args) => {

        if (!message.content.startsWith(`${process.env.prefix}search`)) {
            return;
        }

        if (!message.channel.nsfw) {
            message.reply("get your ass into an NSFW channel");
            return;
        }


        let number = message.content.replace(`${process.env.prefix}search `, "");

        if (isNaN(number)) {
            message.reply(`Usage: ${process.env.prefix}search <ID> where <ID> is the nHentai.net ID`);
            return;
        }


        api.getID(number).json(data => {
            try{

                let hURL = data.url;
                let hTitle = data.title.translated;
                let hCover = data.images.cover;
                let hTags = data.tag_table.tag;
                let hArtist = data.tag_table.artist;
                let hLanguage = data.tag_table.languages;
                let hPages = data.number_pages;

                let bannedTags = /lolicon|shotacon|beastiality|torture|minigirl|blood|guro|cannibalism|shota|loli/;
                
                if(bannedTags.test(hTags)){
                    message.channel.send("One of these tags or more that this doujin has goes against Discord ToS");
                    return;
                }

                const embed = new MessageEmbed()
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
                    .setFooter(`Requested by ${message.author.username}`)

                message.channel.send({ embeds: [embed] });
                

            } catch (error) {
                message.channel.send("One of these tags or more that this doujin has goes against Discord ToS");
                console.log("There was an error, here it is: " + error)
            }
        });
        
    }
}