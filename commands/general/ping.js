const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    type: 'general',
    description: 'Returns bot latency.',
    run: async (client, message, args) => {
        const msg = await message.channel.send(`checking...`);
        const embed = new MessageEmbed()
            .setTitle('Pong!')
            .setDescription(`Websocket ping is ${client.ws.ping}ms!\nLatency is ${Math.floor(msg.createdAt - message.createdAt)}ms!`)
        await message.channel.send({ embeds: [embed] });
        msg.delete();
    }
}