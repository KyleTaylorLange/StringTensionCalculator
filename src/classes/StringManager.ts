import { StringSeries } from "./StringSeries.js"
import { StringState } from "./StringState.js"
import { StringStateCollection } from "./StringStateCollection.js"

export { StringManager }

/**
 * Manages all StringSeries objects used for all StringTables in the program.
 */
class StringManager {
    private _jsonData: any
    private _stringSeries: StringSeries[]

    constructor(jsonData: any) {
        this._jsonData = jsonData
        this._stringSeries = StringSeries.createFromJson(jsonData)
    }

    public get jsonData(): any {
        return this._jsonData
    }

    public set jsonData(value: any) {
        this._jsonData = value
    }

    public get stringSeries(): StringSeries[] | undefined {
        return this._stringSeries
    }
    
    public set stringSeries(value: StringSeries[]) {
        this._stringSeries = value
    }

    /** 
     * Get a base set of standard tuning strings.
     * 
     * @description Standard tuning.
     */
    public getStandardTuning(): StringStateCollection {
        return new StringStateCollection([
            new StringState(
                64,
                25.5,
                this.getSeriesByBrandAndType("D'Addario", "Plain Steel").getStringByGauge(0.01)
            ),
            new StringState(
                59,
                25.5,
                this.getSeriesByBrandAndType("D'Addario", "Plain Steel").getStringByGauge(0.013)
            ),
            new StringState(
                55,
                25.5,
                this.getSeriesByBrandAndType("D'Addario", "Plain Steel").getStringByGauge(0.017)
            ),
            new StringState(
                50,
                25.5,
                this.getSeriesByBrandAndType("D'Addario", "XL Nickel Wound").getStringByGauge(0.026)
            ),
            new StringState(
                45,
                25.5,
                this.getSeriesByBrandAndType("D'Addario", "XL Nickel Wound").getStringByGauge(0.036)
            ),
            new StringState(
                40,
                25.5,
                this.getSeriesByBrandAndType("D'Addario", "XL Nickel Wound").getStringByGauge(0.046)
            ),
            new StringState(
                35,
                25.5,
                this.getSeriesByBrandAndType("D'Addario", "XL Nickel Wound").getStringByGauge(0.059)
            ),
            new StringState(
                30,
                25.5,
                this.getSeriesByBrandAndType("D'Addario", "XL Nickel Wound").getStringByGauge(0.074)
            )
        ])
    }
    
    /**
     * Gets a series by guitar string and string type.
     * 
     * @param {string} brand 
     * @param {string} type 
     * @returns A string series.
     */
    public getSeriesByBrandAndType(brand: string, type: string): StringSeries {
        for (let i = 0; i < this._stringSeries.length; i++) {
            if (this._stringSeries[i].brand === brand && this._stringSeries[i].type === type) {
                return this._stringSeries[i]
            }
        }

        return new StringSeries("Undefined", "Guitar String", [])
    }
}
