
const Discord = require('discord.js');
//require the discord.js module
const client = new Discord.Client({
    intents: Discord.Intents.NON_PRIVILEGED,
    allowedMentions: {
        repliedUser: false
    },
    partials: ["MESSAGE", "CHANNEL", "GUILD_MEMBER", "REACTION"]
});
//initiate the client

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = require('fs').readdirSync('./src/commands');
//declare the various command and alias variables

require(`./handlers/event`)(client);
require(`./handlers/command`)(client);
//send the client variable on a trip to ./handlers

client.login(require('./config.json').token).catch(e => console.log(e));
//login