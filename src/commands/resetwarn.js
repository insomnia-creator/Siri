module.exports = {
    name: "resetwarns",
    run: async(interaction, keyv, ms, Discord, client, moment, fs) => {
        if(!interaction.member.roles.cache.some(r => r.name === "Moderator")){
            await interaction.reply("You need to be a moderator to do so.", {ephemeral: true});
            return;
        }


        const guytounmute = interaction.options.find(op => op.name === "user");
        //get the guy to uhhh reset warns!!
        const memberObject = interaction.guild.members.cache.get(guytounmute.value);
        //member object

        const reason = interaction.options.find(opt => opt.name === "reason");

        //rezzzon

        await keyv.set(`${interaction.guild.id}.${memberObject.id}.warnings`, 0);
        /*
        ONLY 0.0000000000000000000000000000000000000000000000000000000000000000001% OF ALL LIVING THINGS
        CAN RUN THE RESET WARN COMMAND!
         */
        await interaction.reply({
            embeds: [
                {
                    title: "User's warns have been reset",
                    fields: [
                        {
                            name: "Moderator",
                            value: interaction.member.user.tag
                        },
                        {
                            name: "Reason",
                            value: reason ? reason.value : "Unspecified"
                        }
                    ]
                }
            ]
        });

    }
}