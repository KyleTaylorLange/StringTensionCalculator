import { StringState } from "./stringstate.js"
import { Strings } from "./strings.js"

export { StringTable }

/**
 * Manipulates multiple strings at once.
 */
class StringTable {
    defaultStrings: StringState[]
    currentStrings: StringState[]

    constructor() {
        this.defaultStrings = []
        this.currentStrings = []

        this.setDefaultStrings();
    }

    /** 
     * Sets the default strings for this object.
     * 
     * @description Standard tuning.
     */
    setDefaultStrings() {
        this.defaultStrings[0] = new StringState(
            64,
            25.5,
            Strings.dAddarioPlainSteel().getStringByGauge(0.01)
        )
        this.defaultStrings[1] = new StringState(
            59,
            25.5,
            Strings.dAddarioPlainSteel().getStringByGauge(0.013)
        )
        this.defaultStrings[2] = new StringState(
            55,
            25.5,
            Strings.dAddarioPlainSteel().getStringByGauge(0.017)
        )
        this.defaultStrings[3] = new StringState(
            50,
            25.5,
            Strings.dAddarioXLNickelWound().getStringByGauge(0.026)
        )
        this.defaultStrings[4] = new StringState(
            45,
            25.5,
            Strings.dAddarioXLNickelWound().getStringByGauge(0.036)
        )
        this.defaultStrings[5] = new StringState(
            40,
            25.5,
            Strings.dAddarioXLNickelWound().getStringByGauge(0.046)
        )
        this.defaultStrings[6] = new StringState(
            35,
            25.5,
            Strings.dAddarioXLNickelWound().getStringByGauge(0.059)
        )
        this.defaultStrings[7] = new StringState(
            30,
            25.5,
            Strings.dAddarioXLNickelWound().getStringByGauge(0.074)
        )
    }

    /**
     * Gets the current strings.
     *
     * @returns {array} The array of all the strings in the table.
     */
    getStrings() {
        return this.currentStrings
    }

    /**
     * Gets a current string.
     *
     * @param {number} i The zero-based index for the string.
     * @returns {StringState} The string at the input index.
     */
    getString(i: number) {
        return this.currentStrings[i]
    }

    /**
     * Gets the number of strings in the string table.
     *
     * @returns {number} The number of strings in the string table.
     */
    getNumStrings() {
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

    /**
     * // NOTE: Duplicate method name 'setScaleLength' in StringState. Refactor?
     *
     * Sets the scale length of all strings in the table.
     *
     * If two scale lengths are entered, the intermediate string scales will be calculated.
     *
     * @param {number} scale The first (or only) scale length.
     * @param {number} [otherScale] The optional second scale length.
     */
    setScaleLength(scale: number, otherScale: number = 0) {
        if (scale <= 0) {
            return
        }

        if (otherScale <= 0) {
            otherScale = scale
        }

        for (let i = 0; i < this.getNumStrings(); i++) {
            let strScale = scale + (otherScale - scale) * (i / (this.getNumStrings() - 1))

            this.getString(i).scaleLength = strScale
        }
    }
}
