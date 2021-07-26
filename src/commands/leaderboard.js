module.exports = {
    name: "leaderboard",
    run: async(interaction, keyv, ms, Discord, client, moment, fs) => {
        const leaderboard = await keyv.get(`leaderboard_${interaction.guild.id}`);
        //steal from keyv
        if(!leaderboard){return ['what', false]};

        const Sorted = leaderboard.sort((a, b) => b.level - a.level && b.progress - a.progress);
        //sort n stuff you know from rank.js
        if(Sorted.length > 10) Sorted.slice(0, 10);
        //Slice it


        let string ='';
        //guys remember StringBuilder in java™ made by oracle®?


        Sorted.forEach(guy => {
            const man = client.users.cache.get(guy.id).tag;
            const pos = Sorted.findIndex(gy => gy.id === guy.id) + 1;
            //get position and man
            string += `${man} is topping the leaderboard at #${pos} on level ${guy.level} and has ${guy.progress} XP on that level! \n \n`
            //ahha
        });

        await interaction.reply({
            embeds: [
                {
                    title: `${interaction.guild.name}'s leaderboard`,
                    description: string,
                    color: "#c9ffff"
                }
            ]
        })
    }
}