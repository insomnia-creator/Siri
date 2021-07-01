module.exports = {
    name: "kick",
    run: async(interaction, keyv, ms, Discord, client, moment, fs) => {

        if(!interaction.member.roles.some(r => r.name === "Moderator")){
            return interaction.reply("You need to be a moderator to do so!", {ephemeral: true});
        }
        //haha u no admin idot123


        const guytokick = interaction.options[0].value;
        //get the guy to kick

        const memberObject = interaction.guild.members.cache.get(guytokick);
        //member object

        let reason = interaction.options[1];

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
        interaction.reply({
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