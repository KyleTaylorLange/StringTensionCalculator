import { StringInfo } from "./StringInfo.js"

export { StringCollection }

/**
 * Represents a collection of guitar strings with different gauges but with other shared characteristics.
 */
class StringCollection implements StringMake {
    private _brand: string
    private _type: string
    private _strings: StringInfo[]

    constructor(brand: string, type: string, strings: StringInfo[]) {
        this._brand = brand
        this._type = type
        this._strings = strings
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

    /**
     * Returns the first string matching the input gauge.
     *
     * @param {number} gauge The gauge to search for.
     * @returns {StringInfo} A string matching that gauge, or else the middle string in the collection.
     */
    public getStringByGauge(gauge: number): StringInfo {
        const last = this.strings.length - 1
        
        for (const i in this.strings) {
            if (this.strings[i].gauge === gauge) {
                return this.strings[i]
            }
        }

        return this.strings[Math.trunc(last / 2)]
    }

    /**
     * Gets the string before the input string in the collection.
     *
     * @param {StringInfo} strInfo A guitar string.
     * @returns {StringInfo} The previous string, or else the first string.
     */
    public getPreviousString(strInfo: StringInfo): StringInfo {
        const first = 0
        const last = this.strings.length - 1

        for (let i = last; i >= first; i--) {
            if (i === first || this.strings[first].gauge === strInfo.gauge) {
                return this.strings[first]
            }

            if (this.strings[i].gauge === strInfo.gauge) {
                return this.strings[i - 1]
            }
        }

        return this.strings[first]
    }

    /**
     * Gets the string after the input string in the collection.
     *
     * @param {StringInfo} strInfo A guitar string.
     * @returns {StringInfo} The next string, or else the last string.
     */
    public getNextString(strInfo: StringInfo): StringInfo {
        const first = 0
        const last = this.strings.length - 1

        for (let i = first; i <= last; i++) {
            if (i === last || this.strings[last].gauge === strInfo.gauge) {
                return this.strings[last]
            }

            if (this.strings[i].gauge === strInfo.gauge) {
                return this.strings[i + 1]
            }
        }

        return this.strings[last]
    }
}
