import { StringSeries } from './StringSeries.js';
import { StringState } from './StringState.js';
import { StringStateCollection } from './StringStateCollection.js';
export { StringManager };
/**
 * Singleton object that manages all StringSeries objects used throughout the program.
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
    /**
     * Gets a default array of StringInfo objects.
     *
     * @returns Default StringInfo item array (i.e. default string set).
     */
    getDefaultStringInfoArray() {
        return [
            this.getSeriesByBrandAndType("D'Addario", "Plain Steel").getStringByGauge(0.01),
            this.getSeriesByBrandAndType("D'Addario", "Plain Steel").getStringByGauge(0.013),
            this.getSeriesByBrandAndType("D'Addario", "Plain Steel").getStringByGauge(0.017),
            this.getSeriesByBrandAndType("D'Addario", "XL Nickel Wound").getStringByGauge(0.026),
            this.getSeriesByBrandAndType("D'Addario", "XL Nickel Wound").getStringByGauge(0.036),
            this.getSeriesByBrandAndType("D'Addario", "XL Nickel Wound").getStringByGauge(0.046),
            this.getSeriesByBrandAndType("D'Addario", "XL Nickel Wound").getStringByGauge(0.059),
            this.getSeriesByBrandAndType("D'Addario", "XL Nickel Wound").getStringByGauge(0.074)
        ];
    }
    /**
     * Get a base set of standard tuning strings. Default string set is provided by getDefaultStringInfoArray().
     *
     * @description Base tuning function.
     * @returns A new StringStateCollection representing the tuning.
     */
    getStandardTuning(strInfoArray = this.getDefaultStringInfoArray()) {
        let stringStates = [];
        let noteNumbers = [64, 59, 55, 50, 45, 40, 35, 30];
        let scaleLength = 25.5;
        for (let i = 0; i < strInfoArray.length; i++) {
            stringStates.push(new StringState(noteNumbers[i], scaleLength, strInfoArray[i]));
        }
        return new StringStateCollection(stringStates);
    }
}
