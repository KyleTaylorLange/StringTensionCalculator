import { StringSeries } from "./StringSeries.js";
import { StringState } from "./StringState.js";
import { StringStateCollection } from "./StringStateCollection.js";
export { StringManager };
/**
 * Singleton object that manages all StringSeries objects used throughout the program.
 */
class StringManager {
    constructor() {
        this._stringSeries = [];
    }
    /**
     * Gets the StringManager instance. Creates it if it is not already created.
     * @returns The singleton StirngManager instance
     */
    static getInstance() {
        if (!StringManager._instance) {
            StringManager._instance = new StringManager();
        }
        return StringManager._instance;
    }
    /**
     * Creates new StringSeries objects from JSON and appends them to the current array of StringSeries objects.
     * @param jsonData The JSON source of the new StringSeries objects.
     */
    appendFromJson(jsonData) {
        this._stringSeries = this._stringSeries.concat(StringSeries.createFromJson(jsonData));
    }
    /**
     * Get a base set of standard tuning strings.
     *
     * @description Standard tuning.
     */
    getStandardTuning() {
        return new StringStateCollection([
            new StringState(64, 25.5, this.getSeriesByBrandAndType("D'Addario", "Plain Steel").getStringByGauge(0.01)),
            new StringState(59, 25.5, this.getSeriesByBrandAndType("D'Addario", "Plain Steel").getStringByGauge(0.013)),
            new StringState(55, 25.5, this.getSeriesByBrandAndType("D'Addario", "Plain Steel").getStringByGauge(0.017)),
            new StringState(50, 25.5, this.getSeriesByBrandAndType("D'Addario", "XL Nickel Wound").getStringByGauge(0.026)),
            new StringState(45, 25.5, this.getSeriesByBrandAndType("D'Addario", "XL Nickel Wound").getStringByGauge(0.036)),
            new StringState(40, 25.5, this.getSeriesByBrandAndType("D'Addario", "XL Nickel Wound").getStringByGauge(0.046)),
            new StringState(35, 25.5, this.getSeriesByBrandAndType("D'Addario", "XL Nickel Wound").getStringByGauge(0.059)),
            new StringState(30, 25.5, this.getSeriesByBrandAndType("D'Addario", "XL Nickel Wound").getStringByGauge(0.074))
        ]);
    }
    /**
     * Gets a series by guitar string and string type.
     *
     * @param {string} brand
     * @param {string} type
     * @returns A string series.
     */
    getSeriesByBrandAndType(brand, type) {
        for (let i = 0; i < this._stringSeries.length; i++) {
            if (this._stringSeries[i].brand === brand && this._stringSeries[i].type === type) {
                return this._stringSeries[i];
            }
        }
        return new StringSeries("Undefined", "Guitar String", []);
    }
}
