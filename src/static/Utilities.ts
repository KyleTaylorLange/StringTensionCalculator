export { Utilities }

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
    public static createElement(elementType: any, className: any, textContent: any = null): any {
        let element = document.createElement(elementType)

        element.classList.add(className)

        if (textContent !== null) {
            element.textContent = textContent
        }

        return element
    }

    /**
     * Gets JSON data.
     * 
     * @param {string} filename The name of the JSON file (without the extension).
     * @returns {Promise} The promise with the JSON data.
     */
    public static async getJson(filename: string): Promise<any> {
        const res = await fetch(`/json/${filename}.json`)

        if (!res.ok) {
            throw new Error("Status :: " + res.status)
        }

        return await res.json()
    }
}
