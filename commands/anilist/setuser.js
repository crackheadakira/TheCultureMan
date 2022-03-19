const { MessageEmbed } = require('discord.js');
const Anilist = require('../../schemas/AnilistSchema');

module.exports = {
    name: "setuser",
    description: `This allows the user to set their Anilist profile and use ${process.env.prefix}user without typing in an username.`,
    type: 'anilist',
    run: async (client, message, args) => {

        let UserName = args.slice(1).join(" ").replace(/[^A-Za-z0-9]/g, '');

        const anilistID = await Anilist.findOne({ where: { userId: message.author.id } });

        if (anilistID) {
            try {
                await anilistID.update({ anilistName: UserName })
                return message.channel.send(`${UserName} has been set as your username.`);
            } catch (error) {
                message.channel.send("``" + error + "``");
                console.log(error);
            }

        }
        try {
            await Anilist.create({ userId: message.author.id, anilistName: UserName })
            return message.channel.send(`${UserName} has been set as your username.`);

        } catch (error) {
            message.channel.send("``" + error + "``");
            console.log(error);
        }
    }
};