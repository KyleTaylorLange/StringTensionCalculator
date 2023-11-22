import { StringInfo } from "./StringInfo.js"
import { StringSeries } from "./StringSeries.js"
import { StringSet } from "./StringSet.js"
import { StringState } from "./StringState.js"
import { StringStateCollection } from "./StringStateCollection.js"

export { StringManager }

/**
 * Singleton object that manages strings used throughout the program.
 */
class StringManager {
    private static _instance: StringManager
    private _stringSeries: StringSeries[]

    protected constructor() {
        this._stringSeries = []
    }

    public static get instance(): StringManager {
        return StringManager._instance
    }

    public static set instance(value: StringManager) {
        StringManager._instance = value
    }

    public get stringSeries(): StringSeries[] {
        return this._stringSeries
    }

    public set stringSeries(value: StringSeries[]) {
        this._stringSeries = value
    }

    /**
     * Gets the StringManager instance. Creates it if it is not already created.
     * 
     * @returns The singleton StringManager instance.
     */
    public static getInstance(): StringManager {
        if (!StringManager.instance) {
            StringManager.instance = new StringManager()
        }

        return StringManager.instance
    }

    /**
     * Creates new StringSeries objects from JSON and appends them to the current array of StringSeries objects.
     * 
     * @param jsonData The JSON source of the new StringSeries objects.
     */
    public appendFromJson(jsonData: any) {
        this.stringSeries = this.stringSeries.concat(StringSeries.createFromJson(jsonData))
    }

    /** 
     * Get a base set of standard tuning strings. Default string set is provided by getDefaultStringInfoArray().
     * 
     * @description Base tuning function.
     * @returns A new StringStateCollection representing the tuning.
     */
    public getStandardTuning(strInfoArray: StringInfo[] = StringSet.getDefaultStrings()): StringStateCollection {
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
        for (let i = 0; i < this.stringSeries.length; i++) {
            if (this.stringSeries[i].brand === brand && this.stringSeries[i].type === type) {
                return this.stringSeries[i]
            }
        }

        return new StringSeries("Undefined", "Guitar String", [])
    }
}
