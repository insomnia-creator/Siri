const info = require('../../package.json');

module.exports = {
    name: "about",
    run: async(interaction, keyv, ms, Discord, client, moment, fs) => {
        await interaction.reply({
            embeds: [
                {
                    title: `Siri v${info.version}`,
                    fields: [
                        {
                            name: "discord.js",
                            value: info.dependencies["discord.js"]
                        },
                        {
                            name: "moment",
                            value: info.dependencies.moment
                        },
                        {
                            name: "ms",
                            value: info.devDependencies.ms
                        },
                        {
                            name: "mathjs",
                            value: info.devDependencies.mathjs
                        },
                        {
                            name: "Keyv, @keyv/redis, ioredis",
                            value: `${info.dependencies.keyv}, ${info.dependencies["@keyv/redis"]}, ${info.dependencies.ioredis}`
                        }
                    ],
                    color: '#ff9f34',
                    description: `Made by ${interaction.guild.members.cache.get('697400225656078347').user.tag} along with Pixel(he is bye and he did nothing but write 2 lines though, thanks pixel!)`
                }
            ]
        })
    }
}