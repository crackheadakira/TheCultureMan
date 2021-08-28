const settings = require('../../config.json');
const anilist = require('anilist-node');
const { MessageEmbed } = require('discord.js');
const Anilist = new anilist(settings.anitoken);

module.exports = {
    name: "manga",
    description: "This will search Anilist for the specified Manga and give you info about it.",
    run: async (client, message, args) => {

        if (!message.content.startsWith('n.manga')) {
            return;
        }

        let trimString = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

        let string = message.content.replace("n.manga ", "");


        Anilist.searchEntry.manga(string, null, 1, 1).then(Data => {
            try {

                let Series1 = Data.media.splice(0, 1);

                let S1FID = Series1.map(({ id }) => id);
                var S1ID = parseInt(S1FID);


                Anilist.media.manga(S1ID).then(mData => {

                    let hSource = mData.format.toLowerCase();
                    let Title = mData.title.romaji;
                    let cover = mData.coverImage.large;
                    let hGenres = mData.genres.toString();
                    let averageScore = mData.averageScore;
                    let hStatus = mData.status.toLowerCase();
                    let description = mData.description;
                    let URL = mData.siteUrl;

                    let startDate = mData.startDate;
                    let endDate = mData.endDate;

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

                    if (description == null) {
                        description = "No description exists as of now."
                    }

                    let ffDesc = description.replace(/<[^>]*>?/gm, ''); // Removes the HTML Tags from the String

                    let format = hSource.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
                    let status = hStatus.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());

                    let genres = hGenres.replace(/,/g, ", ");

                    // This part here limits the amount of letter's it displays. It does not cut off words
                    let trimmedString = trimString(ffDesc, 1024);

                    const embed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle(Title)
                        .setURL(URL)
                        .setThumbnail(cover)
                        .setDescription('**Genres: **' + genres)
                        .addFields(
                            { name: 'Average Score', value: averageScore + "%", inline: true },
                            { name: 'Status', value: status, inline: true },
                            { name: 'Format', value: format, inline: true },
                            { name: 'Genres', value: genres, },
                            { name: 'Start Date', value: sDate, inline: true },
                            { name: 'End Date', value: eDate, inline: true },
                            { name: 'Description', value: trimmedString }
                        )
                        .setFooter("Requested by " + message.author.username, message.author.avatarURL())

                    message.channel.send({ embeds: [embed] })

                });
            } catch (error) {
                message.channel.send("Bot received an error. Maybe there was a grammatical mistake?")
            }
        });

    }
}