const Discord = require("discord.js");
const settings = require('./anitoken.json');
const anilist = require('anilist-node');
const Anilist = new anilist(settings.token);

module.exports = {
    name: "user",
    description: "This will search the specified Anilist user and give you info about them",
    async execute(message, args) {
        if (!message.content.startsWith('n.user')) {
            return;
        }


        let string = message.content.replace("n.user ", "");


        Anilist.user.profile(string).then(data => {

            let userID = data.id;
            let userName = data.name;
            let userAvatar = data.avatar.large;
            let userURL = data.siteUrl;

            const embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setThumbnail(userAvatar)
                .setTitle(userName)
                .setURL(userURL)
                .addFields(
                    { name: 'User ID', value: "This is the user's ID: " + userID },
                )

            message.channel.send(embed)
        });
    }
}