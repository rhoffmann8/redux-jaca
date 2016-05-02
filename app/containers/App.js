import React, { Component } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

class App extends Component {

	render() {
		return (
			<div>
				<Helmet
					title='MyApp'
					titleTemplate='MyApp - %s'
					meta={[
						{'char-set': 'utf-8'},
						{'name': 'description', 'content': 'My super dooper dope app'}
					]}
					link={[
						{'rel': 'stylesheet', 'href': 'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css'}
					]}
				/>
				{this.props.children}
			</div>
		);
	}
}

export default App;