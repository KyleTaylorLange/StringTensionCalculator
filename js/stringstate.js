export { StringState };

/**
 * Represents the state of a string on an instrument.
 */
class StringState {

    constructor(note, scale, stringInfo) {
        this.note = note;
        this.scale = scale;
        this.stringInfo = stringInfo;
    }

    /**
     * Shifts the string's pitch by a defined number of semitones.
     * 
     * TODO: define/utilize stringNum.
     * 
     * @param {*} semitones 
     * @param {*} stringNum 
     */
    shiftPitch(semitones, stringNum) {
        this.note += semitones;
    }

    /**
     * Sets the string scale length.
     * 
     * @param {*} scale 
     */
    setScaleLength(scale) {
        this.scale = scale;
    }

    /**
     * Calculates the tension of the string.
     * 
     * @param {StringState} string
     * @returns {*} the calculated tension of the string
     */
    calculateStringTension() {
        // Test code to calculate note frequency.
        let note = this.note;
        let frequency = Math.pow(2, (note - 69) / 12) * 440.0;
        let unitWeight = this.stringInfo.unitWeight;
        let scaleLength = this.scale;
        let tension = (unitWeight * Math.pow((2 * scaleLength * frequency), 2)) / 386.4;

        return tension.toFixed(2);
    }
}
