const SERVER_PORT = process.env.PORT || 3000;
global.appPath = process.env.APP || "./";
global.frontEndPath = process.env.FRONTEND || "../public/";

const app = require("./app");
app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}`);
});
