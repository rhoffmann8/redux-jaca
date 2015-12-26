jaca
=====================

Just Another Chat App, built using React/Redux and Dan Abramov's wonderful [react-hot-boilerplate](ttps://github.com/gaearon/react-hot-boilerplate) starter template. Communicates with a very basic Socket.IO server (chatServer.js) included in the project.

### Usage

Start the application:
```
npm install
npm run start
```

Start the chat server:
```
node chatServer.js
```

Example WebSocket chat server host/port are set in settings.js. Default is localhost:8081.
Connect to http://localhost:3000 to view chat client. Add <DevTools/> under <App/> in src/index.js to view Redux Devtools panel.

### Todo
* Refactor ChatSettings as "smart" container
* Support for XMPP (node-xmpp-server/node-xmpp-client integration)
* Tests