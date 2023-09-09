export { StringState };
/**
 * Represents the state of a string on an instrument.
 */
class StringState {
    constructor(note, scaleLength, strInfo) {
        this._note = note;
        this._scaleLength = scaleLength;
        this._strInfo = strInfo;
    }
    get note() {
        return this._note;
    }
    set note(value) {
        this._note = value;
    }
    get scaleLength() {
        return this._scaleLength;
    }
    set scaleLength(value) {
        this._scaleLength = value;
    }
    get strInfo() {
        return this._strInfo;
    }
    set strInfo(value) {
        this._strInfo = value;
    }
    /**
     * Shifts the string's pitch by a defined number of semitones.
     *
     * @param {number} semitones A semitone count.
     */
    shiftPitch(semitones) {
        this.note += semitones;
    }
    /**
     * Calculates the tension of the string.
     *
     * @param {StringState} string
     * @returns {string} The calculated tension of the string (as a string type).
     */
    calculateStringTension() {
        // Test code to calculate note frequency.
        let note = this._note;
        let frequency = Math.pow(2, (note - 69) / 12) * 440.0;
        let unitWeight = this._strInfo.unitWeight;
        let scaleLength = this._scaleLength;
        let tension = (unitWeight * Math.pow(2 * scaleLength * frequency, 2)) / 386.4;
        return tension.toFixed(2);
    }
}
