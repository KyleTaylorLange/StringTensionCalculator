import { StringInfo } from "./StringInfo.js";
export { StringCollection };
/**
 * Represents a collection of guitar strings with different gauges but with other shared characteristics.
 */
class StringCollection {
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
    }
    /**
     * Take the collection brand name and assign it to each guitar string brand.
     */
    setBrandForStrings() {
        this.strings.forEach((str) => str.brand = this.brand);
    }
    /**
     * Take the collection brand type and assign it to each guitar string type.
     */
    setTypeForStrings() {
        this.strings.forEach((str) => str.type = this.type);
    }
    // TODO: The following methods are now quite ugly and need to be refactored. We shouldn't be relying
    //       on a dummy object in order for the function to not return a union type of StringInfo | undefined.
    //
    //       We can resolve this by explicitly requiring an arg type (for object construction) that contain brands/string
    //       rather than passing them in as strings. And then these can be required in the methods.
    /**
     * Returns the first string with the input gauge.
     *
     * @param {number} gauge The gauge to search for.
     * @returns {StringInfo} A string matching that gauge.
     */
    getStringByGauge(gauge) {
        let strFound = new StringInfo(0, 0);
        for (const i in this.strings) {
            if (this.strings[i].gauge == gauge) {
                strFound = this.strings[i];
                break;
            }
            if (this.strings[i].gauge != gauge && this.strings.length - 1 == Number(i)) {
                strFound = this.strings[i];
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
        let prev = new StringInfo(0, 0);
        const first = 0;
        const last = this.strings.length - 1;
        for (let i = last; i >= first; i--) {
            if (i === first || this.strings[first].gauge === strInfo.gauge) {
                return this.strings[first];
            }
            if (this.strings[i].gauge === strInfo.gauge) {
                return this.strings[i - 1];
            }
        }
        return prev;
    }
    /**
     * Gets the string after the input string in the collection.
     *
     * @param {StringInfo} strInfo A guitar string.
     * @returns {StringInfo} The string after strInfo.
     */
    getNextString(strInfo) {
        let next = new StringInfo(0, 0);
        const first = 0;
        const last = this.strings.length - 1;
        for (let i = first; i <= last; i++) {
            if (i === last || this.strings[last].gauge === strInfo.gauge) {
                return this.strings[last];
            }
            if (this.strings[i].gauge === strInfo.gauge) {
                return this.strings[i + 1];
            }
        }
        return next;
    }
}
