import {Controller} from "./controller.js";
import {App} from "../app.js";
import { RequestManager } from "../utils/requestManager.js";

export class RoomController extends Controller {

    #view;

    constructor() {
        super();
        this.#loadView().then(() => this.#addSubscribers());
    }

    async #loadView() {
        this.#view = await super.loadHtmlView("views/room.html");
    }

    async #addSubscribers() {
        this.#view.querySelector("#test-button").addEventListener("click", () => {
            let rm = new RequestManager();
            rm.get("");
        });
    }
    
}
