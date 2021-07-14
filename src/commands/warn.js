module.exports = {
    name: "warn",
    run: async(interaction, keyv, ms, Discord, client, moment, fs) => {


        if(!interaction.member.roles.cache.some(r => r.name === "Moderator")){
            await interaction.reply({
                content: "You need to be a moderator to do so.",
                ephemeral: true
            });
            return;
        }


        const guytounmute = interaction.options.find(op => op.name === "user");
        //get the guy to uhhh warn!
        const member = interaction.guild.members.cache.get(guytounmute.value);
        //member object

        const reason = interaction.options.find(opt => opt.name === "reason");

        //rezzzon

        const warningslol = await keyv.get(`${interaction.guild.id}.${member.id}.warnings`);
/////////////////////wwwwwwwaaarnningngngns

        if(!warningslol){
            await keyv.set(`${interaction.guild.id}.${member.id}.warnings`, 1);
        } else {
            await keyv.set(`${interaction.guild.id}.${member.id}.warnings`, warningslol + 1);

        }

        /*
        ONLY 0.0000000000000000000000000000000000000000000000000000000000000000001% OF ALL LIVING THINGS
        CAN RUN THE WARN COMMAND!
         */
        const roles = [
            await interaction.guild.roles.cache.find(r => r.name === "green-card"),
            await interaction.guild.roles.cache.find(r => r.name === "yellow-card"),
            await interaction.guild.roles.cache.find(r => r.name === "red-card")
        ];
        //get all the red-card yellow card roles n stuff.

        /*
        Warning structure.
        1 warning - chill
        2 warnings - yellow
        3 warnings - red
        4 warnings - day mute
        5 warnings - week ban
        5+warnings  - perm ban
         */
        const warningsNow = warningslol ? 1 : warningslol + 1;
        //fetch the current warnings, always remains a constant
        if(warningsNow === 2){
            roles.forEach(role => {
                //do a forEach for the roles.
                if(member.roles.cache.some(r => r.id === role.id)){
                    member.roles.remove(role).catch(e => console.log(e))
                }
            });
            //now with all the green-red card related roles removed.
            //we can add a yellow card.

            await member.roles.add(roles[1]).catch(e => console.log(e));
        } else if(warningsNow === 3){
            roles.forEach(role => {
                //do a forEach for the roles.
                if(member.roles.cache.some(r => r.id === role.id)){
                    member.roles.remove(role).catch(e => console.log(e))
                }
            });
            //now with all the green-red card related roles removed.
            //we can add a yellow card.
            await member.roles.add(roles[2]).catch(e => console.log(e));
        } else if(warningsNow === 4){
            const muted = await interaction.roles.cache.find(r => r.name === "Muted");
            member.roles.add(muted).catch(e => console.log(e));

            setTimeout(() => {
                member.roles.remove(muted).catch(e => console.log(e));
                //remove after a day xdd
            }, (1000 * 60 * 60 * 60 * 24));
            //now. now now now now now. we have to do something about about this.
        } else if(warningsNow === 5){
            member.ban("warning lol").catch(e => console.log(e));
            setTimeout(() => {
                member.unban(member.user);
            }, (1000 * 60 * 60 * 60 * 24 * 7));
            //might be effective but anyways, SEE YA DUDE!
        } else if(warningsNow > 5){
            member.ban().catch(e => console.log(e));
        }
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