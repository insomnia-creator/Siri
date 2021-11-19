const checkIfMessageIsCaps = (msg) => {
    const content = msg.content;

    if(content.length <= 24){
        return false;
    }

    const regex = /[A-Z]/g;
    //So here i've basically taken all capital letters from A-Z, and will check

    const capitalLetterArray = content.match(regex);
    if(!capitalLetterArray){
        return false;
    }



    //length
    const comparison = capitalLetterArray.length / content.length;
    //So in most sentences it should result in a normal comparision above 0.5.

    if (comparison >= 0.5) {
        return true;
    }
}

const checkRankUser = async(message, keyv) => {
    //oh god i will have a fun time explaining this! Read along!


    const rankDone = await keyv.get(`rankDone_${message.author.id}_${message.guild.id}`);
    //check if the rank is done, this acts as a timeout.
    if(rankDone === 'done'){ return false;}
    if(message.content.length > 4000) return false;
    //check if message is a long paragraph or not

    let rankGet = await keyv.get(`rankProgress_${message.author.id}_${message.guild.id}`);
    //first lets get the rank from redis™
    if(!rankGet){
        await keyv.set(`rankProgress_${message.author.id}_${message.guild.id}`, 0);
        rankGet = 0;
    }
    //so if the rank isn't there, let's just fix by setting the value of the rankProgress key.

    const rankNow = rankGet + (Math.round((message.content.length) / 2));
    //so we're going to do some simple maths.
    let rankNum = await keyv.get(`rank_${message.author.id}_${message.guild.id}`);
    //get the rank number
    if(!rankNum){
        await keyv.set(`rank_${message.author.id}_${message.guild.id}`, 1);
        rankNum = 1;
    }
    //if it does not exist(as usual), we assign a value to this.
    const toNextRank = rankNum * 300;
    //1 * 300, 2 * 300, 100 * 300 etc.

    await keyv.set(`rankProgress_${message.author.id}_${message.guild.id}`, rankNow);
    await keyv.set(`toNextRank_${message.guild.id}_${message.author.id}`, toNextRank);

    //set the progress.
    if(rankNow >= toNextRank){
        //check if user's message has gone beyond the target
        rankNum = rankNum + 1;
        const channel = message.guild.channels.cache.find(ch => ch.name.toLowerCase().includes('levels'));
        channel.send(`${message.author.tag} has reached level ${rankNum}.`);
        await keyv.set(`toNextRank_${message.guild.id}_${message.author.id}`, rankNum * 300);
        await keyv.set(`rank_${message.author.id}_${message.guild.id}`, rankNum);
        //reset the progress
        await keyv.set(`rankProgress_${message.author.id}_${message.guild.id}`, (toNextRank - rankNum));
    }
    //else just go on.

    //steal leaderboard
    let leaderboard = await keyv.get(`leaderboard_${message.guild.id}`);
    if(!leaderboard){
        leaderboard = [];
        //if leaderboard isnt there, we make it an empty array
    }

    try {
        if(await leaderboard.findIndex(obj => obj.id === message.author.id) === -1){
            //check if guy even exists on leaderboard
            await leaderboard.push({
                id: message.author.id,
                level: rankNum,
                progress: rankNow,
                toNextLevel: toNextRank
            });
            //if not, send some trash
        } else {
            const user = await leaderboard.findIndex(u => u.id === message.author.id);
            //if he does, we correct the values of the leaderboard
            leaderboard[user].level = rankNum;
            leaderboard[user].progress = rankNow;
            leaderboard[user].toNextLevel = toNextRank;
        }


    } catch (e){
        //error handling
        console.log(e);
    }
    await keyv.set(`leaderboard_${message.guild.id}`, leaderboard);
    //and set the leaderboard as so, god I love you redis
    await keyv.set(`rankDone_${message.author.id}_${message.guild.id}`, 'done');
    //timeout so no spam.

    //So we did a little bit of timeout
    setTimeout(async() => await keyv.delete(`rankDone_${message.author.id}_${message.guild.id}`), 10000);
    //haha timeout go brrrrrr
    return true;
}


module.exports = async(client, message) => {
    //here we add the thing.

 

    //so now we have access to the message object and the client object.

    if (message.author.bot) return;
    //will be further developed.

    //check message caps
    const res = await checkIfMessageIsCaps(message);
    if(res === true){
        message.delete();
        return;
    }
    //so if it is indeed a caps message, why spend your life giving the guy free xp and stuff.
    //call the function
    await checkRankUser(message, client.keyv);
    //pass in the objects


}