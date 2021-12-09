import "./common/site.css";
// import { LoginPage } from "./pages/login";
// import { Page404 } from "./pages/page404";
// import { Page500 } from "./pages/page500";
// import { RegistrationPage } from "./pages/registration";
// import { ChatsPage } from "./pages/chats";
import { AccountPage } from "./pages/account";
// import pageLogin from './pages/login';
// import pageRegistration from './pages/registration';
// import pageAccount from './pages/account';
// import page404 from './pages/page404';
// import page500 from './pages/page500';
// import pageChats from './pages/chats';
//
// const pageNames = ['login', 'registration', 'chats', 'account', 'page404', 'page500'] as const;
//
// type TPageName = typeof pageNames[number];
//
// const PAGES: Record<TPageName, (context?: object) => string> = {
//   login: pageLogin,
//   registration: pageRegistration,
//   chats: pageChats,
//   account: pageAccount,
//   page404,
//   page500,
// };
//
// const isPageName = (pageName?: string): pageName is TPageName => Boolean(pageName) && pageNames.includes(pageName as TPageName);
//
// const getCurrentPage = (): TPageName => {
//   const pageFromUrl = window.location.hash ? window.location.hash.substring(1) : undefined;
//   return isPageName(pageFromUrl) ? pageFromUrl : 'login';
// };
//
// const getCurrentTemplate = PAGES[getCurrentPage()];
//
// console.log(getCurrentPage());
document.addEventListener("DOMContentLoaded", () => {
    // document.body.innerHTML = getCurrentTemplate();
    const page = new AccountPage();
    const pageEl = page.getContent();
    if (pageEl) {
        document.body.appendChild(pageEl);
    }
});
