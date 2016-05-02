import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import NoMatch from './containers/NoMatch';
import Chat from './containers/Chat';

export default (
	<Route path='/' component={App}>
		<IndexRoute component={Chat} />
		<Route path="*" component={NoMatch} />
	</Route>
);