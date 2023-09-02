export { Utilities };
import { StringInfo } from './stringinfo.js'

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

	/**
	 * Temporary function to return D'Addario Plain Steel string unit weights.
	 * 
	 * @returns D'Addario Plain Steel string unit weights.
	 */
	static getStringWeightTablePL() {
		return {
			name: "Plain Steel",
			weights: {
				0.0070: new StringInfo(0.0070, 0.00001085),
				0.0080: new StringInfo(0.0080, 0.00001418),
				0.0085: new StringInfo(0.0085, 0.00001601),
				0.0090: new StringInfo(0.0090, 0.00001794),
				0.0095: new StringInfo(0.0095, 0.00001999),
				0.0100: new StringInfo(0.0100, 0.00002215),
				0.0105: new StringInfo(0.0105, 0.00002442),
				0.0110: new StringInfo(0.0110, 0.00002680),
				0.0115: new StringInfo(0.0115, 0.00002930),
				0.0120: new StringInfo(0.0120, 0.00003190),
				0.0130: new StringInfo(0.0130, 0.00003744),
				0.0135: new StringInfo(0.0135, 0.00004037),
				0.0140: new StringInfo(0.0140, 0.00004342),
				0.0150: new StringInfo(0.0150, 0.00004984),
				0.0160: new StringInfo(0.0160, 0.00005671),
				0.0170: new StringInfo(0.0170, 0.00006402),
				0.0180: new StringInfo(0.0180, 0.00007177),
				0.0190: new StringInfo(0.0190, 0.00007997),
				0.0200: new StringInfo(0.0200, 0.00008861),
				0.0220: new StringInfo(0.0220, 0.00010722),
				0.0240: new StringInfo(0.0240, 0.00012760),
				0.0260: new StringInfo(0.0260, 0.00014975)
			}
		};
	}

	/**
	 * Temporary function to return D'Addario XL Nickel Wound string unit weights.
	 * 
	 * @returns D'Addario XL Nickel Wound string unit weights.
	 */
	static getStringWeightTableNW() {
		return {
			name: "XL Nickel Wound",
			weights: {
				0.017: new StringInfo(0.017, 0.00005524),
				0.018: new StringInfo(0.018, 0.00006215),
				0.019: new StringInfo(0.019, 0.00006947),
				0.020: new StringInfo(0.020, 0.00007495),
				0.021: new StringInfo(0.021, 0.00008293),
				0.022: new StringInfo(0.022, 0.00009184),
				0.024: new StringInfo(0.024, 0.00010857),
				0.026: new StringInfo(0.026, 0.00012671),
				0.028: new StringInfo(0.028, 0.00014666),
				0.030: new StringInfo(0.030, 0.00017236),
				0.032: new StringInfo(0.032, 0.00019347),
				0.034: new StringInfo(0.034, 0.00021590),
				0.036: new StringInfo(0.036, 0.00023964),
				0.038: new StringInfo(0.038, 0.00026471),
				0.039: new StringInfo(0.039, 0.00027932),
				0.042: new StringInfo(0.042, 0.00032279),
				0.044: new StringInfo(0.044, 0.00035182),
				0.046: new StringInfo(0.046, 0.00038216),
				0.048: new StringInfo(0.048, 0.00041382),
				0.049: new StringInfo(0.049, 0.00043014),
				0.052: new StringInfo(0.052, 0.00048109),
				0.054: new StringInfo(0.054, 0.00053838),
				0.056: new StringInfo(0.056, 0.00057598),
				0.059: new StringInfo(0.059, 0.00064191),
				0.060: new StringInfo(0.060, 0.00066542),
				0.062: new StringInfo(0.062, 0.00070697),
				0.064: new StringInfo(0.064, 0.00074984),
				0.066: new StringInfo(0.066, 0.00079889),
				0.068: new StringInfo(0.068, 0.00084614),
				0.070: new StringInfo(0.070, 0.00089304),
				0.072: new StringInfo(0.072, 0.00094124),
				0.074: new StringInfo(0.074, 0.00098869),
				0.080: new StringInfo(0.080, 0.00115011)
			}
		};
	}
}