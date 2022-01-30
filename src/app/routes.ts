import {LoginPage} from './pages/login';
import {RegistrationPage} from './pages/registration';
import {ChatsPage} from './pages/chats';
import {AccountPage} from './pages/account';

export const URLS = {
	login: '/',
	registration: '/sign-up',
	chats: '/messenger',
	settings: '/settings',
	logout: '/logout',
};

export default {
	[URLS.login]: LoginPage,
	[URLS.registration]: RegistrationPage,
	[URLS.chats]: ChatsPage,
	[URLS.settings]: AccountPage,
};
