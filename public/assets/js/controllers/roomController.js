import {Controller} from "./controller.js";
import {App} from "../app.js";

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

    }
    
}
