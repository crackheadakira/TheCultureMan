const { MessageEmbed, MessageButton } = require('discord.js');
const GraphQLRequest = require("../../handlers/GraphQLRequest");
const paginationEmbed = require('@acegoal07/discordjs-pagination');
const paginationOpts = require('../../handlers/paginationOptions');

module.exports = {
  name: `anime`,
  description: `This will search Anilist for the specified Anime and give you info about it.`,
  type: 'anilist',
  run: async (client, message, args) => {

    let string = args.slice(0).join(" ");
    let trimString = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
    if (string === '') {
      message.channel.send("You forgot to mention an anime.")
      return;
    }

    var vars = {
      search: string,
      page: 1,
      perPage: 5
    };

    await GraphQLRequest("anime", vars)
      .then((data) => {

        let embeds = [];

        // 5head @TibixDev gave this code
        for (let i = 0; i < data.Page.media.length; i++) {
          const embed = new MessageEmbed()
            .setDescription(
              trimString(data.Page?.media[i]?.description?.toString().replace(/<br><br>/g, "\n").replace(/<br>/g, "\n")
                .replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ")
                .replace(/\n\n/g, "\n") || "Unknown", 456))
            .setColor('RANDOM')
            .setTitle(data.Page.media[i].title.romaji.toString())
            .setURL(data.Page.media[i].siteUrl)
            .setThumbnail(data.Page.media[i].coverImage.large)
            .setImage(data.Page.media[i].bannerImage)
            .addFields(
              { name: 'Start Date', value: `${data.Page.media[i].startDate.year}-${data.Page.media[i].startDate.month}-${data.Page.media[i].startDate.day}`, inline: true },
              {
                name: data.Page?.media[i].nextAiringEpisode?.episode ? `Episode ${data.Page.media[i].nextAiringEpisode.episode} airing in:` : "Ended on:",
                value: data.Page?.media[i].nextAiringEpisode?.airingAt ? `<t:${data.Page.media[i].nextAiringEpisode.airingAt}:R>` : `${data.Page.media[i].endDate.day}-${data.Page.media[i].endDate.month}-${data.Page.media[i].endDate.year}`, inline: true
              },
              { name: 'Average Score', value: `${data.Page.media[i]?.averageScore}%` || "Unknown", inline: true },
              { name: 'Status', value: data.Page.media[i]?.status?.toString() || "Unknown", inline: true },
              { name: 'Source', value: data.Page.media[i]?.source?.toString() || "Unknown", inline: true },
              { name: 'Episodes', value: data.Page.media[i]?.episodes?.toString() || "Unknown", inline: true },
              { name: 'Media ID', value: data.Page.media[i]?.id?.toString() || "Unknown ID", inline: true },
              { name: 'Genres', value: data.Page.media[i]?.genres?.toString().replace(/,/g, ", ") || "Unknown Genres" },
            )
            .setFooter(`Requested by ${message.author.username}`);
          embeds.push(embed);
        }

        paginationEmbed(paginationOpts(message, embeds))

      })
      .catch((error) => {
        console.log(error);
        message.channel.send({ embeds: [EmbedError(error, vars)] });
      });
  }
}