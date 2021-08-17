const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");
const settings = require('./anitoken.json');
const anilist = require('anilist-node');
const Anilist = new anilist(settings.token);

module.exports = class StaffCommand extends BaseCommand {
    constructor() {
        super('staff', 'anilist', []);
    }

    run(client, message, args) {
        if (!message.content.startsWith('n.staff')) {
            return;
        }

        let trimString = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

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
                    fDesc = fDesc.replace(new RegExp('!~', 'gi'), '||') // Makes spoiler tag's work in Discord
                    fDesc = fDesc.replace(new RegExp('~!', 'gi'), '||') // Makes spoiler tag's work in Discord
                    let fDescription = trimString(fDesc, 1024);

                    const embed = new Discord.MessageEmbed()
                        .setTitle(sName)
                        .setURL(URL)
                        .setThumbnail(image)
                        .setDescription(fDescription)
                        .setFooter(favourites + " Favourites")
                        .setAuthor("Requested by " + message.author.username, message.author.avatarURL())

                    message.channel.send(embed);
                });
            } catch (error) {
                message.channel.send("Bot received an error. Maybe there was a grammatical mistake?")
            }
        });
    }
}