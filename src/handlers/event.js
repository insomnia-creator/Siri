const { readdirSync } = require('fs');
//only thing that we need
const asciitable = require('ascii-table');
let table = new asciitable("Starship Event Handler");
table.setHeading("Event", "Load status");


module.exports = (client) => {
    const load = dirs => {
        //the load function, written in pure ES6 style.
        const events = readdirSync(`./src/events/${dirs}/`).filter(f => f.endsWith('.js'));
        //get the event files
        events.forEach(file => {
            const evn = require(`../events/${dirs}/${file}`);
            let evnName = file.split('.')[0];
            table.addRow(file, " ✅");
            client.on(evnName, evn.bind(null, client));
            //bind the event to the client.on thing
        });
        //for all the files on this planet.
    };
    ["client", "guild"].forEach(cg => load(cg));
    console.log(table.toString());
    //finally let's load client and guild(folders) through a forEach loop.

};