const { MessageEmbed } = require('discord.js');

module.exports = {
    name: `oauth`,
    description: `Allows you to authenticate yourself using your AniList token.`,
    type: 'anilist',
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setDescription(`To add you as an user you have to [login with AniList](https://anilist.co/api/v2/oauth/authorize?client_id=6221&response_type=token). \n Once you've done that, all you have to do is DM the token to the bot.`);

        message.channel.send({ embeds: [embed] });
    }
};