module.exports = {
    name: "poll",
    timeout: 2000,
    run: async(interaction, keyv, ms, Discord, client, moment, fs) => {
        const topic = interaction.options.find(op => op.name === "topic").value;

        await interaction.reply({
            content: "Started a poll!",
            ephemeral: true
        });
        interaction.channel.send({
            embeds: [
                {
                    title: `Poll by ${interaction.member.user.tag}`,
                    description: topic
                }
            ]
        }).then(async msg => {
            await msg.react("👍");
            await msg.react("👎");
        })
    }
}