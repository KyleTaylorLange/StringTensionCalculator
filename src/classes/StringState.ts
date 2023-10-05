import { StringInfo } from "./StringInfo.js"

export { StringState }

/**
 * Represents the state of a string on an instrument.
 */
class StringState {
    private _note: number
    private _scaleLength: number
    private _strInfo: StringInfo

    constructor(note: number, scaleLength: number, strInfo: StringInfo) {
        this._note = note
        this._scaleLength = scaleLength
        this._strInfo = strInfo
    }

    public get note(): number {
        return this._note
    }

    public set note(value: number) {
        this._note = value
    }

    public get scaleLength(): number {
        return this._scaleLength
    }

    public set scaleLength(value: number) {
        this._scaleLength = value
    }

    public get strInfo(): StringInfo {
        return this._strInfo
    }

    public set strInfo(value: StringInfo) {
        this._strInfo = value
    }

    /**
     * Shifts the string's pitch by a defined number of semitones.
     *
     * @param {number} semitones A semitone count.
     */
    shiftPitch(semitones: number) {
        this.note += semitones
    }

    /**
     * Calculates the tension of the string.
     *
     * @param {StringState} string
     * @returns {string} The calculated tension of the string (as a string type).
     */
    calculateStringTension(): string {
        // Test code to calculate note frequency.
        let note = this._note
        let frequency = Math.pow(2, (note - 69) / 12) * 440.0
        let unitWeight = this._strInfo.unitWeight
        let scaleLength = this._scaleLength
        let tension = (unitWeight * Math.pow(2 * scaleLength * frequency, 2)) / 386.4

        return tension.toFixed(2)
    }
}
