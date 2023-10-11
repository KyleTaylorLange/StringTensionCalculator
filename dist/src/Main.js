import { StringTension } from "./classes/StringTension.js";
export { Main };
/**
 * Main class. Pass JSON data in through this.
 */
class Main {
    constructor(jsonData) {
        this._stringTension = new StringTension(jsonData);
    }
    get stringTension() {
        return this._stringTension;
    }
    set stringTension(value) {
        this._stringTension = value;
    }
    /**
     * Run time!
     */
    runTime() {
        let caller = this;
        // Some of our elements to be used
        let numberOfStringsInput = document.getElementsByClassName("number-of-strings")[0];
        let buttonPitchDown = document.getElementsByClassName("button-pitches-decrease")[0];
        let buttonPitchUp = document.getElementsByClassName("button-pitches-increase")[0];
        // Events
        numberOfStringsInput.onchange = function () {
            caller.stringTension.makeStringTable("str-table", "num-strings");
        };
        buttonPitchDown.onclick = function () {
            caller.stringTension.shiftPitches(-1);
        };
        buttonPitchUp.onclick = function () {
            caller.stringTension.shiftPitches(1);
        };
        caller.stringTension.makeStringTable("str-table", "num-strings");
    }
}
