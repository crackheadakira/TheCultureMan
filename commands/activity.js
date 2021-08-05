const Discord = require("discord.js");
const settings = require('./anitoken.json');
const anilist = require('anilist-node');
const Anilist = new anilist(settings.token);

module.exports = {
    name: "activity",
    description: "This will fetch the one recent activity of the specified person",
    async execute(message, args) {
        if (!message.content.startsWith('n.activity')) {
            return;
        }


        let string = message.content.replace("n.activity ", "");


        Anilist.user.profile(string).then(mData => {
            let userID = mData.id;
            let userName = mData.name;
            let userAvatar = mData.avatar.large;

            Anilist.activity.getUserActivity(userID, 1, 1).then(data => {

                var text = data.map(function (item) {
                    return item['text'];
                });

                var ID = data.map(function (item) {
                    return item['id'];
                });
                var likeCount = data.map(function (item) {
                    return item['likeCount'];
                });

                let URL = "https://anilist.co/activity/" + ID;

                var type = data.map(function (item) {
                    return item['type'];
                });

                var hType = type.toString()

                console.log(hType)

                if (hType.toLowerCase().includes("anime_list") || hType.toLowerCase().includes("message") || hType.toLowerCase().includes("manga_list")) {
                    return message.channel.send("The recent activity by the user is unsupported")
                }

                var fText = text.toString();
                fText = fText.replace(/~/gi, ''); // Removes the centering marks

                const embed = new Discord.MessageEmbed()
                    .setURL(URL)
                    .setTitle("Here's " + userName + "'s most recent activity!")
                    .setDescription(fText)
                    .setFooter(likeCount + " Likes")
                    .setThumbnail(userAvatar)

                message.channel.send(embed)
            });
        });
    }
}