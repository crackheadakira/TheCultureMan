const { MessageEmbed } = require('discord.js');
const Exclusion = require('../../schemas/ExclusionSchema');

module.exports = {
    name: 'getexcl',
    description: 'This is a command to test fetching exclusions',
    run: async (client, message, args) => {

        const argz = message.content.split(" ");

        if (argz.length === 1) {
            const excl = await Exclusion.find({ userId: message.author.id });

            let description = "";
            for (const i in excl) {
                description += `${parseInt(i) + 1}) ${excl[i].animeId} / ${excl[i].animeTitle}\n`;
            };

            const embed = new MessageEmbed()
                .setTitle("Here are all your exclusions")
                .setDescription(description)
            message.channel.send({ embeds: [embed] })
        };


    }
}