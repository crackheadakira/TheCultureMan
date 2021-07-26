const Discord = require('discord.js');
const client = new Discord.Client();
const Kytra = require('kytra-api')
const kytra_gifs = new Kytra() 

client.on('ready', () => {
	console.log("I'm ready to release");
});

client.on('message', (message) => {
    if (message.content.startsWith('>culture')){
        kytra_gifs.nsfw.hentai().then(response => {
        const embed = new Discord.MessageEmbed()
        .setDescription("Here's some cultured shit")
        .setImage(response.image)
            message.channel.send(embed)
        }) 
    }
})

client.login('ODY3MDEwMTMxNzQ1MTc3NjIx.YPa4Gw.H4UPDzYfUCrkQl-doXZoIfZZJ-w');