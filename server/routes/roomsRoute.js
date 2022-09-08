class RoomsRoute {
    
    #app;
    #route = "/rooms";
    #httpCodes = require("./utils/httpCodes")

    constructor(app) {
        this.#app = app;
        this.#handleRequests();
    }

    #getRoomData(roomId) {
        
    }

    #handleRequests() {
        this.#app.get(`${this.#route}/:roomId`, (req, res) => {
            try {
                let roomId = req.params.roomId;
                let data = this.#getRoomData(roomId);
                
                if (roomId === -1) {
                    data = [];
                    for (roomId = 1; roomId >= 1 || data != null; roomId++) {
                        data.push(this.#getRoomData(roomId));
                    }
                }

                res.status(this.#httpCodes.HTTP_OK).json({data: data});
            } catch (e) {
                res.status(this.#httpCodes.BAD_REQUEST).json({reason: e.toString()})
            }
        });
    }

}

module.exports = RoomsRoute;