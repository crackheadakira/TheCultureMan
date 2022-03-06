const { MessageEmbed } = require('discord.js');
const API = require('kasu.nhentaiapi.js');
const api = new API();

module.exports = {
    name: 'read',
    description: 'This allows you to read a doujin from nHentai in Discord with the homies.',
    run: async (client, message, args) => {

        if (!message.content.startsWith(`${process.env.prefix}read`)) {
            return;
        }
        if (!message.channel.nsfw) {
            message.reply("get your ass into an NSFW channel");
            return;
        }

        let number = message.content.replace(`${process.env.prefix}read `, "");

        var pn = 1; // The page number

        if (isNaN(number)) {
            message.reply(`Usage: ${process.env.prefix}read <ID> where <ID> is the nHentai.net ID`);
            return;
        }

        api.getID(number).json(data => {
            try {

                let hTags = data.tag_table.tag;
                let hURL = data.url;
                let hPageCount = data.number_pages;
                let hPID = data.images.cover.match(/\d+/)[0]; // Extracts the digits from nHentai's image gallery for a doujin
                let pages = ("https://i.nhentai.net/galleries/" + hPID + "/" + pn + ".jpg"); // Combies the extracted digits with the url and then the page it's on to make an Image URL that is acceptable
                let hTitle = data.title.translated;

                let bannedTags = /lolicon|shotacon|beastiality|torture|minigirl|blood|guro|cannibalism|shota|loli/;
                if(bannedTags.test(hTags)){
                    message.channel.send("One of these tags or more that this doujin has goes against Discord ToS");
                    return;
                }

                const embed = new MessageEmbed()
                    .setURL(hURL)
                    .setTitle(hTitle)
                    .setImage(pages)
                    .setColor('RANDOM')
                    .setFooter("Page " + pn + " of " + hPageCount + " | " + "Requested by " + message.author.username)

                message.channel.send({ embeds: [embed] }).then(m => {

                    const validEmojis = ['⬅️', '➡️'];

                    const filter = (reaction, user) => {
                        return validEmojis.includes(reaction.emoji.name) && user.id === message.author.id;
                    };

                    m.react('⬅️')
                    m.react('➡️')

                    const collector = m.createReactionCollector({ filter, time: 300000, maxEmojis: 100 });

                    collector.on('collect', (reaction) => {
                        const name = reaction.emoji.name;

                        if (name === '⬅️') {

                            //m.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                            reaction.users.remove(message.author);

                            --pn;

                            var pages = ("https://i.nhentai.net/galleries/" + hPID + "/" + pn + ".jpg");

                            const embed = new MessageEmbed()
                                .setImage(pages)
                                .setFooter("Page " + pn + " of " + hPageCount + " | " + "Requested by " + message.author.username)

                            m.edit({ embeds: [embed] });

                            return pn;
                        }

                        else if (name === '➡️') {

                            //m.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                            reaction.users.remove(message.author);

                            ++pn;

                            var pages = ("https://i.nhentai.net/galleries/" + hPID + "/" + pn + ".jpg");

                            const embed = new MessageEmbed()
                                .setImage(pages)
                                .setFooter("Page " + pn + " of " + hPageCount + " | " + "Requested by " + message.author.username)

                            m.edit({ embeds: [embed] });

                            return pn;
                        }
                    });
                });
            } catch (error) {
                message.channel.send("One of these tags or more that this doujin has goes against Discord ToS");
            }
        });

    }
}