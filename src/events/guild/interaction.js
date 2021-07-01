const Discord = require("discord.js");
const Keyv = require("keyv");
const keyv = new Keyv();
const timeout = new Set();
const ms = require("ms");
const moment = require("moment");
const fs = require("fs");
//declarations

keyv.on('error', err => console.log(err));
//handle the errors given by keyv

module.exports = async(client, interaction) => {

    if (!interaction.isCommand()) return;

    if (!client.commands.has(interaction.commandName)) return;
    try {
        if (client.commands.get(interaction.commandName).timeout) {
            if (timeout.has(`${interaction.commandName}${interaction.member.id}`)) {
                await interaction.reply({
                    embeds: [
                        {
                            title: 'You\'ve hit a timeout!',
                            description: `You can use this command again in ${ms(client.commands.get(interaction.commandName).timeout, {long: true})}`
                        },

                    ],
                    ephemeral: true
                });
                return;
            } else {
                timeout.add(`${interaction.commandName}${interaction.member.id}`);
                setTimeout(() => {
                    timeout.delete(`${interaction.commandName}${interaction.member.id}`);
                }, client.commands.get(interaction.commandName).timeout);

                //i have no idea why im doing this when i can make it a variable lol
            }
        }
        client.commands.get(interaction.commandName).run(interaction, keyv, ms, Discord, client, moment, fs);
    } catch (e) {
        console.log(e);
    }

    }