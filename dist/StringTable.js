import { StringState } from "./StringState.js";
import { Strings } from "./Strings.js";
import { StringStateCollection } from "./StringStateCollection.js";
export { StringTable };
/**
 * Manipulates multiple strings at once.
 */
class StringTable {
    constructor() {
        // Standard tuning is set as the default (original) state for the current strings
        this._currentStrings = this.getStandardTuning();
        this._stringCache = new StringStateCollection;
    }
    get currentStrings() {
        return this._currentStrings;
    }
    set currentStrings(value) {
        this._currentStrings = value;
    }
    get stringCache() {
        return this._stringCache;
    }
    set stringCache(value) {
        this._stringCache = value;
    }
    /**
     * Get a base set of standard tuning strings.
     *
     * @description Standard tuning.
     */
    getStandardTuning() {
        return new StringStateCollection([
            new StringState(64, 25.5, Strings.dAddarioPlainSteel().getStringByGauge(0.01)),
            new StringState(59, 25.5, Strings.dAddarioPlainSteel().getStringByGauge(0.013)),
            new StringState(55, 25.5, Strings.dAddarioPlainSteel().getStringByGauge(0.017)),
            new StringState(50, 25.5, Strings.dAddarioXLNickelWound().getStringByGauge(0.026)),
            new StringState(45, 25.5, Strings.dAddarioXLNickelWound().getStringByGauge(0.036)),
            new StringState(40, 25.5, Strings.dAddarioXLNickelWound().getStringByGauge(0.046)),
            new StringState(35, 25.5, Strings.dAddarioXLNickelWound().getStringByGauge(0.059)),
            new StringState(30, 25.5, Strings.dAddarioXLNickelWound().getStringByGauge(0.074))
        ]);
    }
    /**
     * Gets a current single string.
     *
     * @param {number} i The zero-based index for the string.
     * @returns {StringState} The string at the input index.
     */
    getString(i) {
        return this.currentStrings.states[i];
    }
    /**
     * Gets the number of strings in the string table.
     *
     * @returns {number} The number of strings in the string table.
     */
    getNumStrings() {
        return this.currentStrings.states.length;
    }
    /**
     * Adds or removes strings to be equal to the input number of strings.
     *
     * @param {number} numStrings
     */
    setNumStrings(numStrings) {
        if (numStrings < 1) {
            return;
        }
        while (numStrings > this.currentStrings.states.length) {
            this.currentStrings.states.push(this.stringCache.states.pop());
        }
        while (numStrings < this.currentStrings.states.length) {
            this.stringCache.states.push(this.currentStrings.states.pop());
        }
    }
    /**
     * Shift every string's pitch.
     *
     * @param {number} semitones A semitone count.
     */
    shiftPitches(semitones) {
        for (let string of this.currentStrings.states) {
            string.shiftPitch(semitones);
        }
    }
}
