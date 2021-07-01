const Options  = {
    SUB_COMMAND: 1,
    SUB_COMMAND_GROUP: 2,
    STRING: 3,
        INTEGER: 4,
        BOOLEAN: 5,
        USER: 6,
        CHANNEL: 7,
        ROLE: 8,
        MENTIONABLE: 9,
}
//define it as an object

Object.freeze(Options);
//everyone loves enumerators!

module.exports = (client) => {
    console.log('mac');
    client.user.setPresence({
        activities: [
            {
                name: "Hey there Windows 11!",
                url: 'https://www.youtube.com/watch?v=Uh9643c2P6k',
                type: "STREAMING"
            }
        ],
        status: "idle"
    });
    client.guilds.cache.forEach(guild => {


        guild.commands.create({
            name: "mute",
            description: "Mute a user! This will prevent them from talking.",
            options: [
                {
                    name: "user",
                    description: "The user to mute.",
                    type: Options.USER,
                    required: true
                },
                {
                    name: "time",
                    description: "Time to mute the user for, in minutes.",
                    type: Options.INTEGER,
                    required: false
                },
                {
                    name: "reason",
                    description: "Reason for muting the person.",
                    type: Options.STRING,
                    required: false
                }
            ]
        }).catch(e => console.log(e));

        guild.commands.create({
            name: "ping",
            description: "Check the bot's ping!"
        }).catch(e => console.log(e));

        guild.commands.create({
            name: "kick",
            description: "Kick a member from your server.",
            options: [
                {
                    name: "user",
                    description: "The user to kick.",
                    type: Options.USER,
                    required: true
                },
                {
                    name: "reason",
                    description: "Reason for kicking the user",
                    type: Options.STRING,
                    required: false
                }
            ]
        }).catch(e => console.log(e));

        guild.commands.create({
            name: "ban",
            description: "Ban a member from your server.",
            options: [
                {
                    name: "user",
                    description: "The user to Ban.",
                    type: Options.USER,
                    required: true
                },
                {
                    name: "reason",
                    description: "Reason for Banning the user",
                    type: Options.STRING,
                    required: false
                }
            ]
        }).catch(e => console.log(e));





    })
}