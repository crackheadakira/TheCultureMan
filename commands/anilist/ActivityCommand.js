const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");
const settings = require('./anitoken.json');
const anilist = require('anilist-node');
const Anilist = new anilist(settings.token);

module.exports = class ActivityCommand extends BaseCommand {
  constructor() {
    super('activity', 'anilist', []);
  }

  run(client, message, args) {
    if (!message.content.startsWith('n.activity')) {
      return;
    }


    let string = message.content.replace("n.activity ", "");


    Anilist.user.profile(string).then(mData => {
      try {
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
          var progress = data.map(function (item) {
            return item['progress'];
          });

          var hStatus = data.map(function (item) {
            return item['status'];
          });

          let URL = "https://anilist.co/activity/" + ID;

          let type = data.map(function (item) {
            return item['type'];
          });

          let hType = type.toString();

          if (hType.toLowerCase().includes("anime_list") || hType.toLowerCase().includes("manga_list")) {

            var Media = data.map(function (item) {
              return item['media'];
            });

            var MediaTitle = Media.map(function (item) {
              return item['title'];
            });

            let romajiTitle = MediaTitle.map(({ romaji }) => romaji);

            hStatus = hStatus.toString();

            let status = hStatus.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());


            const activityList = new Discord.MessageEmbed()
              .setURL(URL)
              .setTitle("Here's " + userName + "'s most recent activity!")
              .setThumbnail(userAvatar)
              .setFooter(likeCount + " Likes")
              .addFields(
                { name: status + " " + progress + " of", value: romajiTitle }
              )

            message.channel.send(activityList);
          } else




          var fText = text.toString();
          fText = fText.replace(new RegExp('!~', 'gi'), '||') // Makes spoiler tag's work in Discord
          fText = fText.replace(new RegExp('~!', 'gi'), '||') // Makes spoiler tag's work in Discord
          fText = fText.replace(/~/gi, ''); // Removes the centering marks


          const embed = new Discord.MessageEmbed()
            .setURL(URL)
            .setTitle("Here's " + userName + "'s most recent activity!")
            .setDescription(fText)
            .setFooter(likeCount + " Likes")
            .setThumbnail(userAvatar)
            .setAuthor("Requested by " + message.author.username, message.author.avatarURL())

          if (hType.toLowerCase().includes("anime_list") || hType.toLowerCase().includes("manga_list")) {
            return message.channel.send(activityList);
          } else

            if (hType.toLowerCase().includes("message")) {
              return message.channel.send("This user's most recent activity is unsupported.");
            } else

              message.channel.send(embed)
        });
      } catch (error) {
        message.channel.send("Bot received an error. Maybe there was a grammatical mistake?")
      }
    });
  }
}