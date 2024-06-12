const venom = require('venom-bot');
const moment = require('moment'); 

let userInteractions = {};
let initialMessage = 'Hello! How can I help you today?'

venom.create({
  session: 'session1', // Specify a session name
  multidevice: true,  // Enable multi-device support
})
.then((client) => start(client))
.catch((err) => console.log(err));
  

function start(client) {
  client.onMessage((message) => {
    const userId = message.from;
    const now = moment();

    // Ignore group messages
    if (message.isGroupMsg) {
      return;
    }

    // Check if user is new or last interaction was more than a day ago
    if (!userInteractions[userId] || now.diff(userInteractions[userId], 'days') >= 1) {
      // Record the current interaction time
      userInteractions[userId] = now;

      // Send initial response
      client
        .sendText(userId, initialMessage)
        .then((result) => {
          // console.log('Message sent: ', result);
          console.log('Message sent successfully');
        })
        .catch((error) => {
          console.error('Error sending message: ', error);
        });
    }
  });
}
