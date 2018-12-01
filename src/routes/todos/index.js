import { h, Component } from 'preact';
import { withNamespaces } from 'react-i18next';
import { Link } from 'preact-router/match';
import request from 'superagent';
import NProgress from 'nprogress';
import style from './style.css';

class Todos extends Component {
	state = {
		todos: [],
		errMsg: ''
	};

	completedTodos(todos) {
		return todos.filter(t => t.completed).length;
	}

	componentWillMount() {
		NProgress.start();
	}

	componentDidMount(){
		request.get('http://localhost:4000/user/'+ this.props.matches.id + '/todos')
			.end((err,res) => {
				NProgress.done();
				if (err || !res.ok) {
					this.setState({
						errMsg: 'Error: fix "getTodos" please...'
					});
				}
				else {
					this.setState({
						todos: res.body
					});
				}
			});
	}

	render({ id }, { todos, errMsg }) {
		const { t } = this.props;
		return (
			<div class={style.todos}>
				{/* Un esempio di commento JSX */}
				<Link href={`/user/${this.props.matches.id}`}>
					<button type="button" className="btn btn-success top-right">{t('BACK_TO_USER')}</button>
				</Link>
				<h4>TODO:
					{this.completedTodos(todos)}
						/
					{todos.length}</h4>
				{todos.map((todo) =>
					(<div key={todo.id} className="form-check disabled">
						<label className="form-check-label">
							<input type="checkbox" className="form-check-input" disabled checked={todo.completed} />
							{todo.title}
						</label>
					</div>)
				)}
				{errMsg &&
					<div>
						{errMsg}
					</div>
				}
			</div>
		);
	}
}

export default withNamespaces('translation')(Todos);
