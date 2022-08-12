import {App} from "../app.js";

export class Controller {
    
    #navbarView;
    #contentView;
    #footerView;

    constructor() {
        this.#navbarView = document.querySelector(".navbar");
        this.#contentView = document.querySelector(".content");
        this.#footerView = document.querySelector(".footer");
    }

     async loadHtmlIntoNavbar(htmlFile) {
        return await this.#fetchHtmlViewIntoElement(htmlFile, this.#navbarView);
    }

    async loadHtmlIntoFooter(htmlFile) {
        return await this.loadHtmlIntoCustomElement(htmlFile, this.#footerView);
    }

    async loadHtmlView(htmlFile) {
        return await this.#fetchHtmlViewIntoElement(htmlFile, this.#contentView);
    }

    async #fetchHtmlViewIntoElement(htmlFile, element) {
        if(!element instanceof Element) {
            console.log(`Non-element passed as element. Couldn't load view: ${htmlFile}`);
            return;
        }

        try {
            // fetch view
            const response = await fetch(htmlFile);
            if (response.ok) {
                // load view into element
                const htmlData = await response.text();
                element.innerHTML = "";
                element.innerHTML = htmlData;
                return element;
            }
            
            // throw error if response wasn't ok
            throw new Error(response.statusText);
        } catch(e) {
            console.error(e);
            element.innerHTML = "<p>Failed to load HTML file</p>";
        }
    }

    async #loadView() {
        throw new Error(`Method '${this.constructor.name}.#${arguments.callee.name}' be implemented.`);
    }

    async #addSubscribers() {
        throw new Error(`Method '${this.constructor.name}.#${arguments.callee.name}' be implemented.`);
    }
}