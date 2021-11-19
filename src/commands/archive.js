//archive
module.exports = {
    name: "archive",
    run: async(interaction, keyv, ms, Discord, client, moment, fs) => {
        if(!interaction.member.roles.cache.some(r => r.name === "Moderator")){
            await interaction.reply({
                content: "You need to be a moderator to do so.",
                ephemeral: true
            });
            return;
        }
        const channel = interaction.guild.channels.cache.get(interaction.options.find(opt => opt.name === 'channel').value);
        const reason = interaction.options.find(opt => opt.name === 'reason');

        const role = interaction.guild.roles.cache.find(r => r.name === 'Archive Access');



        try {
            channel.clone().then(newChannel => {

                newChannel.setPosition(channel.position);
            })
                .catch(e => console.log(e));
            channel.setName(`ARCHIVED- ${channel.name}`);

            await channel.updateOverwrite(channel.guild.roles.everyone, {
                VIEW_CHANNEL: false
            });

            await channel.updateOverwrite(role, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true
            });
            await channel.setParent('911261387093852181', {lockPermissions: false});

        } catch(e){
            console.log(e);
            await interaction.reply({
                content: "Unable to archive channel!",
                ephemeral: true
            });
            return;
        }
        await interaction.reply({
            embeds: [
                {
                    title: `Archived ${channel.name}`,
                    color: 'RANDOM',
                    description: `This channel was archived by ${interaction.member.user.tag} for ${reason ? reason.value : 'no reason at all.'}`
                }
            ],
        });

    }
}