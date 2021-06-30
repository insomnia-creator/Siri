module.exports = (client) => {
    client.user.setPresence({
      activities: [
          {
              name: "WWDC",
              url: 'https://www.youtube.com/watch?v=0TD96VTf0Xs&t=4953s',
              type: "STREAMING"
          }
      ],
        status: "dnd"
    });
    console.log('macccccccc');
}