import { StringInfo } from "./stringinfo.js"

export { StringState }

/**
 * Represents the state of a string on an instrument.
 */
class StringState {
    note: number
    scale: number
    strInfo: StringInfo

    constructor(note: number, scale: number, strInfo: StringInfo) {
        this.note = note
        this.scale = scale
        this.strInfo = strInfo
    }

    /**
     * Shifts the string's pitch by a defined number of semitones.
     *
     * @param {number} semitones
     */
    shiftPitch(semitones: number) {
        this.note += semitones
    }

    /**
     * // NOTE: Duplicate method name 'setScaleLength' in StringTable. Refactor?
     *
     * Sets the string scale length.
     *
     * @param {number} scale The string scale length.
     */
    setScaleLength(scale: number) {
        this.scale = scale
    }

    /**
     * Calculates the tension of the string.
     *
     * @param {StringState} string
     * @returns {string} The calculated tension of the string (as a string type).
     */
    calculateStringTension(): string {
        // Test code to calculate note frequency.
        let note = this.note
        let frequency = Math.pow(2, (note - 69) / 12) * 440.0
        let unitWeight = this.strInfo.unitWeight
        let scaleLength = this.scale
        let tension = (unitWeight * Math.pow(2 * scaleLength * frequency, 2)) / 386.4

        return tension.toFixed(2)
    }
}
