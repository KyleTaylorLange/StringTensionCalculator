import { StringState } from "./stringstate.js"
import { Strings } from "./strings.js"

export { StringTable }

/**
 * Manipulates multiple strings at once.
 */
class StringTable {
    private _defaultStrings: StringState[]
    private _currentStrings: StringState[]

    constructor() {
        this._defaultStrings = this.getStandardTuning()
        this._currentStrings = []
    }

    public get defaultStrings(): StringState[] {
        return this._defaultStrings
    }

    public set defaultStrings(value: StringState[]) {
        this._defaultStrings = value
    }

    public get currentStrings(): StringState[] {
        return this._currentStrings
    }

    public set currentStrings(value: StringState[]) {
        this._currentStrings = value
    }

    /** 
     * Get a base set of standard tuning strings.
     * 
     * @description Standard tuning.
     */
    getStandardTuning(): StringState[] {
        return [
            new StringState(
                64,
                25.5,
                Strings.dAddarioPlainSteel().getStringByGauge(0.01)
            ),
            new StringState(
                59,
                25.5,
                Strings.dAddarioPlainSteel().getStringByGauge(0.013)
            ),
            new StringState(
                55,
                25.5,
                Strings.dAddarioPlainSteel().getStringByGauge(0.017)
            ),
            new StringState(
                50,
                25.5,
                Strings.dAddarioXLNickelWound().getStringByGauge(0.026)
            ),
            new StringState(
                45,
                25.5,
                Strings.dAddarioXLNickelWound().getStringByGauge(0.036)
            ),
            new StringState(
                40,
                25.5,
                Strings.dAddarioXLNickelWound().getStringByGauge(0.046)
            ),
            new StringState(
                35,
                25.5,
                Strings.dAddarioXLNickelWound().getStringByGauge(0.059)
            ),
            new StringState(
                30,
                25.5,
                Strings.dAddarioXLNickelWound().getStringByGauge(0.074)
            )
        ]
    }

    /**
     * Gets a current single string.
     *
     * @param {number} i The zero-based index for the string.
     * @returns {StringState} The string at the input index.
     */
    getString(i: number): StringState {
        return this.currentStrings[i]
    }

    /**
     * Gets the number of strings in the string table.
     *
     * @returns {number} The number of strings in the string table.
     */
    getNumStrings(): number {
        return this.currentStrings.length
    }

    /**
     * Adds or removes strings to be equal to the input number of strings.
     *
     * @param {number} numStrings
     */
    setNumStrings(numStrings: number) {
        if (numStrings < 1) return

        while (numStrings < this.currentStrings.length) {
            this.currentStrings.pop()
        }

        if (numStrings > this.currentStrings.length) {
            /**
             * // TODO: Revisions for algorithm for setting the number of strings.
             *
             * If the number of requested strings is longer than the defaultStrings, just keep duplicating the last one.
             * Additional idea: instead of taking the pitch from the defaultStrings, predict the subsequent pitch.
             * For guitar/bass this would just be the current pitch - 5., for mandolin it'd be - 7.
             * Though it could be coded to handle weird intervals (e.g. the 4-semitones between string 2 and 3 on guitar).
             */
            for (let i = this.currentStrings.length; i < numStrings; i++) {
                this.currentStrings[i] = new StringState(
                    this.defaultStrings[i].note,
                    this.defaultStrings[i].scaleLength,
                    this.defaultStrings[i].strInfo
                )
            }
        }
    }

    /**
     * Shift every string's pitch.
     *
     * @param {number} semitones A semitone count.
     */
    shiftPitches(semitones: number) {
        for (let string of this.currentStrings) {
            string.shiftPitch(semitones)
        }
    }
}
