const anilist = require('anilist-node');
const { MessageEmbed } = require('discord.js');
const Anilist = new anilist(process.env.anitoken);

module.exports = {
    name: "staff",
    description: "This will search Anilist for the specified staff and give you info about them.",
    run: async (client, message, args) => {

        if (!message.content.startsWith(`${process.env.prefix}staff`)) {
            return;
        }

        let trimString = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
        let string = message.content.replace(`${process.env.prefix}.staff `, "");

        Anilist.searchEntry.staff(string, 1, 1).then(cData => {
            try {

                let Ch = cData.staff;
                let ID = Ch.map(({ id }) => id);
                let cID = parseInt(ID)

                var staff = Ch.map(function (item) {
                    return item['name'];
                });
                let sName = staff.map(({ english }) => english);
                sName = sName.toString();

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

                    const embed = new MessageEmbed()
                        .setTitle(sName)
                        .setURL(URL)
                        .setThumbnail(image)
                        .setDescription(fDescription)
                        .setFooter(favourites + " Favourites")
                        .setFooter("Requested by " + message.author.username + " | " + favourites + " Favourites")

                    message.channel.send({ embeds: [embed] });
                });
            } catch (error) {
                return message.channel.send("Bot received an error. Maybe there was a grammatical mistake?");
            }
        });

    }
}