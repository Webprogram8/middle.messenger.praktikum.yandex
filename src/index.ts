import "./common/site.css";
import { LoginPage } from "./pages/login";
import { Page404 } from "./pages/page404";
import { Page500 } from "./pages/page500";
import { RegistrationPage } from "./pages/registration";
import { ChatsPage } from "./pages/chats";
import { AccountPage } from "./pages/account";
import Block from "./lib/block";
import { Class } from "./common/types";

const pageNames = [
    "login",
    "registration",
    "chats",
    "account",
    "page404",
    "page500",
] as const;

type TPageName = typeof pageNames[number];

const PAGES: Record<TPageName, Class<Block>> = {
    login: LoginPage,
    registration: RegistrationPage,
    chats: ChatsPage,
    account: AccountPage,
    page404: Page404,
    page500: Page500,
};

const isPageName = (pageName?: string): pageName is TPageName =>
    Boolean(pageName) && pageNames.includes(pageName as TPageName);

const getCurrentPage = (): TPageName => {
    const pageFromUrl = window.location.hash
        ? window.location.hash.substring(1)
        : undefined;
    return isPageName(pageFromUrl) ? pageFromUrl : "login";
};

function showCurrentPage() {
    const currentPageClass = PAGES[getCurrentPage()];
    const page = new currentPageClass();
    const pageEl = page.getContent();
    if (pageEl) {
        document.body.replaceChildren(pageEl);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    showCurrentPage();
});

window.addEventListener("hashchange", showCurrentPage, false);
