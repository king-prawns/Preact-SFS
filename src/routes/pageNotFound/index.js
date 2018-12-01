import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';

export default class PageNotFound extends Component {
	render() {
		const { t } = this.props;
		return (
			<div>
				<h2>Page not Found</h2>
				<Link href="/"><button>Back to Homepage</button></Link>
			</div>
		);
	}
}
