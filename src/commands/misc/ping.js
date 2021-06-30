module.exports = {
    name: "ping",
    description: "Check the bot's ping!",
    category: "misc",
    usage: "ping",
    run: async(message, args, client, Discord, Util, keyv, ms, fs, moment) => {
        //finally with everything, let's check the ping.

        await message.channel.send({
            embeds: [
                {
                    title: 'Ping',
                    color: "#ff9f34",
                    fields: [
                        {
                            name: "Latency",
                            value: `${Date.now() - message.createdTimestamp}`
                        },
                        {
                            name: "API Latency",
                            value: `${Math.round(client.ws.ping)}`
                        }
                    ]
                }
            ]
        });

    }
}