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
    /**
     * Returns the first string matching the input gauge.
     *
     * @param {number} gauge The gauge to search for.
     * @returns {StringInfo} A string matching that gauge, or else the middle string in the collection.
     */
    getStringByGauge(gauge) {
        const last = this.strings.length - 1;
        for (const i in this.strings) {
            if (this.strings[i].gauge == gauge) {
                return this.strings[i];
            }
        }
        return this.strings[Math.trunc(last / 2)];
    }
    /**
     * Gets the string before the input string in the collection.
     *
     * @param {StringInfo} strInfo A guitar string.
     * @returns {StringInfo} The previous string, or else the first string.
     */
    getPreviousString(strInfo) {
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
        return this.strings[first];
    }
    /**
     * Gets the string after the input string in the collection.
     *
     * @param {StringInfo} strInfo A guitar string.
     * @returns {StringInfo} The next string, or else the last string.
     */
    getNextString(strInfo) {
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
        return this.strings[last];
    }
}
