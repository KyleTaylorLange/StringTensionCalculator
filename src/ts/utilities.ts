import { StringInfo } from "./stringinfo.js"
import { StringCollection } from "./stringcollection.js"

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
    static createElement(elementType: any, className: any, textContent: any = null) {
        let element = document.createElement(elementType)

        element.classList.add(className)

        if (textContent !== null) {
            element.textContent = textContent
        }

        return element
    }
}
