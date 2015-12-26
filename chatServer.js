var server = require('http').createServer();
var io = require('socket.io')(server);

var users = []; //{id, name}
var userCount = 0;

function log() {
  var args = Array.prototype.slice.call(arguments);
  console.log.apply(null, args);
}

function getUsers() {
  return users.map(function(user) { return user.name; });
}

function addUser(username) {
  if (!username || (users.filter(function(a) { return a.name == username})).length) {
    username = 'GuestUser' + userCount;
  }
  
  var newUser = {
    name: username,
    id: userCount
  };
  users.push(newUser);

  users = users.sort(function(a,b) {
    return a < b;
  });

  userCount++;

  return newUser;
}

function renameUser(thisUser, name) {
  var tmp = users.filter(function(user) {
    return user.name == name && user.id != thisUser.id;
  });

  if (tmp.length) {
    return thisUser;
  }

  var newUser = {
    id: thisUser.id,
    name
  };

  users = users.filter(function(user) {
    return user.id != thisUser.id;
  });
  users.push(newUser);

  return newUser;
}

function removeUser(id) {
  users = users.filter(function(a) {
    return a.id != id;
  });
}

var chat = io.on('connection', function(socket) {
  log("connection received");

  var thisUser;

  socket.emit('init', {
    loggedIn: false
  });

  socket.on('user:login', function(username) {
    thisUser = addUser(username);
    log('login', thisUser);
    socket.emit('user:login', {
      name: thisUser.name,
      joined: Date.now(),
      loggedIn: true
    });

    chat.emit('user:join', getUsers());
    chat.emit('message', {
      type: 'system',
      timestamp: Date.now(),
      text: thisUser.name + ' has joined'
    });
  });

  socket.on('user:rename', function(name) {
    var oldUser = thisUser.name;

    thisUser = renameUser(thisUser, name);
    log('rename', thisUser.name);
    socket.emit('user:rename', thisUser.name);

    chat.emit('user:join', getUsers());
    chat.emit('message', {
      type: 'system',
      timestamp: Date.now(),
      text: oldUser + ' has changed name to ' + thisUser.name
    });
  })

  socket.on('message', function(message) {
    log(thisUser.name + ': ' + message);
    chat.emit('message', {
      type: 'user',
      user: thisUser.name,
      timestamp: Date.now(),
      text: message
    });
  });

  socket.on('disconnect', function() {
    if (!thisUser) return;
    removeUser(thisUser.id);
    log('client disconnected');
    chat.emit('user:leave', getUsers());
    chat.emit('message', {
      type: 'system',
      timestamp: Date.now(),
      text: thisUser.name + ' has left'
    });
  });
});

server.listen(8081, function() {
  log('chat server running');
});
