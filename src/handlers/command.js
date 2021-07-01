const fs = require('fs');
/*
If you are wondering why I changed this. Well we're migrating to slash commands only.

;)

 */

module.exports = client => {
    const files = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

    files.forEach(file => {
        const command = require(`../commands/${file}`);
        client.commands.set(command.name, command);
    })
}