import { StringInfo } from "./stringinfo.js"

export { StringCollection }

/**
 * Represents a collection of guitar strings with different gauges but with other shared characteristics.
 */
class StringCollection {
    brand: string
    type: string
    strings: StringInfo[]

    // TODO: Refactor this poor pracftice for default class properties (just a quick fix temporarily
    //       to allow for a default initialization of 'collection' in StringInfo.
    constructor(brand: string = "", type: string = "") {
        this.brand = brand
        this.type = type
        this.strings = []
    }

    setStrings(strings: StringInfo[]) {
        this.strings = strings
        strings.forEach((str) => str.setCollection(this))
    }

    // TODO: The following methods are now quite ugly and need to be refactored. We shouldn't be relying
    //       on a dummy object in order for the function to not return a union tpye of StringInfo | undefined.

    /**
     * Returns the first string with the input gauge.
     *
     * @param {number} gauge The gauge to search for.
     * @returns {StringInfo} A string matching that gauge.
     */
    getStringByGauge(gauge: number): StringInfo {
        let strFound = new StringInfo(0, 0)

        for (let str of this.strings) {
            if (str.gauge == gauge) {
                strFound = str
            }
        }

        return strFound
    }

    /**
     * Gets the string before the input string in the collection.
     *
     * @param {StringInfo} StringInfo
     * @returns {StringInfo} The string before strInfo if both exist.
     */
    getPreviousString(strInfo: StringInfo): StringInfo {
        let strPrev = new StringInfo(0, 0)

        for (let i = 1; i < this.strings.length; i++) {
            if (this.strings[i].gauge == strInfo.gauge) {
                strPrev = this.strings[i - 1]
            }
        }

        return strPrev
    }

    /**
     * Gets the string after the input string in the collection.
     *
     * @param {StringInfo} StringInfo
     * @returns {StringInfo} The string after strInfo.
     */
    getNextString(strInfo: StringInfo): StringInfo {
        const endpoint = this.strings.length - 1
        let strNext = new StringInfo(0, 0)

        for (let i = 0; i < endpoint; i++) {
            if (this.strings[i].gauge == strInfo.gauge) {
                strNext = this.strings[i + 1]
            }
        }

        return strNext
    }
}
