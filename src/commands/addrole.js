module.exports = {
    name: "addrole",
    run: async(interaction, keyv, ms, Discord, client, moment, fs) => {

        if(!interaction.member.roles.cache.some(r => r.name === "Moderator")){
            await interaction.reply({
                content: "You need to be a moderator to do so.",
                ephemeral: true
            });
            return;
        }

        const memberObj = interaction.guild.members.cache.get(interaction.options.find(opt => opt.name === "member").value);
        const role = interaction.guild.roles.cache.get(interaction.options.find(op => op.name === "role").value);

        if(memberObj.id === interaction.member.id){
            await interaction.reply({
                content: "You cannot assign roles to yourself!",
                ephemeral: true
            });
            return;
        }
        if(memberObj.roles.cache.some(r => r.id === role.id)){
            await interaction.reply({
                content: "That user already has that role.",
                ephemeral: true
            });
            return;
        }
        memberObj.roles.add(role).catch(async e => {
            await interaction.reply({
                content: "There was an error.",
                ephemeral: true
            });
            console.log(e);
            return;
        });
        await interaction.reply({
            embeds: [
                {
                    title: "Role added",
                    fields: [
                        {
                            name: "Member",
                            value: `<@!${memberObj.id}>`
                        },
                        {
                            name: "Role",
                            value: role.name
                        }
                    ]
                }
            ]
        });
        return;

    }
}