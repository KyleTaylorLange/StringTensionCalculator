import { StringInfo } from "./StringInfo.js"

export { StringCollection }

/**
 * Represents a collection of guitar strings with different gauges but with other shared characteristics.
 */
class StringCollection implements StringMake {
    private _brand: string
    private _type: string
    private _strings: StringInfo[]

    constructor(brand: string = "", type: string = "") {
        this._brand = brand
        this._type = type
        this._strings = []
    }

    public get brand(): string {
        return this._brand
    }

    public set brand(value: string) {
        this._brand = value
    }

    public get type(): string {
        return this._type
    }

    public set type(value: string) {
        this._type = value
    }

    public get strings(): StringInfo[] {
        return this._strings
    }

    public set strings(value: StringInfo[]) {
        this._strings = value
    }

    /**
     * Take the collection brand name and assign it to each guitar string brand.
     */
    public setBrandForStrings() {
        this.strings.forEach((str) => str.brand = this.brand)
    }

    /**
     * Take the collection brand type and assign it to each guitar string type.
     */
    public setTypeForStrings() {
        this.strings.forEach((str) => str.type = this.type)
    }

    // TODO: The following methods are now quite ugly and need to be refactored. We shouldn't be relying
    //       on a dummy object in order for the function to not return a union type of StringInfo | undefined.

    /**
     * Returns the first string with the input gauge.
     *
     * @param {number} gauge The gauge to search for.
     * @returns {StringInfo} A string matching that gauge.
     */
    public getStringByGauge(gauge: number): StringInfo {
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
     * @param {StringInfo} strInfo A guitar string.
     * @returns {StringInfo} The string before strInfo if both exist.
     */
    public getPreviousString(strInfo: StringInfo): StringInfo {
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
     * @param {StringInfo} strInfo A guitar string.
     * @returns {StringInfo} The string after strInfo.
     */
    public getNextString(strInfo: StringInfo): StringInfo {
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
