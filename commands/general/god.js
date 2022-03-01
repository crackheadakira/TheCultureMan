const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'god',
    description: 'This tells you info about a few of my friends and me.',
    run: async (client, message, args) => {
        try {

            const follower = Math.floor(Math.random() * 900000000) + 100000000
            const pick = Math.floor(Math.random() * 2)

            const gayvin = new MessageEmbed()
                .setColor("F0E9D1")
                .setTitle("Gayvin")
                .setDescription("<@313699902758715404> is this land's visionary. He made the bros before hoes discord server what it is. He's even building HoloLive statues in Minecraft, that's how dedicated he is. He would never cheat on his husband <@422007636133675018>. They are the perfect couple, now let me go cry in the corner.")
                .setThumbnail("https://cdn.discordapp.com/avatars/313699902758715404/ec325aae719fa3088d3861f797f590e7.webp?size=4096")
                .setFooter("Requested by " + message.author.username + " | " + follower + " Favourites")


            const demon = new MessageEmbed()
                .setColor("F0E9D1")
                .setTitle("emodemon")
                .setDescription("<@795261856964673536> is the mother of all and always will be.")
                .setThumbnail("https://cdn.discordapp.com/avatars/795261856964673536/c7213fa9d5c609335846a2736bd00b52.webp?size=4096")
                .setFooter("Requested by " + message.author.username + " | " + follower + " Favourites")

            if (pick == 1) {
                message.channel.send({ embeds: [gayvin] });
            } else if (pick == 2) {
                message.channel.send({ embeds: [demon] });
            }
        } catch (error) {
            message.channel.send("There was an error running this command, try again later.")
            console.log(error)
        }
    }
}