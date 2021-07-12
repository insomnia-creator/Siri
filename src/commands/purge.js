module.exports = {
    name: "purge",
    run: async(interaction, keyv, ms, Discord, client, moment, fs) => {
        if(!interaction.member.roles.cache.some(r => r.name === "Moderator")){
            await interaction.reply({
                content: "You need to be a moderator to do so.",
                ephemeral: true
            });
            return;
        }

        //get message
        const messagesToDelete = interaction.options.find(op => op.name === "messages");
        if(messagesToDelete.value > 100){
            return interaction.reply({
                content: "Maximum amount of messages you can purge is 100",
                ephemeral: true
            });
        }

        interaction.channel.bulkDelete(messagesToDelete.value).catch(e => console.log(e));
        interaction.reply({
            embeds: [
                {
                    title: "Purged!",
                    description: `Purged ${messagesToDelete.value} message(s)`
                }
            ],
            ephemeral: true
        });
    }
}