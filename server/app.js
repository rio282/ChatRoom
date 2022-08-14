const express = require("express");
const path = require("path");
const fs = require("fs");
const httpCodes = require("./routes/utils/httpCodes"); // TODO: maybe change this location
const app = express();

// use frontend when we visit website
app.use(express.static(path.join(__dirname, "../public")));

// use json reqs
app.use(express.json());

const routesPath = __dirname + "/routes/";
fs.readdirSync(routesPath).forEach(file => {
    if (file.endsWith(".js")) {
        const filename = file.replace(".js", "");
        
        // add route to exports
        exports[filename] = require(path.join(routesPath, filename));

        // check if route is a class (function)
        if (typeof exports[filename] === "function") {
            new exports[filename](app); // init class constructor
            console.log(`(OK) Instantiated route: ${filename}`);
        } else {
            console.log(`(FAIL) Could NOT instantiate route: ${filename}`);
        }
    }
});


// keep this at the bottom for unresolved requests
app.get("*", (_req, res) => {
    res.status(httpCodes.ROUTE_NOT_FOUND).json({reason: "Route not found."});
});

module.exports = app;