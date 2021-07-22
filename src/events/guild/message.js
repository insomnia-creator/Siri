const checkIfMessageIsCaps = (msg) => {
    const content = msg.content;

    const regex = /[A-Z]/g;
    //So here i've basically taken all capital letters from A-Z, and will check

    const capitalLetterArray = content.match(regex);
    if(!capitalLetterArray){
        return false;
    }

    //length
    const comparison = capitalLetterArray.length / msg.content.length;
    //So in most sentences it should result in a normal comparision above 0.5.

    if (comparison >= 0.5) {
        msg.delete();
        return true;
    }
}
module.exports = async(client, message) => {
    //here we add the thing.



    //so now we have access to the message object and the client object.

    if (message.author.bot) return;
    //will be further developed.

    checkIfMessageIsCaps(message);
    //call the function

}