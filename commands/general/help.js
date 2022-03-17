const { Discord, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'This shows you all the command this bot has to offer.',
    run: async (client, message, args) => {
        try {

            const row = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId(`1`)
                        .setPlaceholder(`Select one of the available categories`)
                        .addOptions([
                            {
                                label: `AniList Commands`,
                                description: `Show's you the AniList commands`,
                                value: 'first',
                            },
                            {
                                label: `General Commands`,
                                description: `Show's you the General commands`,
                                value: 'second',
                            },
                            {
                                label: `Hentai Commands`,
                                description: `Show's you the Hentai commands`,
                                value: 'third',
                            }
                        ])
                )


            const embed = new MessageEmbed()
                .setTitle(`Here are all the bot commands`)
                .setDescription(`Select one of the command categories using the dropdown menu.`)

            let sendmsg = await message.channel.send({ content: ` `, embeds: [embed], components: [row] })

            const embed1 = new MessageEmbed()
                .setTitle('AniList Commands')
                .addFields(
                    { name: `${process.env.prefix}activity`, value: `This will fetch the one recent activity of the specified person from Anilist.` },
                    { name: `${process.env.prefix}anime`, value: `This will search Anilist for the specified Anime and give you info about it.` },
                    { name: `${process.env.prefix}character`, value: `This will search Anilist for the specified character and give you info about them.` },
                    { name: `${process.env.prefix}manga`, value: `This will search Anilist for the specified Manga and give you info about it.` },
                    { name: `${process.env.prefix}resetuser`, value: `This allows the user to reset their specified anilist user.` },
                    { name: `${process.env.prefix}setuser`, value: `This allows the user to set their Anilist profile and use ${process.env.prefix}user without typing in an username` },
                    { name: `${process.env.prefix}staff`, value: `This will search Anilist for the specified staff and give you info about them.` },
                    { name: `${process.env.prefix}studio`, value: `This will search Anilist for the specified studio and give you info about them.` },
                    { name: `${process.env.prefix}user`, value: `This will search Anilist for the specified user and give you info about them.` },
                );

            const embed2 = new MessageEmbed()
                .setTitle('General Commands')
                .addFields(
                    { name: `${process.env.prefix}ping`, value: `Returns bot latency.` },
                );

            const embed3 = new MessageEmbed()
                .setTitle(`Hentai Commands`)
                .addFields(
                    { name: `${process.env.prefix}culture`, value: `This will give you an image from our handcrafted database.` },
                    { name: `${process.env.prefix}random`, value: `This will give you a random doujin from nHentai.` },
                    { name: `${process.env.prefix}read`, value: `This allows you to read a doujin from nHentai in Discord with the homies.` },
                    { name: `${process.env.prefix}search`, value: `This will search nHentai for the specified doujin using the ID and give you info about it.` },
                );

            const collector = message.channel.createMessageComponentCollector({
                componentType: `SELECT_MENU`
            })

            collector.on(`collect`, async (collected) => {
                const value = collected.values[0]

                if (value === `first`) {
                    collected.update({ embeds: [embed1] })
                }
                if (value === `second`) {
                    collected.update({ embeds: [embed2] })
                }
                if (value === `third`) {
                    collected.update({ embeds: [embed3] })
                }
            })
        } catch (error) {
            message.channel.send("``" + error + "``");
            console.log(error);
        }
    }
}