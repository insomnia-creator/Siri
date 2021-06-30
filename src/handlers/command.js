const {readdirSync} = require('fs');

const ascii_table = require('ascii-table');
//ascii_table
let table = new ascii_table('Commands and status');

table.setHeading('Command', 'Load state');
//this is only useful when you are building the bot yourself
module.exports = (client) => {
    client.categories.forEach(dir => {
        //all the categories
        const commands = readdirSync(`./src/commands/${dir}`).filter(file => file.endsWith('js'));
        //get the commands with all the files using a filter
        commands.forEach(file => {
            let pull = require(`../commands/${dir}/${file}`);
            if(pull.name){
                client.commands.set(pull.name, pull);
                table.addRow(file, '✅ Loaded');
            } else {
                table.addRow(file, '❌ No');
            }
            if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(a => client.aliases.set(a, pull.name));
        });
        //forEach loop
    });


    console.log(table.toString());
    //for you, while building

}