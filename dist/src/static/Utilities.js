export { Utilities };
class Utilities {
    /**
     * Create and return an element of a given type, with a given class name. Optional text content may be added.
     *
     * @param {any} elementType The type of the element.
     * @param {any} classNames The class name(s) assigned to the element. If multiple, separate by spaces.
     * @param {any} [textContent] Text content to be added to the element, if any.
     *
     * @returns The element.
     */
    static createElement(elementType, classNames, textContent = null) {
        let element = document.createElement(elementType);
        let classes = classNames.split(' ');
        for (let className of classes) {
            if (className) {
                element.classList.add(className);
            }
        }
        if (textContent !== null) {
            element.textContent = textContent;
        }
        return element;
    }
    /**
     * Gets JSON data.
     *
     * @param {string} filename The name of the JSON file (without the extension).
     * @returns {Promise} The promise with the JSON data.
     */
    static async getJson(filename) {
        let res;
        if (document.URL === 'https://kyletaylorlange.github.io/StringTensionCalculator/') {
            res = await fetch(`/StringTensionCalculator/dist/json/${filename}.json`);
        }
        else {
            res = await fetch(`/dist/json/${filename}.json`);
        }
        if (!res.ok) {
            throw new Error("Status :: " + res.status);
        }
        return await res.json();
    }
}
