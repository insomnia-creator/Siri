const fs = require('fs');
/*
If you are wondering why I changed this. Well we're migrating to slash commands only.
;)
 */

const asciitable = require('ascii-table');
let table = new asciitable("Starship Command Handler");
table.setHeading("Command", "Load status");
//yo pixel nice name lol
module.exports = client => {
    const files = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

    files.forEach(file => {
        const command = require(`../commands/${file}`);
        if(command.name){
            table.addRow(file, " ✅")
            client.commands.set(command.name, command);
        } else {
            table.addRow(file, " ❌")
        }
    });
    console.log(table.toString());
}