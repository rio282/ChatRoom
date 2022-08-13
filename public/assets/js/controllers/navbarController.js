import { Controller } from "./controller.js";
import { App } from "../app.js";

export class NavbarController extends Controller {
    
    #view;

    constructor() {
        super();
        this.#loadView().then(() => this.#addSubscribers());
    }

    async #loadView() {
        this.#view = await super.loadHtmlIntoNavbar("views/navbar.html");
    }

    async #addSubscribers() {
        // navbar items
        this.#view.querySelectorAll("a.nav-link").forEach(navItem => {
            if (typeof navItem.dataset.controller === "undefined")
                return;

            // highlight correct item on page load
            navItem.classList.remove("active");
            if (navItem.dataset.controller === App.getCurrentController())
                navItem.classList.add("active");
            
            // on click we switch to the correct controller and highlight the selected page
            navItem.addEventListener("click", () => {
                if (App.getCurrentController() == navItem.dataset.controller)
                    return;

                // highlight clicked item
                this.#view.querySelectorAll("a.nav-link").forEach(i => i.classList.remove("active"));
                navItem.classList.add("active");

                App.loadController(navItem.dataset.controller);
            });
        });

        // light / dark mode
        const themeSwitch = this.#view.querySelector("#dark-theme-switch");
        themeSwitch.addEventListener("change", () => {
            document.body.style.color = (themeSwitch.checked) ? "var(--fg-color-dark)" : "var(--fg-color-light)";
            document.body.style.backgroundColor = document.body.style.color.replace("fg", "bg");
            
            // store correct mode in
            App.sessionManager.set("dark_theme", themeSwitch.checked);
        });
        themeSwitch.checked = App.sessionManager.get("dark_theme");
        themeSwitch.dispatchEvent(new Event("change"));
    }
}