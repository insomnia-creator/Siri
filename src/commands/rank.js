module.exports = {
    name: "rank",
    run: async(interaction, keyv, ms, Discord, client, moment, fs) => {
        //oh boy am I ready to explain all this
        const guy = interaction.options.find(op => op.name === "user");
        //guy
        if(!guy){
            //if no guy :C
            const rankProgress = await keyv.get(`rankProgress_${interaction.member.id}_${interaction.guild.id}`);
            const rank = await keyv.get(`rank_${interaction.member.user.id}_${interaction.guild.id}`);
            const toNExtRank = await keyv.get(`toNextRank_${interaction.guild.id}_${interaction.member.id}`);
            //all that stuff cool and all fetch n stuff
            let leaderboardRank = 0;
            //i wish I wrote this bot in typescript but anyways
            let leaderboard = await keyv.get(`leaderboard_${interaction.guild.id}`);
            //leaderboard yes
            if(!rankProgress || !rank || !toNExtRank){
                //check if guy hasnt written a single message in his lifetime and uses this command (for some reason idk SHUT UP)
                return await interaction.reply({
                    content: "You sure you got a rank?",
                    ephemeral: true
                })
            }
            const Sorted = leaderboard.sort((a, b) => b.level - a.level && b.progress - a.progress);
            //so we sort on like level and then on progress pretty cool
            leaderboardRank = Sorted.findIndex(u => u.id === interaction.member.id) + 1;
            //find index in this stackoverflow error

            //yeah cool sort and stuff
            //reply
            await interaction.reply({
                embeds: [
                    {
                        title: "Your Rank",
                        fields: [
                            {
                                name: "Progress through this rank",
                                value: rankProgress.toString(),
                            },
                            {
                                name: "Target for next rank",
                                value: toNExtRank.toString(),
                            },
                            {
                                name: "Your leaderboard position",
                                value: leaderboardRank.toString(),
                            },
                            {
                                name: "Your Level",
                                value: rank.toString()
                            }
                        ],
                        color: "#ff9f34"
                    }
                ]
            });
        } else {
            guy.value = guy.value.match(/[0-9]/g).join().replaceAll(/,/g, "");
            //@regexgod lol
            /*
            OK time to explain stuff
            So basically what im doing is that what the guy.value is returning rn is
            <@!id>
            So what I do is run through a regex when splits it all into an array of all the numbers in the string of guy.value,
            so that becomes [6,9,4,2,0,1,2,3,4], you get my point, so what I do now is that I join all those to a string so that is no
            6,9,4,2,0,1,2,3,4 with the commands, I run another simple regex check to replace all the commands with "", nothing, so now we finally get a string,
            694201234
            get it?

            Oversimplified: The Regex Check
             */
            //note after 3 months: what the heck is this i do not understand?
            const rank = await keyv.get(`rankProgress_${guy.value}_${interaction.guild.id}`);
            const rankProgress = await keyv.get(`rank_${guy.value}_${interaction.guild.id}`);
            const toNExtRank = await keyv.get(`toNextRank_${interaction.guild.id}_${guy.value}`);
            if(!rankProgress || !rank || !toNExtRank){
                return await interaction.reply({
                    content: "You sure the guy got a rank?",
                    ephemeral: true
                });
            }
            let leaderboardRank;
            let leaderboard = await keyv.get(`leaderboard_${interaction.guild.id}`);
            const Sorted = leaderboard.sort((a, b) => b.level - a.level && b.progress - a.progress);

            leaderboardRank = Sorted.findIndex(u => u.id === guy.value) + 1;


            await interaction.reply({
                embeds: [
                    {
                        title: `${interaction.guild.members.cache.get(guy.value).user.tag}'s rank`,
                        fields: [
                            {
                                name: "Progress through this rank",
                                value: rank.toString(),
                            },
                            {
                                name: "Target for next rank",
                                value: toNExtRank.toString(),
                            },
                            {
                                name: "Leaderboard position",
                                value: leaderboardRank.toString()
                            },
                            {
                                name: "Level",
                                value: rankProgress.toString()
                            }
                        ],
                        color: "#ff9f34"
                    }
                ]
            });
        }






    }
}