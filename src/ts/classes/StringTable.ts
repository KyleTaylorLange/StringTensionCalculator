import { StringState } from "./StringState.js"
import { StringStateCollection } from "./StringStateCollection.js"
import { StringManager } from "./StringManager.js"

export { StringTable }

/**
 * Manipulates multiple strings at once.
 */
class StringTable {
    private _stringManager: StringManager
    private _currentStrings: StringStateCollection
    private _stringCache: StringStateCollection

    constructor(stringManager: StringManager) {
        // Standard tuning is set as the default (original) state for the current strings
        this._stringManager = stringManager
        this._currentStrings = this.getStandardTuning()
        this._stringCache = new StringStateCollection
    }

    public get stringManager(): StringManager {
        return this._stringManager
    }

    public get currentStrings(): StringStateCollection {
        return this._currentStrings
    }

    public set currentStrings(value: StringStateCollection) {
        this._currentStrings = value
    }

    public get stringCache(): StringStateCollection {
        return this._stringCache
    }
    
    public set stringCache(value: StringStateCollection) {
        this._stringCache = value
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
                this.stringManager.dAddarioPlainSteel.getStringByGauge(0.01)
            ),
            new StringState(
                59,
                25.5,
                this.stringManager.dAddarioPlainSteel.getStringByGauge(0.013)
            ),
            new StringState(
                55,
                25.5,
                this.stringManager.dAddarioPlainSteel.getStringByGauge(0.017)
            ),
            new StringState(
                50,
                25.5,
                this.stringManager.dAddarioXLNickelWound.getStringByGauge(0.026)
            ),
            new StringState(
                45,
                25.5,
                this.stringManager.dAddarioXLNickelWound.getStringByGauge(0.036)
            ),
            new StringState(
                40,
                25.5,
                this.stringManager.dAddarioXLNickelWound.getStringByGauge(0.046)
            ),
            new StringState(
                35,
                25.5,
                this.stringManager.dAddarioXLNickelWound.getStringByGauge(0.059)
            ),
            new StringState(
                30,
                25.5,
                this.stringManager.dAddarioXLNickelWound.getStringByGauge(0.074)
            )
        ])
    }

    /**
     * Gets a current single string.
     *
     * @param {number} i The zero-based index for the string.
     * @returns {StringState} The string at the input index.
     */
    public getString(i: number): StringState {
        return this.currentStrings.states[i]
    }

    /**
     * Gets the number of strings in the string table.
     *
     * @returns {number} The number of strings in the string table.
     */
    public getNumStrings(): number {
        return this.currentStrings.states.length
    }

    /**
     * Adds or removes strings to be equal to the input number of strings.
     *
     * @param {number} numStrings
     */
    public setNumStrings(numStrings: number) {
        if (numStrings < 1) {
            return
        }

        while (numStrings > this.currentStrings.states.length) {
            this.currentStrings.states.push(this.stringCache.states.pop()!)
        }

        while (numStrings < this.currentStrings.states.length) {
            this.stringCache.states.push(this.currentStrings.states.pop()!)
        }
    }

    /**
     * Shift every string's pitch.
     *
     * @param {number} semitones A semitone count.
     */
    public shiftPitches(semitones: number) {
        for (let string of this.currentStrings.states) {
            string.shiftPitch(semitones)
        }
    }
}
