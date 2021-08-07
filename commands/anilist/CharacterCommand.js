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
                let fDescription = shorten(fDesc, 350);

                const embed = new Discord.MessageEmbed()
                    .setTitle(name)
                    .setURL(URL)
                    .setThumbnail(image)
                    .setDescription(fDescription)

                message.channel.send(embed)
            });
        });
    }
}