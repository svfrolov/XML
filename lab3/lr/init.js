import {MainPage} from "./pages/main/index.js";

export function initLR() {
    const root = document.getElementById('lr-root');
    if (root) {
        const mainPage = new MainPage(root);
        mainPage.render();
    }
}
