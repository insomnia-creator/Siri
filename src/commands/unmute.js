module.exports = {
    name: "unmute",
    run: async(interaction, keyv, ms, Discord, client, moment, fs) => {
        if(!interaction.member.roles.cache.some(r => r.name === "Moderator")){
            await interaction.reply("You need to be a moderator to do so.", {ephemeral: true});
            return;
        }


        const guytounmute = interaction.options.find(op => op.name === "user");
        //get the guy to among us unmute!
        const memberObject = interaction.guild.members.cache.get(guytounmute.value);
        //member object

        const reason = interaction.options.find(opt => opt.name === "reason");


        if(!memberObject.roles.cache.some(r => r.name === "Muted")){
            return await interaction.reply("That user isn't even muted!", {ephemeral: true});
        }

        const role = interaction.guild.roles.cache.find(r => r.name === "Muted");
        if(!role){
            return await interaction.reply("There isn't any Muted role.", {ephemeral: true});
        }
        memberObject.roles.remove(role, `Mod- ${interaction.member.user.tag}`).catch(e => console.log(e));

        await interaction.reply({
            embeds: [
                {
                    title: "User has been un-muted",
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
