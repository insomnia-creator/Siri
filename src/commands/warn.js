module.exports = {
    name: "warn",
    run: async(interaction, keyv, ms, Discord, client, moment, fs) => {

        if(!interaction.member.roles.cache.some(r => r.name === "Moderator")){
            await interaction.reply("You need to be a moderator to do so.", {ephemeral: true});
            return;
        }


        const guytounmute = interaction.options.find(op => op.name === "user");
        //get the guy to uhhh warn!
        const memberObject = interaction.guild.members.cache.get(guytounmute.value);
        //member object

        const reason = interaction.options.find(opt => opt.name === "reason");

        //rezzzon

        const warningslol = await keyv.get(`${interaction.guild.id}.${memberObject.id}.warnings`);
/////////////////////wwwwwwwaaarnningngngns

        if(!warningslol){
            await keyv.set(`${interaction.guild.id}.${memberObject.id}.warnings`, 1);
        } else {
            await keyv.set(`${interaction.guild.id}.${memberObject.id}.warnings`, warningslol + 1);

        }

        /*
        ONLY 0.0000000000000000000000000000000000000000000000000000000000000000001% OF ALL LIVING THINGS
        CAN RUN THE WARN COMMAND!
         */

        await interaction.reply({
            embeds: [
                {
                    title: "User has been warned!",
                    description: warningslol ? `They now have ${warningslol + 1} warnings.` : "1 warning.",
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