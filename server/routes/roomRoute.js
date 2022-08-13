class RoomRoute {
    
    #app;
    #route = "/room";
    #httpCodes = require("./utils/httpCodes")

    constructor(app) {
        this.#app = app;
        this.#handleRequests();
    }

    #handleRequests() {
        this.#app.get(`${this.#route}`, (req, res) => {
            try {

                res.status(this.#httpCodes.HTTP_OK).json({success: "yes"});
            } catch (e) {
                res.status(this.#httpCodes.BAD_REQUEST).json({reason: e.toString()})
            }
        });
    }

}

module.exports = RoomRoute;