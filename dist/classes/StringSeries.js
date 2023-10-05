import { StringInfo } from "./StringInfo.js";
export { StringSeries };
/**
 * Represents a series of guitar strings that compose a specific set with shared characteristics.
 */
class StringSeries {
    constructor(brand, type, strings) {
        this._brand = brand;
        this._type = type;
        this._strings = strings;
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
     * Take the series brand name and assign it to each guitar string brand.
     */
    setBrandForStrings() {
        this.strings.forEach((str) => str.brand = this.brand);
    }
    /**
     * Take the series brand type and assign it to each guitar string type.
     */
    setTypeForStrings() {
        this.strings.forEach((str) => str.type = this.type);
    }
    /**
     * Returns the first string matching the input gauge.
     *
     * @param {number} gauge The gauge to search for.
     * @returns {StringInfo} A string matching that gauge, or else the middle string in the series.
     */
    getStringByGauge(gauge) {
        const last = this.strings.length - 1;
        for (const i in this.strings) {
            if (this.strings[i].gauge === gauge) {
                return this.strings[i];
            }
        }
        return this.strings[Math.trunc(last / 2)];
    }
    /**
     * Gets the string before the input string in the series.
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
     * Gets the string after the input string in the series.
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
    /**
     * Creates StringSeries instances from JSON.
     *
     * @param {any} inJson The JSON to use for the StringSeries instances.
     * @returns An array of StringSeries objects. Array may be empty if none could be created.
     */
    static createFromJson(inJson) {
        let stringSeriesArray = [];
        if (inJson.series == undefined) {
            return [];
        }
        for (let i in inJson.series) {
            let brand = inJson.series[i].brand;
            let type = inJson.series[i].type;
            let stringsArray = inJson.series[i].strings;
            if (brand != undefined && type != undefined && stringsArray != undefined) {
                let stringInfoArray = StringInfo.createFromJson(stringsArray);
                // Only bother to create the series if there's at least one StringInfo in it.
                if (stringInfoArray.length > 0) {
                    let stringSeries = new StringSeries(brand, type, stringInfoArray);
                    stringSeries.setBrandForStrings();
                    stringSeries.setTypeForStrings();
                    stringSeriesArray.push(stringSeries);
                }
            }
        }
        return stringSeriesArray;
    }
}
