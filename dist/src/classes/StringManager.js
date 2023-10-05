import { StringSeries } from "./StringSeries.js";
import { StringState } from "./StringState.js";
import { StringStateCollection } from "./StringStateCollection.js";
import stringsJson from "../../json/DAddario.json" assert { type: "json" };
export { StringManager };
/**
 * Manages all StringSeries objects used for all StringTables in the program.
 */
class StringManager {
    constructor() {
        this._stringSeries = [];
        // Parse the JSON into StringSeries instances
        this._stringSeries = this._stringSeries.concat(StringSeries.createFromJson(stringsJson));
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
