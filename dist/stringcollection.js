import { StringInfo } from "./stringinfo.js";
export { StringCollection };
/**
 * Represents a collection of guitar strings with different gauges but with other shared characteristics.
 */
class StringCollection {
    // TODO: Refactor this - poor practice for default class properties (just a quick fix temporarily
    //       to allow for a default initialization of 'collection' in StringInfo).
    constructor(brand = "", type = "") {
        this._brand = brand;
        this._type = type;
        this._strings = [];
    }
    get brand() {
        return this._brand;
    }
    set brand(value) {
        this._brand = value;
    }
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }
    get strings() {
        return this._strings;
    }
    set strings(value) {
        this._strings = value;
        this.strings.forEach((str) => str.collection = this);
    }
    // TODO: The following methods are now quite ugly and need to be refactored. We shouldn't be relying
    //       on a dummy object in order for the function to not return a union type of StringInfo | undefined.
    /**
     * Returns the first string with the input gauge.
     *
     * @param {number} gauge The gauge to search for.
     * @returns {StringInfo} A string matching that gauge.
     */
    getStringByGauge(gauge) {
        let strFound = new StringInfo(0, 0);
        for (let str of this.strings) {
            if (str.gauge == gauge) {
                strFound = str;
            }
        }
        return strFound;
    }
    /**
     * Gets the string before the input string in the collection.
     *
     * @param {StringInfo} strInfo A guitar string.
     * @returns {StringInfo} The string before strInfo if both exist.
     */
    getPreviousString(strInfo) {
        let strPrev = new StringInfo(0, 0);
        for (let i = 1; i < this.strings.length; i++) {
            if (this.strings[i].gauge == strInfo.gauge) {
                strPrev = this.strings[i - 1];
            }
        }
        return strPrev;
    }
    /**
     * Gets the string after the input string in the collection.
     *
     * @param {StringInfo} strInfo A guitar string.
     * @returns {StringInfo} The string after strInfo.
     */
    getNextString(strInfo) {
        const endpoint = this.strings.length - 1;
        let strNext = new StringInfo(0, 0);
        for (let i = 0; i < endpoint; i++) {
            if (this.strings[i].gauge == strInfo.gauge) {
                strNext = this.strings[i + 1];
            }
        }
        return strNext;
    }
}
