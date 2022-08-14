export class RequestManager {
    
    constructor() {

    }

    async get(url) {
        return await this.#doRequest("GET", url);
    }

    async post(url, data = {}) {
        return await this.#doRequest("POST", url, data);
    }

    async #doRequest(method, url, data = {}) {
        const defaultOptions = {
            method: method.toUpperCase(),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        };

        try {
            if (Object.entries(data).length != 0) {
                options.body = JSON.stringify(data);
            }

            const response = await fetch(url, options);
            if (response.ok) // ok response
                return await response.json();

            // if fail
            const jsonErrResponse = await response.json();
            let errorMsg = response.statusText;
            if ("reason" in jsonErrResponse) {
                errorMsg = jsonErrResponse.reason;
            }

            return this.#onFailedRequest(response.status, errorMsg);
        } catch (e) {
            return this.#onFailedRequest(-1, errorMsg); // TODO: fix the error code later bruh idc
        }
    }

    #onFailedRequest(code, error) {
        console.error(`(FAIL) [ERROR ${code}] ${error}`);
        return Promise.reject({code: errorCode, reason: error});
    }
}