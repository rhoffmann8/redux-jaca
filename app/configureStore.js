import { compose, combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import { browserHistory } from 'react-router';
import io from 'socket.io-client';

const host = 'localhost';
const port = 8081;

const createStoreWithMiddleware = compose(
	applyMiddleware(
		thunkMiddleware
	),
	global.devToolsExtension ? global.devToolsExtension() : f => f
)(createStore);

export default function configureStore(initialState) {
	const store = createStoreWithMiddleware(rootReducer, initialState);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./reducers', () => {
			const nextRootReducer = require('./reducers').default;
			store.replaceReducer(nextRootReducer);
		});
	}

  	return store;
};
