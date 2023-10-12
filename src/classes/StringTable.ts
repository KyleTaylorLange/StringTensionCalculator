import { StringState } from "./StringState.js"
import { StringStateCollection } from "./StringStateCollection.js"

export { StringTable }

/**
 * Manipulates multiple strings at once.
 */
class StringTable {
    private _currentStrings: StringStateCollection
    private _stringCache: StringStateCollection

    constructor(startingStrings: StringStateCollection) {
        this._currentStrings = startingStrings
        this._stringCache = new StringStateCollection
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
