module.exports = {
    name: "mute",
    run: async(interaction, keyv, ms, Discord, client, moment, fs) => {

        if(!interaction.member.roles.cache.some(r => r.name === "Moderator")){
            await interaction.reply("You need to be a moderator to do so.", {ephemeral: true});
            return;
        }

        const guytokick = interaction.options.find(op => op.name === "user");
        //get the guy to among us mute!
        const memberObject = interaction.guild.members.cache.get(guytokick.value);
        //member object

        const reason = interaction.options.find(opt => opt.name === "reason");

        const time = interaction.options.find(opt => opt.name === "time");

        //tttttttttt

        const role = interaction.guild.roles.cache.find(r => r.name === "Muted");
        if(!role){
            await interaction.guild.roles.create({
                name: "Muted",
                color: "#b7a6a6"
            });

            interaction.guild.channels.cache.forEach(ch => {
                ch.overwritePermissions()
            })
        }


        if(time){
            //so if time
        } else {
            //but if no time
        }




    }
}