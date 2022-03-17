const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const fs = require('fs');
const path = require('path')

module.exports = {
    name: 'test',
    description: 'This shows you all the command this bot has to offer.',
    type: 'general',
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

            let cmds = fs.readdirSync(__dirname).filter((x) => x.endsWith(".js") && x != "help.js" && x != "birthday.js");
            let cmdsDesc = [];
            let cmdGroups = {};
            for (let cmd of cmds) {
                const cmdEntry = require(path.join(__dirname, cmd));
                if (!cmdGroups[cmdEntry.type]) {
                    cmdGroups[cmdEntry.type] = [];
                }
                cmdGroups[cmdEntry.type].push({ name: cmdEntry.name, description: cmdEntry.description });
            }
            console.log(cmdGroups)

            const embed1 = new MessageEmbed();
            embed1.setTitle('AniList Commands')
            embed1.setColor('DARK_BLUE')
            for (category of Object.keys(cmdGroups)) {
                embed1.addField(`**Here are the commands**`, cmdGroups[category].map((x) => `**${process.env.prefix}${x.name}** \n ${x.description} \n`).join("\n"));
            }


            const embed2 = new MessageEmbed()
                .setTitle('General Commands')
                .addFields(
                    { name: `${process.env.prefix}ping`, value: `Returns bot latency.` },
                );

            const embed3 = new MessageEmbed()
                .setTitle(`Hentai Commands`)
                .addFields(
                    { name: `${process.env.prefix}culture`, value: `This will give you an image from our handcrafted database.` },
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