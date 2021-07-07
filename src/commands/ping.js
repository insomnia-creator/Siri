module.exports = {
    name: "ping",
    run: async(interaction, keyv, ms, Discord, client, moment, fs, message) => {
        //pong
        await interaction.reply({
            embeds: [
                {
                    title: "Pong! 🏓",
                    fields: [
                        {
                            name: "Client Latency",
                            value: `Returned in **$${Date.now() - interaction.createdTimestamp} ms**.`
                        },
                        {
                            name: "API Latency",
                            value: `Returned in **${client.ws.ping} ms**.`
                        }
                    ]
                }
            ]
        });
        return;
        //haha send message!
    }
}
