import { StringMake } from "../interfaces/StringMake.js"
import { StringInfo } from "./StringInfo.js"

export { StringSeries }

/**
 * Represents a series of guitar strings that compose a specific set with shared characteristics.
 */
class StringSeries implements StringMake {
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
     * Take the series brand name and assign it to each guitar string brand.
     */
    public setBrandForStrings() {
        this.strings.forEach((str) => str.brand = this.brand)
    }

    /**
     * Take the series brand type and assign it to each guitar string type.
     */
    public setTypeForStrings() {
        this.strings.forEach((str) => str.type = this.type)
    }

    /**
     * Returns the string matching or nearest to the input gauge.
     *
     * @param {number} gauge The gauge to search for.
     * @returns {StringInfo} A string matching that gauge or the nearest gauge (default for nearest: middle gauge).
     */
    public getStringByGauge(gauge: number): StringInfo {
        const last = this.strings[this.strings.length - 1]
        const first = this.strings[0]

        let prev, curr, nearest = this.strings[Math.trunc((this.strings.length - 1) / 2)]

        // Check our first and last gauge immediately, primarily in case our gauge is out-of-range.
        if (gauge <= first.gauge) {
            return first
        }

        if (gauge >= last.gauge) {
            return last
        }

        /* 
         * Returning the match or else simply getting the nearest value.
         * Only checking second index through second-to-last index as we have already checked first/last.
         */
        for (let i = 1; i < this.strings.length - 1; i++) {
            if (this.strings[i].gauge === gauge) {
                return this.strings[i]
            }

            prev = this.strings[i  - 1]
            curr = this.strings[i]
        
            if (Math.abs(gauge - curr.gauge) < Math.abs(gauge - prev.gauge)) {
                nearest = curr
            }
        }

        return nearest
    }

    /**
     * Gets the string before the input string in the series.
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
     * Gets the string after the input string in the series.
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

    /**
     * Creates StringSeries instances from JSON.
     * 
     * @param {any} inJson The JSON to use for the StringSeries instances.
     * @returns An array of StringSeries objects. Array may be empty if none could be created.
     */
    public static createFromJson(inJson: any[]): StringSeries[] {
        let stringSeriesArray: StringSeries[] = []

        for (let i in inJson) {
            let brand = inJson[i].brand
            let type = inJson[i].type
            let stringsArray = inJson[i].strings

            if (brand != undefined && type != undefined && stringsArray != undefined) {
                let stringInfoArray: StringInfo[] = StringInfo.createFromJson(stringsArray)

                // Only bother to create the series if there's at least one StringInfo in it.
                if (stringInfoArray.length > 0) {
                    let stringSeries = new StringSeries(brand, type, stringInfoArray)

                    stringSeries.setBrandForStrings()
                    stringSeries.setTypeForStrings()
                    stringSeriesArray.push(stringSeries)
                }
            }
        }

        return stringSeriesArray
    }
}
