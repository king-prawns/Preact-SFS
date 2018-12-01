import { h, Component } from 'preact';

import { Router } from 'preact-router';
import { withNamespaces } from 'react-i18next';

import Header from './header';
import Topnav from './topnav';

import style from './style';

// Code-splitting is automated for routes
import Users from '../routes/users';
import User from '../routes/user';
import Todos from '../routes/todos';
import Posts from '../routes/posts';
import PageNotFound from '../routes/pageNotFound';

class App extends Component {
	
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app">
				<div class={style.appHeader}>
					<Header />
					<Topnav />
				</div>
				<div class={style.appContent}>
					<Router onChange={this.handleRoute}>
						<Users path="/" />
						<Posts path="/posts" />
						<User path="/user/:id" />
						<Todos path="/user/:id/todos" />
						<PageNotFound default />
					</Router>
				</div>
			</div>
		);
	}
}

export default withNamespaces('translation')(App);
