import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createDevTools } from 'redux-devtools';
import thunkMiddleware from 'redux-thunk';
var io = require('socket.io-client');

import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import App from './App';
import reducers from './reducers';
require('./styles/app.scss');

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey='ctrl-h' changePositionKey='ctrl-q'>
    <LogMonitor theme='tomorrow'/>
  </DockMonitor>
);

const finalCreateStore = compose(
  applyMiddleware(
    thunkMiddleware
  ),
  DevTools.instrument()
)(createStore);

const store = finalCreateStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <div style={{height: '100%'}}>
      <App io={io} />
    </div>
  </Provider>
  ,document.getElementById('root')
);

