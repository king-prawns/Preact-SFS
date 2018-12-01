import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { withNamespaces } from 'react-i18next';
import i18n from '../../i18n';
import brand from './brand.png';
import style from './style.css';

class Topnav extends Component {
	changeLanguage (lang) {
		i18n.changeLanguage(lang);
	}

	render() {
		const { t } = this.props;
		return (
			<nav class="navbar navbar-inverse navbar-toggleable">
				<a class={`${style.navbarBrand} navbar-brand`}>
					<img class={`${style.brand} brand`} src={brand} alt="brand" />
				</a>
				<div class={`${style.navbarNav} navbar-nav`}>
					<Link class="nav-item nav-link" href="/" activeClassName={style.active}>
						{t('USER_LIST')}
					</Link>
					<Link class="nav-item nav-link" href="/posts" activeClassName={style.active}>
						{t('POST_LIST')}
					</Link>
				</div>
				<div class={style.btnLang}>
					<button type="button" class="btn btn-secondary btn-sm" onClick={() => this.changeLanguage('it')}>{t('BUTTON_LANG_IT')}</button>
					<button type="button" class="btn btn-secondary btn-sm" onClick={() => this.changeLanguage('en')}>{t('BUTTON_LANG_EN')}</button>
				</div>
			</nav>
		);
	}
}

export default withNamespaces('translation')(Topnav);
