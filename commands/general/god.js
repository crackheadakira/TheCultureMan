const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'god',
    description: 'This is a command to test fetching from a databse in MongoDB',
    run: async (client, message, args) => {

        const gayvin = new MessageEmbed()
            .setColor("F0E9D1")
            .setTitle("Gayvin")
            .setDescription("<@313699902758715404> is this land's visionary. He made the bros before hoes discord server what it is. He's even building HoloLive statues in Minecraft, that's how dedicated he is. He would never cheat on his husband <@422007636133675018>. They are the perfect couple, now let me go cry in the corner.")
            .setThumbnail("https://cdn.discordapp.com/avatars/313699902758715404/ec325aae719fa3088d3861f797f590e7.webp?size=4096")
            .setFooter("Requested by " + message.author.username + " | " + "789435616" + " Favourites")
        message.channel.send({ embeds: [gayvin] });

    }
}