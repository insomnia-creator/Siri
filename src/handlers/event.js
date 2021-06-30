const { readdirSync } = require('fs');
//only thing that we need

module.exports = (client) => {
    const load = dirs => {
        //the load function, written in pure ES6 style.
        const events = readdirSync(`./src/events/${dirs}/`).filter(f => f.endsWith('.js'));
        //get the event files
        events.forEach(file => {
            const evn = require(`../events/${dirs}/${file}`);
            let evnName = file.split('.')[0];
            client.on(evnName, evn.bind(null, client));
            //bind the event to the client.on thing
        });
        //for all the files on this planet.
    };
    ["client", "guild"].forEach(cg => load(cg));
    //finally let's load client and guild(folders) through a forEach loop.

};