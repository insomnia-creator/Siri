const Discord = require("discord.js");
const Util = require("discord.js");
const Keyv = require("keyv");
const keyv = new Keyv();
const timeout = new Set();
const ms = require("ms");
const moment = require("moment");
const fs = require("fs");
//declarations

keyv.on('error', err => console.log(err));
//handle the errors given by keyv

module.exports = async(client, message) => {

    client.prefix = await keyv.get(`${message.guild.id}.prefix`);
    if(!client.prefix) client.prefix = "-";
    //prefix stuff

    if(!message.content.startsWith(client.prefix) || message.author.bot || message.channel.type === 'dm') return;
    /*
    Does your message start with a prefix?
    Is your message's author a bot?
    Is your message in a DM channel?
    Then your message is not a message, it is a return statement.
     */

    const args = message.content.slice(client.prefix.length).trim().split(/ +/);
    const command1 = args.shift().toLowerCase();
    //arguments

    if (command1.length === 0) return;
    //check if command is non-existent
    let command = client.commands.get(command1);
    //steal the command from client.commands
    if (!command) command = client.commands.get(client.aliases.get(command1));
    //the command probably doesn't exist, let's check the aliases
    if (command) {
        //if all goes well, we end up here.
        if (command.timeout) {
            //check if it has a timeout.
            if (timeout.has(`${message.author.id}${command.name}`)) {
                //check if the timeout set has the message.author
                return message.channel.send(
                    `Hey <@${
                        message.author.id
                    }>, you can only use that command every ${ms(command.timeout, {long: true})}!`
                );
            } else {
                //if not, let's add them to the timeout
                timeout.add(`${message.author.id}${command.name}`);
                setTimeout(function () {
                    timeout.delete(`${message.author.id}${command.name}`);
                }, command.timeout);
            }
        }
        //finally, let's insert the variables into the command.
        command.run(
            message,
            args,
            client,
            Discord,
            Util,
            keyv,
            ms,
            fs,
            moment,
        );
    }


}