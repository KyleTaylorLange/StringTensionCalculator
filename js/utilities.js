export { Utilities };

class Utilities {

	/**
	 * Create and return an element of a given type, with a given class name. Optional text content may be added.
	 * 
	 * @param {*} elementType 
	 * @param {*} className 
	 * @param {*} textContent
	 * @returns 
	 */
	static createElement(elementType, className, textContent = null) {
		let element = document.createElement(elementType)
		element.classList.add(className)

		if (textContent !== null) {
			element.textContent = textContent
		}

		return element
	}
}