const Discord = require("discord.js");
const API = require('kasu.nhentaiapi.js');
const api = new API();
const client = new Discord.Client();

module.exports = {
    name: "read",
    description: "This allows you to read a doujin inside of Discord with the homies",
    async execute(message, args) {
        if (message.content.startsWith('n.read')) {
            if (message.channel.nsfw !== true) {
                message.reply("get your ass into an NSFW channel");
            } else {
                let number = message.content.replace("n.read ", "");

                var pn = 1; // The page number

                if (isNaN(number)) {
                    message.reply("Usage: n.read <ID> where <ID> is the nHentai.net ID");
                } else {
                    api.getID(number).list(data => {

                        let hTags = data.tags;
                        let hURL = data.url;
                        let hPageCount = data.pages;
                        let hPID = thenum = data.cover.match(/\d+/)[0]; // Extracts the digits from nHentai's image gallery for a doujin
                        let pages = ("https://i.nhentai.net/galleries/" + hPID + "/" + pn + ".jpg"); // Combies the extracted digits with the url and then the page it's on to make an Image URL that is acceptable
                        let hTitle = data.title;

                        if (hTags.toLowerCase().includes("loli") || hTags.toLowerCase().includes("beastiality") || hTags.toLowerCase().includes("torture") || hTags.toLowerCase().includes("minigirl") || hTags.toLowerCase().includes("lolicon") || hTags.toLowerCase().includes("blood") || hTags.toLowerCase().includes("shotacon") || hTags.toLowerCase().includes("shota") || hTags.toLowerCase().includes("guro") || hTags.toLowerCase().includes("cannibalism")) {
                            return message.channel.send("this doujin goes against Discord TOS");
                        }

                        const embed = new Discord.MessageEmbed()
                            .setURL(hURL)
                            .setTitle(hTitle)
                            .setImage(pages)
                            .setColor('RANDOM')
                            .setFooter("Page " + pn + " of " + hPageCount)



                        message.channel.send(embed).then(m => {

                            const validEmojis = ['⬅️', '➡️'];

                            const filter = (reaction, user) => {
                                return validEmojis.includes(reaction.emoji.name) && user.id === message.author.id;
                            };

                            m.react('⬅️')
                            m.react('➡️')

                            const collector = m.createReactionCollector(filter, { time: 300000, maxEmojis: 100 });

                            collector.on('collect', (reaction) => {
                                const name = reaction.emoji.name;

                                if (name === '⬅️') {

                                    m.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                                    m.react('⬅️')
                                    m.react('➡️')

                                    --pn;

                                    var pages = ("https://i.nhentai.net/galleries/" + hPID + "/" + pn + ".jpg");

                                    m.edit(embed.setImage(pages).setFooter("Page " + pn + " of " + hPageCount))

                                    return pn;
                                }

                                else if (name === '➡️') {

                                    m.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                                    m.react('⬅️')
                                    m.react('➡️')

                                    ++pn;

                                    var pages = ("https://i.nhentai.net/galleries/" + hPID + "/" + pn + ".jpg");

                                    m.edit(embed.setImage(pages).setFooter("Page " + pn + " of " + hPageCount))

                                    return pn;
                                }
                            });
                        });
                    });
                }
            }
        }
    }
}

