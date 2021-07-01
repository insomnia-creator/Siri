module.exports = {
    name: "kick",
    run: async(interaction, keyv, ms, Discord, client, moment, fs) => {

        if(!interaction.member.roles.cache.some(r => r.name === "Moderator")){
            await interaction.reply("You need to be a moderator to do so.", {ephemeral: true});
            return;
        }
        //haha u no admin idot123
        console.log(interaction);

        const guytokick = interaction.options.find(op => op.name === "user");
        //get the guy to kick
        const memberObject = interaction.guild.members.cache.get(guytokick.value);
        //member object

        let reason = interaction.options.find(opt => opt.name === "reason");

        await memberObject.user.send(`Hey there, ${memberObject.user.username}, you have kicked from ${interaction.guild.name} ${reason ? `for '${reason.value}'` : "."}`).catch(e => {
            console.log(e);
        });
        //we don't want to you know, d e l a y

        memberObject.kick(reason ? reason.value : null).catch(e => {
            interaction.reply({
                content: "There was an error. This might be because that user is higher up on the roles list or has better permissions.",
                ephemeral: true
            });
            console.log(e);
        });

        //keeeeeeek
        await interaction.reply({
            embeds: [
                {
                    title: "User has been kicked",
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
        //haha send message!
        return;

    }
 }