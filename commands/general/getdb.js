const Note = require('../../schemas/NoteSchema');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'getdb',
    description: 'This is a command to test fetching from a databse in MongoDB',
    run: async(client, message, args) => {

            const argz = message.content.split(" ");
            if (argz.length === 1) {
                const notes = await Note.find({ userId: message.author.id }, null, {
                    limit: 3,
                });
                let description = "";
                for (const i in notes) {
                    description += `${parseInt(i) + 1}) ${notes[i].description} ID: ${notes[i]._id}\n`;
                };
                const embed = new MessageEmbed()
                    .setTitle("Here are 3 of your notes")
                    .setDescription(description)
                message.channel.send({ embeds: [embed] })
            } else {
                try {
                    const arg = argz[1];
                    const note = await Note.findById(arg);
                    if (note) {
                        message.channel.send(note.description);
                    }
                } catch (err) {
                    message.channel.send('No note exists by that ID');
                }
            }

    }
}