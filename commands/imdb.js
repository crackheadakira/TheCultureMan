const Command = require('../Structures/command.js');
const { MessageEmbed } = require('discord.js');
const imdb = require('imdb-api');
const { isError } = require('imdb-api/lib/interfaces');
const cli = new imdb.Client({ apiKey: '20a88975' });

module.exports = new Command({
    name: "imdb",
    description: "This will search IMDb for the specified item and gives you info about it.",

    async run(message, args, client) {

        let trimString = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

        let string = message.content.replace("n.imdb ", "");


        cli.get({ name: string }).then(data => {
            try {

            let title = data.title;
            let releaseYear = data.released;
            let description = data.plot;
            let cover = data.poster;
            let score = data.rating;
            let runtime = data.runtime;
            let genres = data.genres;
            let URL = data.imdburl;


            releaseYear = releaseYear.toISOString().slice(0, 10);
            runtime = runtime.toString();
            score = score.toString();

            let trimmedString = trimString(description, 1024);
 

            const embed = new MessageEmbed()
                .setTitle(title)
                .setURL(URL)
                .setThumbnail(cover)
                .addFields(
                    { name: "Score", value: score, inline: true },
                    { name: "Runtime", value: runtime, inline: true },
                    { name: "Release Date", value: releaseYear, inline: true },
                    { name: "Genres", value: genres, inline: false },
                    { name: "Description", value: trimmedString, inline: false },
                )
                .setFooter("Requested by " + message.author.username)

            message.channel.send({ embeds: [embed] });

                } catch(error) {
                    message.channel.send("Bot received an error. Maybe there was a grammatical mistake?")
                    console.log("Here's the error: " + error)
                }
        });
    }
});