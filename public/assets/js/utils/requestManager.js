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

        let errorMsg = "";
        let responseCode = 400;
        try {
            if (Object.entries(data).length != 0) {
                defaultOptions.body = JSON.stringify(data);
            }

            // do request
            const response = await fetch(url, defaultOptions);
            if (response.ok) // ok response
                return await response.json();

            // if fail
            const jsonErrResponse = await response.json();
            errorMsg = response.statusText;
            responseCode = response.status;
            if ("reason" in jsonErrResponse) {
                errorMsg = jsonErrResponse.reason;
            }

            return this.#onFailedRequest(responseCode, errorMsg);
        } catch (e) {
            return this.#onFailedRequest(responseCode, e.toString());
        }
    }

    #onFailedRequest(code, error) {
        console.error(`(FAIL) [ERROR ${code}] ${error}`);
        return Promise.reject({code: code, reason: error});
    }
}