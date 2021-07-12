const math = require('mathjs');

module.exports = {
    name: "calculate",
    run: async(interaction, keyv, ms, Discord, client, moment, fs) => {
        const eq = interaction.options.find(op => op.name === "equation").value;
        let ans = 0;
        try {
            ans = math.evaluate(eq);
        } catch {
            await interaction.reply({
                content: "Invalid equation",
                ephemeral: true
            });
        }
        await interaction.reply({
            embeds: [
                {
                    fields: [
                        {
                            name: "Equation",
                            value: eq
                        },
                        {
                            name: "Answer",
                            value: `${ans}`
                        }
                    ]
                }
            ]
        });
    }
}