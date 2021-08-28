const Note = require('../../schemas/NoteSchema');

module.exports = {
    name: 'database',
    description: 'This is a command to test MongoDB.',
    run: async(client, message, args) => {

        const index = message.content.indexOf(' ');
        const description = message.content.slice(index + 1)
        try {
            const notes = await Note.create({
                description,
                userId: message.author.id,
            })

            var myId = notes._id;

            message.channel.send("Note created, here is the ID: " + myId);

        } catch (err) {
            console.log("There was an error, here it is: " + err);
        }

    }
}