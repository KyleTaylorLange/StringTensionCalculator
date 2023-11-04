import { StringInfo } from './StringInfo.js'
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
     * Gets a default array of StringInfo objects (i.e. strings).
     * 
     * @returns Default string info array.
     */
    public getDefaultStringInfoArray() {
        return [
            this.getSeriesByBrandAndType("D'Addario", "Plain Steel").getStringByGauge(0.01),
            this.getSeriesByBrandAndType("D'Addario", "Plain Steel").getStringByGauge(0.013),
            this.getSeriesByBrandAndType("D'Addario", "Plain Steel").getStringByGauge(0.017),
            this.getSeriesByBrandAndType("D'Addario", "XL Nickel Wound").getStringByGauge(0.026),
            this.getSeriesByBrandAndType("D'Addario", "XL Nickel Wound").getStringByGauge(0.036),
            this.getSeriesByBrandAndType("D'Addario", "XL Nickel Wound").getStringByGauge(0.046),
            this.getSeriesByBrandAndType("D'Addario", "XL Nickel Wound").getStringByGauge(0.059),
            this.getSeriesByBrandAndType("D'Addario", "XL Nickel Wound").getStringByGauge(0.074)
        ]
    }

    /** 
     * Get a base set of standard tuning strings.
     * 
     * Default string set is provided by getDefaultStringInfoArray().
     * 
     * @description Base tuning function.
     */
    public getStandardTuning(strInfoArray: StringInfo[] = this.getDefaultStringInfoArray()): StringStateCollection {
        let stringStates = []
        let noteNumbers = [64, 59, 55, 50, 45, 40, 35, 30]
        let scaleLength = 25.5

        for (let i = 0; i < strInfoArray.length; i++) {
            stringStates.push(new StringState(
                noteNumbers[i],
                scaleLength,
                strInfoArray[i]
            ))
        }

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
