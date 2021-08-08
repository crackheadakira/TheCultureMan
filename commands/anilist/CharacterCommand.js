const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");
const settings = require('./anitoken.json');
const anilist = require('anilist-node');
const Anilist = new anilist(settings.token);

module.exports = class ActivityCommand extends BaseCommand {
    constructor() {
        super('character', 'anilist', []);
    }

    run(client, message, args) {
        if (!message.content.startsWith('n.character')) {
            return;
        }

        function shorten(s, l) {
            return (s.match(new RegExp(".{" + l + "}\\S*")) || [s])[0];
        }

        let string = message.content.replace("n.character ", "");


        Anilist.searchEntry.character(string, 1, 1).then(cData => {
            try {

                let Ch = cData.characters;
                let ID = Ch.map(({ id }) => id);
                let cID = parseInt(ID)

                var character = Ch.map(function (item) {
                    return item['name'];
                });
                let name = character.map(({ english }) => english);

                Anilist.people.character(cID).then(data => {

                    let image = data.image.large;
                    let description = data.description;
                    let URL = data.siteUrl;

                    let fDesc = description.replace(/<[^>]*>?/gm, ''); // Removes the HTML Tags from the String
                    fText = fText.replace(new RegExp('!~', 'gi'), '||') // Makes spoiler tag's work in Discord
                    fText = fText.replace(new RegExp('~!', 'gi'), '||') // Makes spoiler tag's work in Discord
                    let fDescription = shorten(fDesc, 350);

                    const embed = new Discord.MessageEmbed()
                        .setTitle(name)
                        .setURL(URL)
                        .setThumbnail(image)
                        .setDescription(fDescription)

                    message.channel.send(embed)
                });
            } catch (error) {
                message.channel.send("Bot received an error. Maybe there was a grammatical mistake?")
            }
        });
    }
}