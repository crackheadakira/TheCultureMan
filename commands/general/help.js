const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'help',
    description: 'This shows you all the command this bot has to offer.',
    type: 'general',
    run: async (client, message, args) => {
        try {

            const categories = [
                {
                    label: `AniList Commands`,
                    description: `Show's you the AniList commands`,
                    id: 'anilist',
                    commandFolder: "anilist",
                    color: '#0099ff',
                    filterFn: (x) => x.endsWith(".js")
                },
                {
                    label: `General Commands`,
                    description: `Show's you the general commands`,
                    id: 'general',
                    commandFolder: "general",
                    color: '#ea9e07',
                    filterFn: (x) => x.endsWith(".js") && x != "help.js" && x != "birthday.js"
                },
                {
                    label: `Hentai Commands`,
                    description: `Show's you the Hentai commands`,
                    id: 'hentai',
                    commandFolder: "hentai",
                    color: '#fb2347',
                    filterFn: (x) => x.endsWith(".js")
                }
            ]

            function parseCategory(category) {
                const commandFiles = fs.readdirSync(path.join(__dirname, `../${category.commandFolder}`)).filter(category.filterFn);
                const commands = [];
                for (const file of commandFiles) {
                    const command = require(`../${category.commandFolder}/${file}`);
                    if (command.name && command.description && command.type) {
                        commands.push({ name: command.name, description: command.description });
                    }
                }
                return commands;
            }

            const row = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId(`1`)
                        .setPlaceholder(`Select one of the available categories`)
                        .addOptions(categories.map(category => {
                            return {
                                label: category.label,
                                description: category.description,
                                value: category.id
                            }
                        }))
                )


            const embed = new MessageEmbed()
                .setTitle(`Here are all the bot commands`)
                .setDescription(`Select one of the command categories using the dropdown menu.`)

            await message.channel.send({ content: ` `, embeds: [embed], components: [row] })

            let categoryContents = {};
            for (const category of categories) {
                categoryContents[category.id] = parseCategory(category)
            }

            let categoryEmbeds = {};
            for (const category of categories) {
                const commands = categoryContents[category.id];
                if (commands.length > 0) {
                    const embed = new MessageEmbed()
                        .setTitle(`${category.label}`)
                        .setColor(category.color)
                        .setFooter(`${commands.length} commands in this category`)
                        .setTimestamp();
                    for (const command of commands) {
                        embed.addField(`${process.env.prefix}${command.name}`, `${command.description}`);
                    }
                    categoryEmbeds[category.id] = embed;
                }
            }

            let collector = message.channel.createMessageComponentCollector({
                componentType: `SELECT_MENU`,
                idle: 10_000,
            });

            collector.on(`collect`, async (collected) => {
                let value = collected.values[0];
                await collected.update({ embeds: [categoryEmbeds[value]] });
            })

            process.on('unhandledRejection', error => {
                // console.error(error);
            });

        } catch (error) {
            message.channel.send("``" + error + "``");
            console.log(error)
        }
    }
}