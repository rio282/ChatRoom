import {Controller} from "./controller.js";
import {App} from "../app.js";
import {RoomsRepository} from "../repositories/roomsRepository.js";

export class RoomsController extends Controller {

    #view;
    #repository;

    constructor() {
        super();
        this.#repository = new RoomsRepository();
        this.#loadView().then(() => this.#addSubscribers());
    }

    async #loadView() {
        this.#view = await super.loadHtmlView("views/rooms.html");
    }

    async #addSubscribers() {
        this.#view.querySelector("#test-button").addEventListener("click", async () => {
            this.#repository.get(1);
        });
    }
    
}
