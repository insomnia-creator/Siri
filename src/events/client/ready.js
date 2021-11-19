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
//haha u cant change it anymore amonnnggguusuus
//everyone loves enumerators!


module.exports = (client) => {
    console.log(`
    Client currently logged in as: ${client.user.tag}
    Client ID: ${client.user.id}
    Servers currently in ${client.guilds.cache.map(guild => {return `${guild.name}, `})}
    Gonna give you up! Gonna let you down! Gonna run around andddd desert you!`)

    client.user.setActivity("macOS Monterey made me look ugly.")
    client.guilds.cache.forEach(guild => {

        guild.commands.create({
            name: "archive",
            description: "Archives a channel.",
            options: [
                {
                    name: "channel",
                    description: "The channel to archive.",
                    type: Options.CHANNEL,
                    required: true
                },
                {
                    name: "reason",
                    description: "The reason to archive said channel.",
                    type: Options.STRING,
                    required: false
                }
            ]
        }).catch(e => console.log(e));
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
                    required: false
                },
                {
                    name: "id",
                    description: "The ID of the user to Ban.",
                    type: Options.INTEGER,
                    required: false,
                },
                {
                    name: "reason",
                    description: "Reason for Banning the user",
                    type: Options.STRING,
                    required: false
                }
            ]
        }).catch(e => console.log(e));
        guild.commands.create({
            name: "unmute",
            description: "Unmute a muted person.",
            options: [
                {
                    name: "user",
                    description: "The user to un-mute.",
                    type: Options.USER,
                    required: true
                },
                {
                    name: "reason",
                    description: "Reason for un-muting the user.",
                    type: Options.STRING,
                    required: false
                }
            ]
        }).catch(e => console.log(e));

        guild.commands.create({
            name: "warn",
            description: "Warn a user.",
            options: [
                {
                    name: "user",
                    description: "The user to warn.",
                    type: Options.USER,
                    required: true
                },
                {
                    name: "reason",
                    description: "Reason for warning the user.",
                    type: Options.STRING,
                    required: false
                }
            ]
        }).catch(e => console.log(e));

        guild.commands.create({
            name: "resetwarns",
            description: "Reset the warnings for user.",
            options: [
                {
                    name: "user",
                    description: "The user to reset the warns for.",
                    type: Options.USER,
                    required: true
                },
                {
                    name: "reason",
                    description: "Reason for resetting warns.",
                    type: Options.STRING,
                    required: false
                }
            ]
        }).catch(e => console.log(e));

        guild.commands.create({
            name: "fetchwarns",
            description: "Fetch the warnings for yourself or a person.",
            options: [
                {
                    name: "user",
                    description: "The user to fetch warnings for.",
                    type: Options.USER,
                    required: false
                }
            ]
        }).catch(e => console.log(e));

        guild.commands.create({
            name: "calculate",
            description: "Your in-house calculator.",
            options: [
                {
                    name: "equation",
                    description: "Equation, Eg: 2 feet to cm",
                    type: Options.STRING,
                    required: true
                },
            ]
        }).catch(e => console.log(e));
        guild.commands.create({
            name: "rank",
            description: "Check your or someone's rank",
            options: [
                {
                    name: "user",
                    description: "The user to check the rank for",
                    type: Options.STRING,
                    required: false
                },
            ]

        }).catch(e => console.log(e));

        guild.commands.create({
            name: 'poll',
            description: "Start a yes, no poll",
            options: [
                {
                    name: "topic",
                    description: "The topic of your poll.",
                    type: Options.STRING,
                    required: true
                }
            ]
        }).catch(e => console.log(e));
        guild.commands.create({
            name: "leaderboard",
            description: "Leaderboard of all the people who have the highest rank."
        }).catch(e => console.log(e));

        guild.commands.create({
            name: "purge",
            description: "Purge the specified amount of messages",
            options: [
                {
                    name: "messages",
                    description: "The amount of messages to delete.",
                    type: Options.INTEGER,
                    required: true
                }
            ]
        }).catch(e => console.log(e));

        guild.commands.create({
            name: "addrole",
            description: "Add a role to a user.",
            options: [
                {
                    name: "role",
                    description: "The role to add the user.",
                    type: Options.ROLE,
                    required: true
                },
                {
                    name: "member",
                    description: "The member to add the role to.",
                    type: Options.USER,
                    required: true
                }
            ]
        }).catch(e => console.log(e));

        guild.commands.create({
            name: "removerole",
            description: "Remove a role from a user.",
            options: [
                {
                    name: "role",
                    description: "The role to remove from the user.",
                    type: Options.ROLE,
                    required: true
                },
                {
                    name: "member",
                    description: "The member to remove the role from.",
                    type: Options.USER,
                    required: true
                }
            ]
        }).catch(e => console.log(e));
        guild.commands.create({
            name: "about",
            description: "About Siri."
        }).catch(e => console.log(e));





    })
}
