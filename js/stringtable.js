import { StringState } from './stringstate.js'
import { Utilities } from './utilities.js'
export { StringTable };

/**
 * Manipulates multiple strings at once.
 */
class StringTable {

    constructor() {
        // Start with standard tuning.
        this.defaultStrings = [];
        this.currentStrings = [];

        this.defaultStrings[0] = new StringState(64, 25.5, Utilities.getStringWeightTablePL().getStringByGauge(0.010));
        this.defaultStrings[1] = new StringState(59, 25.5, Utilities.getStringWeightTablePL().getStringByGauge(0.013));
        this.defaultStrings[2] = new StringState(55, 25.5, Utilities.getStringWeightTablePL().getStringByGauge(0.017));
        this.defaultStrings[3] = new StringState(50, 25.5, Utilities.getStringWeightTableNW().getStringByGauge(0.026));
        this.defaultStrings[4] = new StringState(45, 25.5, Utilities.getStringWeightTableNW().getStringByGauge(0.036));
        this.defaultStrings[5] = new StringState(40, 25.5, Utilities.getStringWeightTableNW().getStringByGauge(0.046));
        this.defaultStrings[6] = new StringState(35, 25.5, Utilities.getStringWeightTableNW().getStringByGauge(0.059));
        this.defaultStrings[7] = new StringState(30, 25.5, Utilities.getStringWeightTableNW().getStringByGauge(0.074));

        for (let i = 0; i < 6; i++) {
            this.currentStrings[i] = new StringState(this.defaultStrings[i].note, this.defaultStrings[i].scale, this.defaultStrings[i].stringInfo);
        }
    }

    /**
     * @returns The array of all the strings in the table.
     */
    getStrings() {
        return this.currentStrings;
    }

    /**
     * @param {*} i The zero-based index for the string.
     * @returns The string at the input index.
     */
    getString(i) {
        return this.currentStrings[i];
    }

    /**
     * @returns The number of strings in the string table.
     */
    getNumStrings() {
        return this.currentStrings.length;
    }

    /**
     * Adds or removes strings to be equal to the input number of strings.
     * @param {*} numStrings 
     */
    setNumStrings(numStrings) {
        if (numStrings < 1)
            return;

        while (numStrings < this.currentStrings.length) {
            this.currentStrings.pop();
        }

        if (numStrings > this.currentStrings.length) {
            // TODO: Keep current strings.
            this.currentStrings = [];

            for (let i = 0; i < numStrings; i++) {
                this.currentStrings[i] = new StringState(this.defaultStrings[i].note, this.defaultStrings[i].scale, this.defaultStrings[i].stringInfo);
            }
        }
    }

    /**
     * Shift every string's pitch.
     * 
     * @param {*} semitones 
     */
    shiftPitches(semitones) {
        for (let string of this.currentStrings) {
            string.shiftPitch(semitones);
        }
    }

    /**
     * Sets the scale length of all strings in the table.
     * If two scale lengths are entered, the intermediate string scales will be calculated.
     * 
     * @param {*} scale The first or only scale length.
     * @param {*} multiscale  The optional second scale length.
     */
    setScaleLength(scale, otherScale = 0) {
        if (scale <= 0)
            return;

        if (otherScale <= 0)
            otherScale = scale;

        for (let i = 0; i < this.getNumStrings(); i++) {
            let strScale = scale + ((otherScale - scale) * (i / (this.getNumStrings() - 1)));
            this.getString(i).setScaleLength(strScale);
        }
    }
}