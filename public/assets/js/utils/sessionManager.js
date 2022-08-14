
export class SessionManager {

    #session;

    constructor() {
        try {
            this.#session = JSON.parse(localStorage.getItem("session"));
        } catch (e) {
            console.log("Failed to parse JSON object from local storage.");
        }

        // if session doesn't exist, we make a new one
        if(!this.#session) this.newSession();
    }

    newSession() {
        this.#session = {};
        this.#saveSession();
        console.log("CREATED NEW SESSION");
    }

    get(key) {
        return this.#session[key]; 
    }

    set(key, value) {
        this.#session[key] = value;
        this.#saveSession();
    }

    remove(key) {
        delete(this.#session[key]);
        this.#saveSession();
    }

    #saveSession() {
        localStorage.setItem("session", JSON.stringify(this.#session));
        console.log("SAVED SESSION");
    }

}