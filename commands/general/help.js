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

            let aCmds = fs.readdirSync(path.join(__dirname, '..', 'anilist'));
            let aCmdsDesc = [];
            let aCmdGroups = {};
            for (let aCmd of aCmds) {
                const aCmdEntry = require(path.join(__dirname, '..', 'anilist', aCmd));
                if (!aCmdGroups[aCmdEntry.type]) {
                    aCmdGroups[aCmdEntry.type] = [];
                }
                aCmdGroups[aCmdEntry.type].push({ name: aCmdEntry.name, description: aCmdEntry.description });
            }

            let gCmds = fs.readdirSync(path.join(__dirname, '..', 'general')).filter((x) => x.endsWith(".js") && x != "help.js" && x != "birthday.js");
            let gCmdsDesc = [];
            let gCmdGroups = {};
            for (let gCmd of gCmds) {
                const gCmdEntry = require(path.join(__dirname, '..', 'general', gCmd));
                if (!gCmdGroups[gCmdEntry.type]) {
                    gCmdGroups[gCmdEntry.type] = [];
                }
                gCmdGroups[gCmdEntry.type].push({ name: gCmdEntry.name, description: gCmdEntry.description });
            }

            let hCmds = fs.readdirSync(path.join(__dirname, '..', 'hentai'));
            let hCmdsDesc = [];
            let hCmdGroups = {};
            for (let hCmd of hCmds) {
                const hCmdEntry = require(path.join(__dirname, '..', 'hentai', hCmd));
                if (!hCmdGroups[hCmdEntry.type]) {
                    hCmdGroups[hCmdEntry.type] = [];
                }
                hCmdGroups[hCmdEntry.type].push({ name: hCmdEntry.name, description: hCmdEntry.description });
            }

            const embed1 = new MessageEmbed();
            embed1.setTitle('AniList Commands')
            embed1.setColor('DARK_BLUE')
            for (category of Object.keys(aCmdGroups)) {
                embed1.addField(`**Here are the commands**`, aCmdGroups[category].map((x) => `**${process.env.prefix}${x.name}** \n ${x.description} \n`).join("\n"));
            }


            const embed2 = new MessageEmbed()
            embed2.setTitle('General Commands')
            embed2.setColor('DARK_BLUE')
            for (category of Object.keys(gCmdGroups)) {
                embed2.addField(`**Here are the commands**`, gCmdGroups[category].map((x) => `**${process.env.prefix}${x.name}** \n ${x.description} \n`).join("\n"));
            }

            const embed3 = new MessageEmbed()
            embed3.setTitle('Hentai Commands')
            embed3.setColor('DARK_BLUE')
            for (category of Object.keys(hCmdGroups)) {
                embed3.addField(`**Here are the commands**`, hCmdGroups[category].map((x) => `**${process.env.prefix}${x.name}** \n ${x.description} \n`).join("\n"));
            }

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