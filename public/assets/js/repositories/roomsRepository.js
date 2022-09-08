import { RequestManager } from "../utils/requestManager.js";

export class RoomsRepository {
    
    #route;
    #requestManager;

    constructor() {
        this.#route = "rooms";
        this.#requestManager = new RequestManager();
    }

    /**
     * get room info
     * 
     * @param {*} roomId 
     */
    async get(roomId) {
        return await this.#requestManager.get(`${this.#route}/${roomId}`);
    }

    /**
     * get all rooms and their info
     */
    async getAll() {
        // -1 = all rooms
        return await this.#requestManager.get(`${this.#route}/-1`);
    }

    /**
     * join chat room
     */
    async post(userId, roomId) {
        return await this.#requestManager.post(`${this.#route}/join/${roomId}`, {
            userId: userId
        });
    }
}

