module.exports = {
    name: "ban",
    run: async(interaction, keyv, ms, Discord, client, moment, fs) => {

        if(!interaction.member.roles.cache.some(r => r.name === "Moderator")){
            await interaction.reply({
                content: "You need to be a moderator to do so.",
                ephemeral: true
            });
            return;
        }
        //haha u no admin xddddddddddd
        const guytoban = interaction.options.find(op => op.name === "user");
        const guytobanIDedition = interaction.options.find(op => op.name === 'id');

        if(!guytoban || !guytobanIDedition){
            await interaction.reply({
                content: "stop fooling around and give the id or user smh",
                ephemeral: true,
            })
        }

        if(guytobanIDedition && !guytoban){
            let dude;
            //OMG CANT U SJUT OPTUT IT NEAR AWAIT OMG IM FREAKING OUT
            //HAHA I TRIGGER U HAHA HAHAHHAHAHHAHA
            await interaction.guild.bans.create(guytobanIDedition).then(guy => dude = guy).catch(async e => {
                console.log(e);
                await interaction.reply({
                    content: "The ID does not exist.",
                    ephemeral: true
                });
                //😳
                return;
            })
            await interaction.reply({
                embeds: [
                    {
                        title: `${dude} has been banned`,
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
        //get the guy to among us
        const memberObject = interaction.guild.members.cache.get(guytoban.value);
        //member object

        let reason = interaction.options.find(opt => opt.name === "reason");

        await memberObject.user.send(`Hey there, ${memberObject.user.username}, you have banned from ${interaction.guild.name} ${reason ? `for '${reason.value}'` : "."}`).catch(e => {
            console.log(e);
        });
        //we don't want to you know, d e l a y
        //omg i copy from kickkk???? omgm omgmgmgmgmgmgmgmgmgmgmggmgm among ussssss!!!!!!

        memberObject.ban().catch(async e => {
            await interaction.reply({
                content: "There was an error. This might be because that user is higher up on the roles list or has better permissions.",
                ephemeral: true
            });
            console.log(e);
        });

        //keeeeeeek
        await interaction.reply({
            embeds: [
                {
                    title: `${memberObject.user.tag} has been banned`,
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
