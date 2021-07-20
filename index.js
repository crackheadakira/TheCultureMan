const Discord = require('discord.js');
const client = new Discord.Client();
const redditFetch = require('reddit-fetch');

client.on('ready', () => {
	console.log("I'm ready to release");
});

client.on('message', message => {
	if(message.content == '>culture'){
	    redditFetch({
		
		     subreddit: 'pics',
		     sort: 'new',
		     allowNSFW: true,
		     allowModPost: false,
		     allowCrossPost: true,
			 allowVideo: true,
		
	}).then(post => {
	   message.channel.send(` ${post.url} `);
	});
	}
});

client.login(process.env.ODY3MDEwMTMxNzQ1MTc3NjIx.YPa4Gw.H4UPDzYfUCrkQl-doXZoIfZZJ-w);
