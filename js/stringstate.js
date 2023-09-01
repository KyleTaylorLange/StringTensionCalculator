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
}
