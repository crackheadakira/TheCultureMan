const settings = require('../../config.json');
const anilist = require('anilist-node');
const { MessageEmbed } = require('discord.js');
const Anilist = new anilist(settings.anitoken);

module.exports = {
    name: "anime",
    description: "This will search Anilist for the specified Anime and give you info about it.",
    run: async (client, message, args) => {

        if (!message.content.startsWith('n.anime')) {
            return;
        }

        let trimString = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

        let string = message.content.replace("n.anime ", "");

        Anilist.searchEntry.anime(string, null, 1, 1).then(Data => {
            try {

                let Series1 = Data.media;

                let S1FID = Series1.map(({ id }) => id);
                var S1ID = parseInt(S1FID);

                Anilist.media.anime(S1ID).then(S1Data => {

                    let hSource = S1Data.source;
                    let Title = S1Data.title.romaji;
                    let cover = S1Data.coverImage.large;
                    let hGenres = S1Data.genres.toString();
                    let averageScore = S1Data.averageScore;
                    let hStatus = S1Data.status.toLowerCase();
                    let description = S1Data.description;
                    let URL = S1Data.siteUrl;

                    let startDate = S1Data.startDate;
                    let endDate = S1Data.endDate;

                    let sYear = startDate.year;
                    let sMonth = startDate.month;
                    let sDay = startDate.day;

                    let eYear = endDate.year;
                    let eMonth = endDate.month;
                    let eDay = endDate.day;

                    var sDate = sYear + "-" + sMonth + "-" + sDay;
                    var eDate = eYear + "-" + eMonth + "-" + eDay;

                    if (sYear == null) {
                        sDate = "Hasn't Released Yet"
                    }

                    if (eYear == null) {
                        eDate = "Hasn't Ended Yet"
                    }

                    let ffDesc = description.replace(/<[^>]*>?/gm, ''); // Removes the HTML Tags from the String

                    hSource = hSource.toString();
                    hStatus = hStatus.toString();
                    let source = hSource.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase()); // Makes the first letter of each word capitalized, even if there is a space
                    let status = hStatus.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase()); // Makes the first letter of each word capitalized, even if there is a space

                    let genres = hGenres.replace(/,/g, ", ");

                    // This part here limits the amount of letter's it displays. It does not cut off words
                    let trimmedString = trimString(ffDesc, 1024);

                    const embed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle(Title)
                        .setURL(URL)
                        .setThumbnail(cover)
                        .addFields(
                            { name: 'Average Score', value: averageScore + "%", inline: true },
                            { name: 'Status', value: status.toString(), inline: true },
                            { name: 'Source', value: source, inline: true },
                            { name: 'Genres', value: genres, },
                            { name: 'Start Date', value: sDate, inline: true },
                            { name: 'End Date', value: eDate, inline: true },
                            { name: 'Description', value: trimmedString }
                        )
                        .setFooter("Requested by " + message.author.username, message.author.avatarURL())

                    message.channel.send({ embeds: [embed] })

                });
            } catch (error) {
                message.channel.send("Bot received an error. Maybe there was a grammatical mistake? ");
                console.log();
            }
        });

    }
}