console.clear();
global.EmbedError = require('./handlers/EmbedError');
const { Console } = require('console');
const { Discord, Client, Collection, DMChannel } = require('discord.js');
const ALSchema = require('./schemas/AnilistSchema');
const GraphQLRequest = require('./handlers/GraphQLRequest');
require("dotenv-flow").config();
const client = new Client({
    intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_BANS",
        "GUILD_INTEGRATIONS",
        "GUILD_WEBHOOKS",
        "GUILD_INVITES",
        "GUILD_VOICE_STATES",
        "GUILD_PRESENCES",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_MESSAGE_TYPING",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS",
        "DIRECT_MESSAGE_TYPING"
    ],
    partials: [
        "MESSAGE", "CHANNEL"
    ]
});
const fs = require('fs');

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync('./commands/');

["command"].forEach((handler) => {
    require(`./handlers/${handler}`)(client)
});

client.on("ready", () => {
    console.log(client.user.tag + ' has logged in.');
    client.user.setActivity(`${client.users.cache.size} ppl & ${client.guilds.cache.size} guilds | n.help`, { type: 'WATCHING' });
});

client.on('messageCreate', async (message) => {
    if (message.channel.type == "DM" && message.content.length > 750) {
        const anilistID = await ALSchema.findOne({ where: { userId: message.author.id } });
        if (anilistID) {
            try {
                await anilistID.update({ authToken: message.content })
                return message.channel.send('Token has been added!');
            } catch (error) {
                message.channel.send("``" + error + "``");
                console.log(error);
            }
        }

        try {
            const ALid = await GraphQLRequest(`mutation{UpdateUser{id name}}`, "", message.content);
            await ALSchema.create({ userId: message.author.id, authToken: message.content, "anilistID": ALid.UpdateUser.id });
            return message.channel.send(`Token has been added! Welcome, ` + "``" + ALid.UpdateUser.name + "``");
        } catch (error) {
            message.channel.send("``" + error + "``");
            console.log(error);
        }
    }
    if (message.author.bot) return;
    if (!message.content.startsWith(process.env.prefix)) return;
    if (!message.guild) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(process.env.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return;
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) command.run(client, message, args);
});

client.login(process.env.token);