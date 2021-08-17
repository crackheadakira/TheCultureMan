const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");
const settings = require('./anitoken.json');
const anilist = require('anilist-node');
const Anilist = new anilist(settings.token);

module.exports = class StudioCommand extends BaseCommand {
    constructor() {
        super('studio', 'anilist', []);
    }

    run(client, message, args) {
        if (!message.content.startsWith('n.studio')) {
            return;
        }

        let trimString = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

        let string = message.content.replace("n.studio ", "");

        Anilist.studio(string).then(data => {
            try {

                let name = data.name;
                let studioType = data.isAnimationStudio;
                let studioMedia = data.media;
                let URL = data.siteURL;
                let favourites = data.favourites;

                // Sort's studioMedia to be in an easy readable form
                let media = studioMedia.map(({ title }) => title);
                var correctMedia = media.map(function (item) {
                    return item['romaji'];
                });

                correctMedia = correctMedia.toString();
                correctMedia = correctMedia.replace(/,/g, ", ");

                // Show's if the studio is an animation studio
                if(studioType == true){
                    studioType = "Animation Studio";
                }
                
                if(studioType == false){
                    studioType = "Non-Animation Studio";
                }

                const embed = new Discord.MessageEmbed()
                    .setTitle(name)
                    .setURL(URL)
                    .setFooter(favourites + " Favourites")
                    .setAuthor("Requested by " + message.author.username, message.author.avatarURL())
                    .addFields(
                        { name: "Studio Type", value: studioType, inline: false },
                        { name: "The Studio's Works", value: correctMedia, inline: false },
                    )

                message.channel.send(embed)
            } catch (error) {
                message.channel.send("Bot received an error. Maybe there was a grammatical mistake?")
            }
        });
    }
}