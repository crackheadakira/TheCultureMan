const { Discord, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'This shows you all the command this bot has to offer.',
    run: async (client, message, args) => {
        try {

            const row = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId("1")
                        .setPlaceholder("Select one of the available categories")
                        .addOptions([
                            {
                                label: "AniList Commands",
                                description: "Show's you the AniList commands",
                                value: 'first',
                            },
                            {
                                label: "General Commands",
                                description: "Show's you the General commands",
                                value: 'second',
                            },
                            {
                                label: "Hentai Commands",
                                description: "Show's you the Hentai commands",
                                value: 'third',
                            }
                        ])
                )


            const embed = new MessageEmbed()
                .setTitle("Here are all the bot commands")
                .setDescription("Select one of the command categories using the dropdown menu.")

            let sendmsg = await message.channel.send({ content: " ", embeds: [embed], components: [row] })

            const embed1 = new MessageEmbed()
                .setTitle('AniList Commands')
                .addFields(
                    { name: "n.activity", value: "This will fetch the one recent activity of the specified person from Anilist." },
                    { name: "n.anime", value: "This will search Anilist for the specified Anime and give you info about it." },
                    { name: "n.character", value: "This will search Anilist for the specified character and give you info about them." },
                    { name: "n.manga", value: "This will search Anilist for the specified Manga and give you info about it." },
                    { name: "n.resetuser", value: "This allows the user to reset their specified anilist user." },
                    { name: "n.setuser", value: "This allows the user to set their Anilist profile and use n.user without typing in an username" },
                    { name: "n.staff", value: "This will search Anilist for the specified staff and give you info about them." },
                    { name: "n.studio", value: "This will search Anilist for the specified studio and give you info about them." },
                    { name: "n.user", value: "This will search Anilist for the specified user and give you info about them." },
                );

            const embed2 = new MessageEmbed()
                .setTitle('General Commands')
                .addFields(
                    { name: "n.god", value: "This tells you info about a few of my friends and me." },
                    { name: "n.imdb", value: "This will search IMDb for the specified item and give you info about it." },
                    { name: "n.novel", value: "This will allow you to read the finest novel in the entire world." },
                    { name: "n.ping", value: "Returns bot latency." },
                );

            const embed3 = new MessageEmbed()
                .setTitle("Hentai Commands")
                .addFields(
                    { name: "n.culture", value: "This will give you an image from our handcrafted database." },
                    { name: "n.random", value: "This will give you a random doujin from nHentai." },
                    { name: "n.read", value: "This allows you to read a doujin from nHentai in Discord with the homies." },
                    { name: "n.search", value: "This will search nHentai for the specified doujin using the ID and give you info about it." },
                );

            const collector = message.channel.createMessageComponentCollector({
                componentType: "SELECT_MENU"
            })

            collector.on("collect", async (collected) => {
                const value = collected.values[0]

                if (value === "first") {
                    collected.update({ embeds: [embed1] })
                }
                if (value === "second") {
                    collected.update({ embeds: [embed2] })
                }
                if (value === "third") {
                    collected.update({ embeds: [embed3] })
                }
            })
        } catch (error) {
            message.channel.send("There was an error running this command, try again later.")
            console.log(error)
        }
    }
}