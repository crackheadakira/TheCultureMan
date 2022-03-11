const { MessageEmbed, MessageButton } = require('discord.js');
const GraphQLRequest = require("../../handlers/GraphQLRequest");
const GraphQLQueries = require("../../handlers/GraphQLQueries");
const paginationEmbed = require('discordjs-button-pagination');

module.exports = {
  name: `anime`,
  description: `This will search Anilist for the specified Anime and give you info about it.`,
  run: async (client, message, args) => {
    try {

      let string = message.content.replace(`${process.env.prefix}anime `, ``);
      let trimString = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

      if (string == `${process.env.prefix}anime`) {
        message.channel.send("You forgot to mention an anime.")
        return;
      }

      const button1 = new MessageButton()
        .setCustomId('previousbtn')
        .setLabel('Previous')
        .setStyle('DANGER');
      const button2 = new MessageButton()
        .setCustomId('nextbtn')
        .setLabel('Next')
        .setStyle('SUCCESS');
      const btnList = [button1, button2]

      var vars = {
        search: string,
        page: 1,
        perPage: 3
      };

      GraphQLRequest(GraphQLQueries.anime, vars)
        .then((yeezies) => {
          let data = yeezies.Page;

          let embeds = [];

          // 5head @TibixDev gave this code
          for (let i = 0; i < data.media.length; i++) {
              const embed = new MessageEmbed()
                  .setDescription(trimString(data.media[i].description.toString()?.replace(/<br><br>/g, "\n").replace(/<br>/g, "\n").replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/\n\n/g, "\n") || "No description available.", 456))
                  .setColor('RANDOM')
                  .setTitle(data.media[i].title.romaji.toString())
                  .setURL(data.media[i].siteUrl)
                  .setThumbnail(data.media[i].coverImage.large)
                  .setImage(data.media[i].bannerImage)
                  .addFields(
                      { name: 'Start Date', value: `${data.media[i].startDate.year}-${data.media[i].startDate.month}-${data.media[i].startDate.day}`, inline: true },
                      {
                        name: data?.media[i].nextAiringEpisode?.episode ? `Episode ${data.media[i].nextAiringEpisode.episode} airing in:` : "Ended on:",
                        value: data?.media[i].nextAiringEpisode?.airingAt ? `<t:${data.media[i].nextAiringEpisode.airingAt}:R>` : `${data.media[i].endDate.day}-${data.media[i].endDate.month}-${data.media[i].endDate.year}`, inline: true
                      },
                      { name: 'Average Score', value: `${data.media[i].averageScore}%`, inline: true },
                      { name: 'Status', value: data.media[i].status.toString().replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase()), inline: true },
                      { name: 'Source', value: data.media[i].source.toString().replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase()), inline: true },
                      { name: 'Favorites', value: data.media[i].favourites.toString(), inline: true },
                      { name: 'Genres', value: data.media[i].genres.toString().replace(/,/g, ", "), },
                  )
                  .setFooter(`Requested by ${message.author.username}`);
              embeds.push(embed);
          }
          
          paginationEmbed(message, embeds, btnList)

        });
    } catch (error) {
      message.channel.send("There was an error or either you haven't set your Anilist user, set it using n.setuser.")
      console.log("Here's the error: " + error)
    }
  }
}