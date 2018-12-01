import { h, Component } from 'preact';
import { withNamespaces } from 'react-i18next';
import { route } from 'preact-router';
import request from 'superagent';
import NProgress from 'nprogress';
import style from './style';

class Users extends Component {
	state = {
		users: [],
		errMsg: ''
	};

	handleUserClick(id){
		route(`/user/${id}`);
	}

	componentWillMount() {
		NProgress.start();
	}

	// gets called when this route is navigated to
	componentDidMount() {
		request.get('http://localhost:4000/users')
			.end((err,res) => {
				NProgress.done();
				if (err || !res.ok) {
					this.setState({
						errMsg: 'Error: fix "getUsers" please...'
					});
				}
				else {
					this.setState({
						users: res.body
					});
				}
			});
	}

	// Note: `user` comes from the URL, courtesy of our router
	render({}, { users, errMsg }) {
		const { t } = this.props;
		return (
			<div>
				<table className="table">
					<thead>
						<tr>
							<th>{t('ID')}</th>
							<th>{t('NAME')}</th>
							<th>{t('EMAIL')}</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) =>
							(<tr key={user.id} class={style.userRow} onClick={() => this.handleUserClick(user.id)}>
								<td>{user.id}</td>
								<td>{user.name}</td>
								<td>{user.email}</td>
							</tr>)
						)}
					</tbody>
				</table>
				{errMsg &&
					<div>
						{errMsg}
					</div>
				}
			</div>
		);
	}
}

export default withNamespaces('translation')(Users);
