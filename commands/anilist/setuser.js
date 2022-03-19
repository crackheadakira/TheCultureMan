const { MessageEmbed } = require('discord.js');
const Anilist = require('../../schemas/AnilistSchema');

module.exports = {
    name: "setuser",
    description: `This allows the user to set their Anilist profile and use ${process.env.prefix}user without typing in an username.`,
    type: 'anilist',
    run: async (client, message, args) => {

        let UserName = message.content.replace(`${process.env.prefix}setuser `, "").replace(/[^A-Za-z0-9]/g, '');
        
        try {

            const anilistID = await Anilist.findOne({ userId: message.author.id });

            if (anilistID) {
                const anilist = await Anilist.findOneAndUpdate({ userId: message.author.id }, { anilistName: UserName })
                return message.channel.send(`${UserName} has been set as your username.`);

            } else {

                const anilist = await Anilist.create({
                    anilistName: UserName,
                    userId: message.author.id,
                    userName: message.author.username,
                });
                message.channel.send(`${UserName} has been set as your username.`);
            }

        } catch (error) {
            message.channel.send("``" + error + "``");
            console.log(error);
        }

    }
};