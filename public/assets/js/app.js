import {HomeController} from "./controllers/homeController.js";
import {NavbarController} from "./controllers/navbarController.js";
import { RoomController } from "./controllers/roomController.js";
import {SessionManager} from "./utils/sessionManager.js";

export class App {
    
    // controllers
    static CONTROLLER_NAVBAR = "navbar";
    static CONTROLLER_FOOTER = "footer";
    static CONTROLLER_HOME = "home";
    static CONTROLLER_ROOM = "room";

    // session manager
    static sessionManager = new SessionManager();

    constructor() {
        console.log("LOAD: App");
        
        App.loadController(App.CONTROLLER_NAVBAR);
        App.loadController(App.CONTROLLER_FOOTER);
        App.loadControllerFromUrl(App.CONTROLLER_HOME);
    }

    static loadController(controllerName, controllerData = {}) {
        console.log(`LOAD CONTROLLER: ${controllerName}`);

        // load correct controller
        switch (controllerName) {
            case App.CONTROLLER_NAVBAR:
                new NavbarController();
                break;

            case App.CONTROLLER_FOOTER:
                // new FooterController();
                break;

            case App.CONTROLLER_HOME:
                new HomeController();
                break;
                
            case App.CONTROLLER_ROOM:
                new RoomController();
                break;

            default:
                return false;
        }
        return true;
    }

    static loadControllerFromUrl(fallbackController) {
        const currentController = App.getCurrentController();

        if (currentController) {
            if (!App.loadController(currentController)) {
                App.loadController(fallbackController);
            }
        } else {
            App.loadController(fallbackController);
        }
    }

    static getCurrentController() {
        return location.hash.slice(1);
    }
}

window.addEventListener("DOMContentLoaded", _ => {
    new App();
});
