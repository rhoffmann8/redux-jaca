redux-jaca
=====================

### Update (2016-05-02)

* Switched boilerplate to [universal-react](https://github.com/DominicTobias/universal-react)
* Added isomorphic/universal rendering (artifact from boilerplate)
* Added react-router (artifact from boilerplate) &mdash; not particularly useful for this application, but left in for example purposes
* Made application more "pure" &mdash; all refs are removed and information is passed through state and props only
* Removed all containers except for Chat.js, leaving it as the only "smart" container
* Moved socket logic to actions, removed SocketContainer. This is probably less of a performance improvement and more a personal choice &mdash; having a container for socket logic is perfectly fine.
* Added tests for all actions/reducers
* [BEMIT](http://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/) (BEM+ITCSS)-style SASS

**J**ust **A**nother **C**hat **A**pp, built using React/Redux ~~and Dan Abramov's wonderful [react-hot-boilerplate](https://github.com/gaearon/react-hot-boilerplate) starter template~~. Communicates with a very basic Socket.IO server (chatServer.js) included in the project.

### Usage

Start the chat server:
```
npm run start-chat
```

Start the application:
```
npm install
npm start
```

Run tests:
```bash
npm run test # run all tests
npm run test-watch # watch for and rerun tests on changes
```

Default port for chat server is 8081.
Connect to [http://localhost:3000](http://localhost:3000) to view chat client.

### Todo
* Component tests (enzyme)
* Support for XMPP (node-xmpp-server/node-xmpp-client integration)
