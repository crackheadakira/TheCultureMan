const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const imdb = require('imdb-api');
const { isError } = require('imdb-api/lib/interfaces');
const cli = new imdb.Client({ apiKey: '20a88975' });

module.exports = class ImdbCommand extends BaseCommand {
    constructor() {
        super('imdb', 'general', []);
    }

    run(client, message, args) {

        let trimString = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

        let string = message.content.replace("n.imdb ", "");


        cli.get({name: string }).then(data => {

                let title = data.title;
                let releaseYear = data.released;
                let description = data.plot;
                let cover = data.poster;
                let score = data.rating;
                let runtime = data.runtime;
                let genres = data.genres;
                let URL = data.imdburl;

                releaseYear = releaseYear.toISOString().slice(0, 10)

                let trimmedString = trimString(description, 1024);

                
                const embed = new Discord.MessageEmbed()
                    .setTitle(title)
                    .setURL(URL)
                    .setThumbnail(cover)
                    .addFields(
                        { name: "Score", value: score, inline: true },
                        { name: "Runtime", value: runtime, inline: true },
                        { name: "Genres", value: genres },
                        { name: "Release Date", value: releaseYear },
                        { name: "Description", value: trimmedString, inline: false },
                    )
                    .setAuthor("Requested by " + message.author.username, message.author.avatarURL())

                message.channel.send(embed)
        });
    }
}