import './common/site.css';
import pageLogin from './pages/login';
import pageRegistration from './pages/registration';
import pageAccount from './pages/account';
import page404 from './pages/page404';
import page500 from './pages/page500';
import pageChats from './pages/chats';

const PAGES = {
  login: pageLogin,
  registration: pageRegistration,
  chats: pageChats,
  account: pageAccount,
  page404,
  page500,
};

const getCurrentPage = () => {
  const pageFromUrl = window.location.hash ? window.location.hash.substring(1) : undefined;
  return pageFromUrl || 'login';
};

const getCurrentTemplate = () => PAGES[getCurrentPage()];

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = getCurrentTemplate()();
});
