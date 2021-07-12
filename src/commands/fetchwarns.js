module.exports = {
    name: "fetchwarns",
    run: async(interaction, keyv, ms, Discord, client, moment, fs) => {


        const guytounmute = interaction.options.find(op => op.name === "user");
        //i swear im not doing this on purpose.


        if(!guytounmute){
            const warnings = await keyv.get(`${interaction.guild.id}.${interaction.member.id}.warnings`);

            //get the warnings from keyv
            await interaction.reply({
                embeds: [
                    {
                        title: "Your warnings",
                        description: `You currently have ${warnings ? `${warnings === 1 ? `${warnings} warning.` : `${warnings} warnings.`}` : "no warnings."}`
                    }
                ]
            });
            //i have no idea what im doing
            return;
        } else {


            if(!interaction.member.roles.cache.some(r => r.name === "Moderator")){
                await interaction.reply({
                    content: "You need to be a moderator to do so.",
                    ephemeral: true
                });
                return;
            }
            //if you want to, create a PR to fix the variables lol

            const warnings = await keyv.get(`${interaction.guild.id}.${guytounmute.value}.warnings`);
            await interaction.reply({
                embeds: [
                    {
                        title: "Warnings",
                        description: `They currently have ${warnings ? `${warnings === 1 ? `${warnings} warning.` : `${warnings} warnings.`}` : "no warnings."}`
                    }
                ]
            });


        }





    }
}
