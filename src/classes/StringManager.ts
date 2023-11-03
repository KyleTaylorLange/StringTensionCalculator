import { StringSeries } from './StringSeries.js'
import { StringState } from './StringState.js'
import { StringStateCollection } from './StringStateCollection.js'

export { StringManager }

/**
 * Singleton object that manages all StringSeries objects used throughout the program.
 */
class StringManager {
    private static _instance: StringManager
    private _stringSeries: StringSeries[]

    private constructor() {
        this._stringSeries = []
    }

    /**
     * Gets the StringManager instance. Creates it if it is not already created.
     * 
     * @returns The singleton StringManager instance.
     */
    public static getInstance(): StringManager {
        if (!StringManager._instance) {
            StringManager._instance = new StringManager()
        }

        return StringManager._instance
    }

    /**
     * Creates new StringSeries objects from JSON and appends them to the current array of StringSeries objects.
     * 
     * @param jsonData The JSON source of the new StringSeries objects.
     */
    public appendFromJson(jsonData: any) {
        this._stringSeries = this._stringSeries.concat(StringSeries.createFromJson(jsonData))
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
     * Get a base set of custom tuning strings.
     * 
     * @description Custom tuning.
     */
    public getCustomTuning(stringStates: StringState[]): StringStateCollection {
        return new StringStateCollection(stringStates)
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
