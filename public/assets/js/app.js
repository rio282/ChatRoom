import {HomeController} from "./controllers/homeController.js";

export class App {
    
    // controllers
    static CONTROLLER_HOME = "home";
    static CONTROLLER_NAVBAR = "navbar";
    static CONTROLLER_FOOTER = "footer";

    constructor() {
        console.log("LOAD: App");
        
        App.loadControllerFromUrl(App.CONTROLLER_HOME);
    }


    static loadController(controllerName, controllerData = {}) {
        console.log(`LOAD CONTROLLER: ${controllerName}`);

        // load correct controller
        switch (controllerName) {
            case App.CONTROLLER_NAVBAR:
                // new NavbarController();
                break;

            case App.CONTROLLER_FOOTER:
                // new FooterController();
                break;

            case App.CONTROLLER_HOME:
                new HomeController();
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
