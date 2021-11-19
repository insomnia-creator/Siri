module.exports = async(client, member) => {
    const checkMemberJoinNumber = async() => {

        let currentMembers = await client.keyv.get(`${member.guild.id}.members_total`);
        if(!currentMembers){
            await client.keyv.set(`${member.guild.id}.members_total`, member.guild.members.cache.size);
            currentMembers = member.guild.members.cache.size;
        } else {
            await client.keyv.set(`${member.guild.id}.members_total`, currentMembers + 1);
            currentMembers = currentMembers + 1;
        }
        currentMembers = currentMembers + 1;
        //acquire a 'reading' of memberrr
        let string = '';
        if(currentMembers.toString().endsWith("1")){
            string = `${currentMembers}st`
        } else if(currentMembers.toString().endsWith("2")){
            string = `${currentMembers}nd`
        } else if(currentMembers.toString().endsWith("3")){
            string = `${currentMembers}rd`
        } else {
            string = `${currentMembers}th`
        }

        return string;
    }


    const channel = member.guild.channels.cache.find(ch => ch.name.includes("general"));
    //change it from system default channel or something balahaidsadhusadhi1jdsaodsaodj12o3 covidididdi

    //chanle
    channel.send(`Hey there, ${member.user.tag}, welcome to macosicons.com! You're the ${await checkMemberJoinNumber()} member to join`).catch(e => console.log(e));

}