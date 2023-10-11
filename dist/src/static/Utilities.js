export { Utilities };
class Utilities {
    /**
     * Create and return an element of a given type, with a given class name. Optional text content may be added.
     *
     * @param {any} elementType The type of the element.
     * @param {any} className The class name assigned to the element.
     * @param {any} [textContent] Text content to be added to the element, if any.
     *
     * @returns The element.
     */
    static createElement(elementType, className, textContent = null) {
        let element = document.createElement(elementType);
        element.classList.add(className);
        if (textContent !== null) {
            element.textContent = textContent;
        }
        return element;
    }
    /**
     * Gets JSON.
     *
     * @param {string} filename
     */
    static getJson(filename) {
        return fetch(`/json/${filename}.json`)
            .then(res => {
            if (!res.ok) {
                throw new Error("Status :: " + res.status);
            }
            return res.json();
        });
    }
    /**
     * Callback for Utilities.getJson.
     *
     * @param {string} filename
     */
    static async getJsonResult(filename) {
        return await Utilities.getJson(filename).then(result => result.series);
    }
}
