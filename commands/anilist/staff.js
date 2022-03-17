const anilist = require('anilist-node');
const { MessageEmbed } = require('discord.js');
const Anilist = new anilist(process.env.anitoken);

module.exports = {
    name: "staff",
    description: "This will search Anilist for the specified staff and give you info about them.",
    run: async (client, message, args) => {

        let trimString = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
        let string = message.content.replace(`${process.env.prefix}staff `, "");

        Anilist.people.staff(string).then(data => {
            try {

                const embed = new MessageEmbed()
                    .setTitle(data.name.english)
                    .setURL(data.siteUrl)
                    .setThumbnail(data.image.large)
                    .setDescription(data.description.replace(/<[^>]*>?/gm, '').replace(new RegExp('!~|~!', 'gi'), '||'), 456)
                    .setFooter(`Requested by ${message.author.username} | ${parseInt(data.favourites)} Favourites`)

                message.channel.send({ embeds: [embed] });
            } catch (error) {
                console.log(error)
                return message.channel.send("Bot received an error. Maybe there was a grammatical mistake?");
            }
        });

    }
}