const TwitchJS = require('twitch-js');
const options = {
  connection: {
    reconnect: true,
    secure: true,
  },
  options: {
    debug: true,
  },
  identity: {
    username: "", // bots account name
    password: "" // twitchapps.com/tmi/
  },
  channels: ['',  ''] //channels you want to connect to
};

const client = new TwitchJS.Client(options);

// chat commands
client.on('chat', function(channel, userstate, message, self) {
  if (self) return; // will not respond to its own messages

  // commands for the broadcaster only
  if(userstate['username'] === channel.replace("#", "")){
    switch(message){
      case "$streamer":
        client.action(channel, userstate['display-name'] + ' is the streamer around here!');
        break;
    }
  }


  // commands for mods or the streamer
  if(userstate['mod'] == true || userstate['username'] === channel.replace("#", "")){
    switch(message){
      case "$mod":
        client.say(channel, userstate['display-name'] + ' is in charge at keeping trouble at bay.');
        break;
    }
  }



  // commands for all users
  switch(message){
    case "$hello":
      client.say(channel, "hello " + userstate['display-name'] + ", how are you today?");
      break;
    case "$hey":
      console.log(message)
      client.say(channel, "How is everyone today (｡◕‿◕｡)?");
      break;
    case "$chatbot":
      client.say(channel, "This chatbot was made using NodeJS");
      break;
    case "$thankschat":
      client.say(channel, "Thanks to all of the awesome people supporting an awesome community!");
      break;
  }
});



// Events for Raids, Hosts, and Hosting
client.on('raid', function(channel, raider, viewers, userstate) {
  setTimeout(function(){
    client.say(channel, raider + ' is raiding with ' + viewers + '!');
  }, 10000);
});

client.on('hosted', function(channel, username, viewers, autohost) {
  client.say(channel, username + ' has joined us with ' + viewers + ' of their friends!');
});

client.on('hosting', function(channel, target, viewers) {
  client.say(channel, 'We are going to go hang out with ' + target + '! Come join us for a good time!');
});



// Events for Cheers, Subs, Resubs, and Gifted subs
client.on('cheer', function(channel, userstate, message) {
  client.say(channel, userstate['display-name'] + ' gave the channel ' + userstate['bits'] + ' bits!');
});

client.on('subscription', function(channel, username, method, message, userstate) {
  client.say(channel, username + ' has just joined the family! Lets show them some love!');
});

client.on('subgift', function(channel, username, recipient, method, userstate) {
  client.say(channel, recipient + ' has just been gifted a subscription to the family by ' + username + '!');
});

client.on('resub', function(channel, username, months, message, userstate, methods) {
  client.say(channel, username + ' has resubbed! They have been a part of the family for ' + months + ' months!');
});



// connects to the channel
client.connect();
