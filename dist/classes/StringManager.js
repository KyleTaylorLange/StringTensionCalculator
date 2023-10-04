import { StringSeries } from "./StringSeries.js";
import { Strings } from "../static/Strings.js";
import { StringState } from "./StringState.js";
import { StringStateCollection } from "./StringStateCollection.js";
export { StringManager };
/**
 * Manages all StringSeries objects used for all StringTables in the program.
 */
class StringManager {
    constructor() {
        this._dAddarioPlainSteel = Strings.dAddarioPlainSteel();
        this._dAddarioXLNickelWound = Strings.dAddarioXLNickelWound();
    }
    get dAddarioPlainSteel() {
        return this._dAddarioPlainSteel;
    }
    set dAddarioPlainSteel(value) {
        this._dAddarioPlainSteel = value;
    }
    get dAddarioXLNickelWound() {
        return this._dAddarioXLNickelWound;
    }
    set dAddarioXLNickelWound(value) {
        this._dAddarioXLNickelWound = value;
    }
    /**
     * Get a base set of standard tuning strings.
     *
     * @description Standard tuning.
     */
    getStandardTuning() {
        return new StringStateCollection([
            new StringState(64, 25.5, this.dAddarioPlainSteel.getStringByGauge(0.01)),
            new StringState(59, 25.5, this.dAddarioPlainSteel.getStringByGauge(0.013)),
            new StringState(55, 25.5, this.dAddarioPlainSteel.getStringByGauge(0.017)),
            new StringState(50, 25.5, this.dAddarioXLNickelWound.getStringByGauge(0.026)),
            new StringState(45, 25.5, this.dAddarioXLNickelWound.getStringByGauge(0.036)),
            new StringState(40, 25.5, this.dAddarioXLNickelWound.getStringByGauge(0.046)),
            new StringState(35, 25.5, this.dAddarioXLNickelWound.getStringByGauge(0.059)),
            new StringState(30, 25.5, this.dAddarioXLNickelWound.getStringByGauge(0.074))
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
        if (this.dAddarioPlainSteel.brand === brand && this.dAddarioPlainSteel.type === type) {
            return this.dAddarioPlainSteel;
        }
        if (this.dAddarioXLNickelWound.brand === brand && this.dAddarioXLNickelWound.type === type) {
            return this.dAddarioXLNickelWound;
        }
        return new StringSeries("Undefined", "Guitar String", []);
    }
}
