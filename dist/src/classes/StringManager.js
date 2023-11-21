import { StringSeries } from './StringSeries.js';
import { StringSet } from './StringSet.js';
import { StringState } from './StringState.js';
import { StringStateCollection } from './StringStateCollection.js';
export { StringManager };
/**
 * Singleton object that manages strings used throughout the program.
 */
class StringManager {
    constructor() {
        this._stringSeries = [];
    }
    static get instance() {
        return StringManager._instance;
    }
    static set instance(value) {
        StringManager._instance = value;
    }
    get stringSeries() {
        return this._stringSeries;
    }
    set stringSeries(value) {
        this._stringSeries = value;
    }
    /**
     * Gets the StringManager instance. Creates it if it is not already created.
     *
     * @returns The singleton StringManager instance.
     */
    static getInstance() {
        if (!StringManager.instance) {
            StringManager.instance = new StringManager();
        }
        return StringManager.instance;
    }
    /**
     * Creates new StringSeries objects from JSON and appends them to the current array of StringSeries objects.
     *
     * @param jsonData The JSON source of the new StringSeries objects.
     */
    appendFromJson(jsonData) {
        this.stringSeries = this.stringSeries.concat(StringSeries.createFromJson(jsonData));
    }
    /**
     * Get a base set of standard tuning strings. Default string set is provided by getDefaultStringInfoArray().
     *
     * @description Base tuning function.
     * @returns A new StringStateCollection representing the tuning.
     */
    getStandardTuning(strInfoArray = StringSet.getDefaultStrings()) {
        let stringStates = [];
        let noteNumbers = [64, 59, 55, 50, 45, 40, 35, 30];
        let scaleLength = 25.5;
        for (let i = 0; i < strInfoArray.length; i++) {
            stringStates.push(new StringState(noteNumbers[i], scaleLength, strInfoArray[i]));
        }
        return new StringStateCollection(stringStates);
    }
    /**
     * Gets a series by guitar string and string type.
     *
     * @param {string} brand
     * @param {string} type
     * @returns A string series.
     */
    getSeriesByBrandAndType(brand, type) {
        for (let i = 0; i < this.stringSeries.length; i++) {
            if (this.stringSeries[i].brand === brand && this.stringSeries[i].type === type) {
                return this.stringSeries[i];
            }
        }
        return new StringSeries("Undefined", "Guitar String", []);
    }
}
