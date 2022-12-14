import {HomeController} from "./controllers/homeController.js";
import {NavbarController} from "./controllers/navbarController.js";
import { RoomsController } from "./controllers/roomsController.js";
import {SessionManager} from "./utils/sessionManager.js";

export class App {
    
    // controllers
    static CONTROLLER_NAVBAR = "navbar";
    static CONTROLLER_FOOTER = "footer";
    static CONTROLLER_HOME = "home";
    static CONTROLLER_ROOMS = "rooms";

    // session manager
    static sessionManager = new SessionManager();

    constructor() {
        console.log("LOAD: App");
        
        // load defaults
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
                
            case App.CONTROLLER_ROOMS:
                new RoomsController();
                break;

            default:
                return false;
        }
        return true;
    }

    static loadControllerFromUrl(fallbackController) {
        const currentController = App.getCurrentController();

        if (currentController && !App.loadController(currentController)) {
            App.loadController(fallbackController);
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
