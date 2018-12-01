import { h, Component } from 'preact';
import { withNamespaces } from 'react-i18next';
import { Link } from 'preact-router/match';
import request from 'superagent';
import NProgress from 'nprogress';
import style from './style';

class Posts extends Component {
	state = {
		posts: [],
		errMsg: ''
	};

	componentWillMount() {
		NProgress.start();
	}

	// gets called when this route is navigated to
	componentDidMount() {
		request.get('http://localhost:4000/posts')
			.end((err,res) => {
				NProgress.done();
				if (err || !res.ok) {
					this.setState({
						errMsg: 'Error: fix "getPosts" please...'
					});
				}
				else {
					this.setState({
						posts: res.body
					});
				}
			});
	}

	// Note: `user` comes from the URL, courtesy of our router
	render({}, { posts, errMsg }) {
		const { t } = this.props;
		return (
			<div class={style.posts}>
				{posts.map((post) =>
					(<div key={post.id} class={`${style.cardPost} card card-block`}>
						<h4 className="card-title">{post.title}</h4>
						<p className="card-text">{post.body}</p>
						<Link href={`/user/${post.userId}`}>{t('GO_TO_USER')}</Link>
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

export default withNamespaces('translation')(Posts);
