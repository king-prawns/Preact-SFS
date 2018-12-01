import { h, Component } from 'preact';
import { withNamespaces } from 'react-i18next';
import { Link } from 'preact-router/match';
import request from 'superagent';
import NProgress from 'nprogress';
import CustomWidget from '../../widget/customWidget';
import style from './style.css';

class User extends Component {
	handleInputChange(event) {
		let target = event.target;
		let value = target.value;
		let name = target.name;
		//modifico solo una proprietà dell'oggetto
		let newUser = JSON.parse(JSON.stringify(this.state.user));
		newUser[name] = value;
		this.setState({
			user: newUser
		});
	}

	handleUpdateClick(){
		NProgress.start();
		request.put('http://localhost:4000/users/'+ this.props.matches.id)
			.send(this.state.user)
			.end((err,res) => {
				NProgress.done();
				if (err || !res.ok) {
					console.err('Error: fix "setUser" please...');
				}
				else {
					console.log('user updated!');
				}
			});
	}

	handleSayNameClick(name, username){
		CustomWidget.fullName(name, username);
	}

	constructor(props) {
		super(props);
		this.state = {
			user: {
				name: '',
				email: '',
				username: '',
				phone: ''
			},
			errMsg: ''
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleUpdateClick = this.handleUpdateClick.bind(this);
	}

	componentWillMount() {
		NProgress.start();
	}

	componentDidMount(){
		request.get('http://localhost:4000/users/'+ this.props.matches.id)
			.end((err,res) => {
				NProgress.done();
				if (err || !res.ok) {
					this.setState({
						errMsg: 'Error: fix "getUser" please...'
					});
				}
				else {
					let data = res.body;
					this.setState({
						user: data
					});
				}
			});
	}

	render({ id }, { user, errMsg }) {
		const { t } = this.props;
		return (
			<div class={style.userDetails}>
				<Link href={`/user/${id}/todos`}>
					<button type="button" class={`${style.topRight} btn btn-success`}>{t('SHOW_TODOS')}</button>
				</Link>
				<h4>{t('USER_DETAIL')}</h4>
				<form noValidate>
					<div className="form-group">
						<label htmlFor="name">{t('NAME')}</label>
						<input id="name" type="text" className="form-control" name="name"
							value={user.name} onChange={this.handleInputChange}
						/>
						{!user.name &&
								<div className="alert alert-danger">
										Name is required
								</div>
						}
					</div>
					<div className="form-group">
						<label htmlFor="email">{t('EMAIL')}</label>
						<input id="email" type="text" className="form-control" name="email" value={user.email} onChange={this.handleInputChange} />
					</div>
					<div className="form-group">
						<label htmlFor="username">{t('USERNAME')}</label>
						<input id="username" type="text" className="form-control" name="username" value={user.username} onChange={this.handleInputChange} />
					</div>
					<div className="form-group">
						<label htmlFor="phone">{t('PHONE')}</label>
						<input id="phone" type="text" className="form-control" name="phone" value={user.phone}
							onChange={this.handleInputChange}
						/>
					</div>
					<button type="button" class={`${style.btnUpdate} btn btn-primary`} onClick={this.handleUpdateClick} disabled={!user.name}>{t('UPDATE_USER')} </button>
					<button type="button" className="btn btn-info" onClick={() => this.handleSayNameClick(user.name, user.username)}>{t('SAY_NAME')}</button>
				</form>
				{errMsg &&
						<div>
							{errMsg}
						</div>
				}
			</div>
		);
	}
}

export default withNamespaces('translation')(User);
