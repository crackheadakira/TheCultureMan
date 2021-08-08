const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");
const settings = require('./anitoken.json');
const anilist = require('anilist-node');
const Anilist = new anilist(settings.token);

module.exports = class ActivityCommand extends BaseCommand {
    constructor() {
        super('staff', 'anilist', []);
    }

    run(client, message, args) {
        if (!message.content.startsWith('n.staff')) {
            return;
        }

        function shorten(s, l) {
            return (s.match(new RegExp(".{" + l + "}\\S*")) || [s])[0];
        }

        let string = message.content.replace("n.staff ", "");


        Anilist.searchEntry.staff(string, 1, 1).then(cData => {
            try {

                let Ch = cData.staff;
                let ID = Ch.map(({ id }) => id);
                let cID = parseInt(ID)

                var staff = Ch.map(function (item) {
                    return item['name'];
                });
                let sName = staff.map(({ english }) => english);

                Anilist.people.staff(cID).then(data => {

                    let image = data.image.large;
                    let description = data.description;
                    let URL = data.siteUrl;
                    let favourites = data.favourites;

                    favourites = parseInt(favourites);

                    let fDesc = description.replace(/<[^>]*>?/gm, ''); // Removes the HTML Tags from the String
                    fText = fText.replace(new RegExp('!~', 'gi'), '||') // Makes spoiler tag's work in Discord
                    fText = fText.replace(new RegExp('~!', 'gi'), '||') // Makes spoiler tag's work in Discord
                    let fDescription = shorten(fDesc, 350);

                    const embed = new Discord.MessageEmbed()
                        .setTitle(sName)
                        .setURL(URL)
                        .setThumbnail(image)
                        .setDescription(fDescription)
                        .setFooter(favourites + " Favourites")

                    message.channel.send(embed);
                });
            } catch (error) {
                message.channel.send("Bot received an error. Maybe there was a grammatical mistake?")
            }
        });
    }
}