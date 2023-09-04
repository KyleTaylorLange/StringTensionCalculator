export { Utilities };
import { StringInfo } from './stringinfo.js';
import { StringCollection } from './stringcollection.js';

class Utilities {

	/**
	 * Create and return an element of a given type, with a given class name. Optional text content may be added.
	 * 
	 * @param {any} elementType 
	 * @param {any} className 
	 * @param {any} textContent
	 * 
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
		let stringWeightTablePL = new StringCollection("D'Addario", "Plain Steel");

		stringWeightTablePL.setStrings([
			new StringInfo(0.0070, 0.00001085),
			new StringInfo(0.0080, 0.00001418),
			new StringInfo(0.0085, 0.00001601),
			new StringInfo(0.0090, 0.00001794),
			new StringInfo(0.0095, 0.00001999),
			new StringInfo(0.0100, 0.00002215),
			new StringInfo(0.0105, 0.00002442),
			new StringInfo(0.0110, 0.00002680),
			new StringInfo(0.0115, 0.00002930),
			new StringInfo(0.0120, 0.00003190),
			new StringInfo(0.0130, 0.00003744),
			new StringInfo(0.0135, 0.00004037),
			new StringInfo(0.0140, 0.00004342),
			new StringInfo(0.0150, 0.00004984),
			new StringInfo(0.0160, 0.00005671),
			new StringInfo(0.0170, 0.00006402),
			new StringInfo(0.0180, 0.00007177),
			new StringInfo(0.0190, 0.00007997),
			new StringInfo(0.0200, 0.00008861),
			new StringInfo(0.0220, 0.00010722),
			new StringInfo(0.0240, 0.00012760),
			new StringInfo(0.0260, 0.00014975)
		]);

		return stringWeightTablePL;
	}

	/**
	 * Temporary function to return D'Addario XL Nickel Wound string unit weights.
	 * 
	 * @returns D'Addario XL Nickel Wound string unit weights.
	 */
	static getStringWeightTableNW() {
		let stringWeightTableNW = new StringCollection("D'Addario", "XL Nickel Wound");

		stringWeightTableNW.setStrings([
			new StringInfo(0.017, 0.00005524),
			new StringInfo(0.018, 0.00006215),
			new StringInfo(0.019, 0.00006947),
			new StringInfo(0.020, 0.00007495),
			new StringInfo(0.021, 0.00008293),
			new StringInfo(0.022, 0.00009184),
			new StringInfo(0.024, 0.00010857),
			new StringInfo(0.026, 0.00012671),
			new StringInfo(0.028, 0.00014666),
			new StringInfo(0.030, 0.00017236),
			new StringInfo(0.032, 0.00019347),
			new StringInfo(0.034, 0.00021590),
			new StringInfo(0.036, 0.00023964),
			new StringInfo(0.038, 0.00026471),
			new StringInfo(0.039, 0.00027932),
			new StringInfo(0.042, 0.00032279),
			new StringInfo(0.044, 0.00035182),
			new StringInfo(0.046, 0.00038216),
			new StringInfo(0.048, 0.00041382),
			new StringInfo(0.049, 0.00043014),
			new StringInfo(0.052, 0.00048109),
			new StringInfo(0.054, 0.00053838),
			new StringInfo(0.056, 0.00057598),
			new StringInfo(0.059, 0.00064191),
			new StringInfo(0.060, 0.00066542),
			new StringInfo(0.062, 0.00070697),
			new StringInfo(0.064, 0.00074984),
			new StringInfo(0.066, 0.00079889),
			new StringInfo(0.068, 0.00084614),
			new StringInfo(0.070, 0.00089304),
			new StringInfo(0.072, 0.00094124),
			new StringInfo(0.074, 0.00098869),
			new StringInfo(0.080, 0.00115011)
		]);

		return stringWeightTableNW;
	}
}