import { h, Component } from 'preact';
import { withNamespaces } from 'react-i18next';
import logo from './logo.svg';
import style from './style.css';

class Header extends Component {
	render() {
		const { t } = this.props;
		return (
			<header>
				<div class={style.appTitle}>
					<img src={logo} class={style.appLogo} alt="logo" />
					<h1>{t('TITLE')}</h1>
				</div>
			</header>
		);
	}
}

export default withNamespaces('translation')(Header);