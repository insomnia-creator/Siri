module.exports = {
    name: "mute",
    run: async(interaction, keyv, ms, Discord, client, moment, fs) => {

        if(!interaction.member.roles.cache.some(r => r.name === "Moderator")){
            await interaction.reply({
                content: "You need to be a moderator to do so.",
                ephemeral: true
            });
            return;
        }

        const guytomute = interaction.options.find(op => op.name === "user");
        //get the guy to among us mute!
        const memberObject = interaction.guild.members.cache.get(guytomute.value);
        //member object

        const reason = interaction.options.find(opt => opt.name === "reason");

        let time = interaction.options.find(opt => opt.name === "time");

        //tttttttttt

        let role = interaction.guild.roles.cache.find(r => r.name === "Muted");
        if(!role){
            role = await interaction.guild.roles.create({
                name: "Muted",
                color: "#b7a6a6"
            });

            await interaction.guild.channels.cache.forEach(ch => {
                ch.createOverwrite(role, {
                    SEND_MESSAGES: false,
                    CONNECT: false,
                    ADD_REACTIONS: false
                });
            });
        }


        if(time){

            //so if time
            await memberObject.user.send(`You were muted in ${interaction.guild.name} ${reason ? `for ${reason.value}` : "."} \n You will be un-muted in ${time.value} minutes.`);
            //so you are amongused, soz to tell u
            await memberObject.roles.add(role, `Mute, Mod - ${interaction.member.user.tag}`);
            //i add role u shut
            setTimeout(() => {
                memberObject.roles.remove(role, `Unmute, Mod - ${interaction.member.user.tag}`).catch(e => console.log(e));
                //haha i remove roll
            }, time.value * 60000);


           await interaction.reply({
                embeds: [
                    {
                        title: "User has been muted",
                        fields: [
                            {
                                name: "Moderator",
                                value: interaction.member.user.tag
                            },
                            {
                                name: "Reason",
                                value: reason ? reason.value : "Unspecified"
                            },
                            {
                                name: "Time, in minutes",
                                value: `${time.value}`
                            }
                        ]
                    }
                ]

            });

        } else {
            //but if no time
            await memberObject.user.send(`You were muted in ${interaction.guild.name} ${reason ? `for ${reason.value}` : "."} \n You will be un-muted in ${time} minutes.`);
            //so you are amongused, soz to tell u
            await memberObject.roles.add(role, `Mute, Mod - ${interaction.member.user.tag}`);
            //i add role u shut

            await interaction.reply({
                embeds: [
                    {
                        title: "User has been muted",
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
}