
const Discord = require('discord.js');
//require the discord.js module
const client = new Discord.Client({
    intents: Discord.Intents.ALL,
    allowedMentions: {
        repliedUser: false
    },
    partials: ["MESSAGE", "CHANNEL", "GUILD_MEMBER", "REACTION"]
});
//initiate the client

//database goes here
const Redis = require('ioredis');
const KeyvRedis = require('@keyv/redis');
const Keyv = require('keyv');
const redis = new Redis();
const keyvRedis = new KeyvRedis(redis);
client.keyv = new Keyv({
    store: keyvRedis
});

//database tests

const test = async() => {
    const fetchTest = await client.keyv.get("test");
    if(!fetchTest){
        await client.keyv.set("test", "Database first run!");
    } else {
        await client.keyv.set("test", "OK");
    }

    const fetchTest2 = await client.keyv.get("test");
    console.log(`Database response and status: \n ${fetchTest2}`);

}

test();


//errrrrrrr
client.keyv.on('error', err => {
    console.log("An error occured in the database.")
    throw err;

});

client.commands = new Discord.Collection();
//declare the various command and alias variables

require(`./handlers/event`)(client);
require(`./handlers/command`)(client);
//send the client variable on a trip to ./handlers

client.login(require('./config.json').token).catch(e => console.log(e));
//login

