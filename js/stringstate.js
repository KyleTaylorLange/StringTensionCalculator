export { StringState };

/**
 * Represents the state of a string on an instrument.
 */
class StringState {

    constructor(note, scale) {
        this.note = note;
        this.scale = scale;
    }

    shiftPitch(semitones, stringNum) {
        this.note += semitones;
    }

    setScaleLength(scale) {
        this.scale = scale;
    }
}
