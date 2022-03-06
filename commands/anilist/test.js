const { MessageEmbed, MessageButton } = require('discord.js');
const GraphQLRequest = require("../../handlers/GraphQLRequest");
const paginationEmbed = require('discordjs-button-pagination');

module.exports = {
  name: `test`,
  description: `testing graphql`,
  run: async (client, message, args) => {
    try {

      let string = message.content.replace(`${process.env.prefix}test `, "");
      let trimString = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

      const button1 = new MessageButton()
        .setCustomId('previousbtn')
        .setLabel('Previous')
        .setStyle('DANGER');

      const button2 = new MessageButton()
        .setCustomId('nextbtn')
        .setLabel('Next')
        .setStyle('SUCCESS');

      var query = `
        query ($search: String, $page: Int, $perPage: Int) {
            Page(page: $page, perPage: $perPage) {
              media(search: $search, type: ANIME, sort: POPULARITY_DESC) {
                source
                title {
                  english
                  romaji
                  native
                }
                coverImage {
                  large
                }
                bannerImage
                genres
                averageScore
                favourites
                status
                description(asHtml: false)
                siteUrl
                nextAiringEpisode {
                  airingAt
                  episode
                }
                startDate {
                  year
                  month
                  day
                }
                endDate {
                  year
                  month
                  day
                }
              }
            }
          }
`;

      var vars = {
        search: string,
        page: 1,
        perPage: 3
      };

      GraphQLRequest(query, vars)
        .then((yeezies) => {
          let data = yeezies.Page;

          let S1description = data.media[0].description.toString()
            ?.replace(/<br><br>/g, "\n")
            .replace(/<br>/g, "\n")
            .replace(/<[^>]+>/g, "")
            .replace(/&nbsp;/g, " ")
            .replace(/\n\n/g, "\n") || "No description avsailable.";

          let S1source = data.media[0].source.toString().replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase())
          let S1status = data.media[0].status.toString().replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
          let S1genres = data.media[0].genres.toString().replace(/,/g, ", ");
          let S1trimmedString = trimString(S1description, 4096);

          const embed1 = new MessageEmbed()
            .setDescription(S1trimmedString)
            .setColor('RANDOM')
            .setTitle(data.media[0].title.romaji.toString())
            .setURL(data.media[0].siteUrl)
            .setThumbnail(data.media[0].coverImage.large)
            .setImage(data.media[0].bannerImage)
            .addFields(
              { name: 'Start Date', value: `${data.media[0].startDate.year}-${data.media[0].startDate.month}-${data.media[0].startDate.day}`, inline: true },
              {
                name: data?.media[0].nextAiringEpisode?.episode ? `Episode ${data.media[0].nextAiringEpisode.episode} airing in:` : "Ended on:",
                value: data?.media[0].nextAiringEpisode?.airingAt ? `<t:${data.media[0].nextAiringEpisode.airingAt}:R>` : `${data.media[0].endDate.day}-${data.media[0].endDate.month}-${data.media[0].endDate.year}`, inline: true
              },
              { name: 'Average Score', value: `${data.media[0].averageScore}%`, inline: true },
              { name: 'Status', value: S1status.toString(), inline: true },
              { name: 'Source', value: S1source, inline: true },
              { name: 'Favorites', value: data.media[0].favourites.toString(), inline: true },
              { name: 'Genres', value: S1genres, },
            )
            .setFooter(`Requested by ${message.author.username}`)

          if (!data.media[1]) {
            message.channel.send({ embeds: [embed1] })
            return;
          }

          let S2description = data.media[1].description.toString()
            ?.replace(/<br><br>/g, "\n")
            .replace(/<br>/g, "\n")
            .replace(/<[^>]+>/g, "")
            .replace(/&nbsp;/g, " ")
            .replace(/\n\n/g, "\n") || "No description available.";

          let S2source = data.media[1].source.toString().replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase())
          let S2status = data.media[1].status.toString().replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
          let S2genres = data.media[1].genres.toString().replace(/,/g, ", ");
          let S2trimmedString = trimString(S2description, 4096);

          const embed2 = new MessageEmbed()
            .setDescription(S2trimmedString)
            .setColor('RANDOM')
            .setTitle(data.media[1].title.romaji.toString())
            .setURL(data.media[1].siteUrl)
            .setThumbnail(data.media[1].coverImage.large)
            .setImage(data.media[1].bannerImage)
            .addFields(
              { name: 'Start Date', value: `${data.media[1].startDate.year}-${data.media[1].startDate.month}-${data.media[1].startDate.day}`, inline: true },
              {
                name: data?.media[1].nextAiringEpisode?.episode ? `Episode ${data.media[1].nextAiringEpisode.episode} airing in:` : "Ended on:",
                value: data?.media[1].nextAiringEpisode?.airingAt ? `<t:${data.media[1].nextAiringEpisode.airingAt}:R>` : `${data.media[1].endDate.day}-${data.media[1].endDate.month}-${data.media[1].endDate.year}`, inline: true
              },
              { name: 'Average Score', value: `${data.media[1].averageScore}%`, inline: true },
              { name: 'Status', value: S2status.toString(), inline: true },
              { name: 'Source', value: S2source, inline: true },
              { name: 'Favorites', value: data.media[1].favourites.toString(), inline: true },
              { name: 'Genres', value: S2genres, },
            )
            .setFooter(`Requested by ${message.author.username}`)

          let S3description = data.media[2].description.toString()
            ?.replace(/<br><br>/g, "\n")
            .replace(/<br>/g, "\n")
            .replace(/<[^>]+>/g, "")
            .replace(/&nbsp;/g, " ")
            .replace(/\n\n/g, "\n") || "No description available.";

          let S3source = data.media[2].source.toString().replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase())
          let S3status = data.media[2].status.toString().replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
          let S3genres = data.media[2].genres.toString().replace(/,/g, ", ");
          let S3trimmedString = trimString(S3description, 4096);

          if (!data.media[2]) {

            const pages = [embed1, embed2]
            const btnList = [button1, button2]
            paginationEmbed(message, pages, btnList)

            return;
          }
          const embed3 = new MessageEmbed()
            .setDescription(S3trimmedString)
            .setColor('RANDOM')
            .setTitle(data.media[2].title.romaji.toString())
            .setURL(data.media[2].siteUrl)
            .setThumbnail(data.media[2].coverImage.large)
            .setImage(data.media[2].bannerImage)
            .addFields(
              { name: 'Start Date', value: `${data.media[2].startDate.year}-${data.media[2].startDate.month}-${data.media[2].startDate.day}`, inline: true },
              {
                name: data?.media[2].nextAiringEpisode?.episode ? `Episode ${data.media[2].nextAiringEpisode.episode} airing in:` : "Ended on:",
                value: data?.media[2].nextAiringEpisode?.airingAt ? `<t:${data.media[2].nextAiringEpisode.airingAt}:R>` : `${data.media[2].endDate.day}-${data.media[2].endDate.month}-${data.media[2].endDate.year}`, inline: true
              },
              { name: 'Average Score', value: `${data.media[2].averageScore}%`, inline: true },
              { name: 'Status', value: S3status.toString(), inline: true },
              { name: 'Source', value: S3source, inline: true },
              { name: 'Favorites', value: data.media[2].favourites.toString(), inline: true },
              { name: 'Genres', value: S3genres, },
            )
            .setFooter(`Requested by ${message.author.username}`)

          const pages = [embed1, embed2, embed3]
          const btnList = [button1, button2]
          paginationEmbed(message, pages, btnList)

        });
    } catch (error) {
      message.channel.send("There was an error or either you haven't set your Anilist user, set it using n.setuser.")
      console.log("Here's the error: " + error)
    }
  }
}