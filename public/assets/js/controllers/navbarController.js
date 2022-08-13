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
        this.#view.querySelectorAll("a.nav-link").forEach(navItem => {
            if (typeof navItem.dataset.controller === "undefined")
                return;
            
            // on click we switch to the correct controller and highlight the selected page
            navItem.addEventListener("click", () => {
                if (App.getCurrentController() == navItem.dataset.controller)
                    return;

                this.#view.querySelectorAll("a.nav-link").forEach(i => i.classList.remove("active"));
                navItem.classList.add("active");
                App.loadController(navItem.dataset.controller);
            });
        });
    }
}