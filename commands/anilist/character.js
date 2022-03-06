const anilist = require('anilist-node');
const { MessageEmbed } = require('discord.js');
const Anilist = new anilist(process.env.anitoken);

module.exports = {
    name: "character",
    description: "This will search Anilist for the specified character and give you info about them.",
    run: async (client, message, args) => {

        if (!message.content.startsWith(`${proces.env.prefix}character`)) {
            return;
        }

        let trimString = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

        let string = message.content.replace(`${process.env.prefix}character `, "");

        Anilist.searchEntry.character(string, 1, 1).then(cData => {
            try {

                let Ch = cData.characters;
                let ID = Ch.map(({ id }) => id);
                let cID = parseInt(ID)

                var character = Ch.map(function (item) {
                    return item['name'];
                });
                let name = character.map(({ english }) => english);
                name = name.toString();

                Anilist.people.character(cID).then(data => {

                    let image = data.image.large;
                    let description = data.description;
                    let URL = data.siteUrl;
                    let favourites = data.favourites;
                    favourites = parseInt(favourites);

                    description = description.toString();
                    let fDesc = description.replace(/<[^>]*>?/gm, ''); // Removes the HTML Tags from the String
                    fDesc = fDesc.replace(new RegExp('!~|~!', 'gi'), '||') // Makes spoiler tag's work in Discord
                    let fDescription = trimString(fDesc, 4096);

                    const embed = new MessageEmbed()
                        .setTitle(name)
                        .setURL(URL)
                        .setThumbnail(image)
                        .setDescription(fDescription)
                        .setFooter("Requested by " + message.author.username + " | " + favourites + " Favourites")

                    message.channel.send({ embeds: [embed] })
                });
            } catch (error) {
                message.channel.send("Bot received an error. Maybe there was a grammatical mistake?")
                console.log(error)
            }
        });

    }
}