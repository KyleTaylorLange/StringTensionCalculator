import { StringCustomInput } from './classes/StringCustomInput.js';
import { StringTableManager } from './classes/StringTableManager.js';
export { Main };
/**
 * Main class. Pass JSON data in through this.
 */
class Main {
    // TODO: We need a more uniform way to access the tables (this.stringTables) from StringTableManager.
    constructor(jsonData) {
        this._strTableManager = new StringTableManager(jsonData);
        this._stringCustomInput = new StringCustomInput();
    }
    get strTableManager() {
        return this._strTableManager;
    }
    set strTableManager(value) {
        this._strTableManager = value;
    }
    get stringCustomInput() {
        return this._stringCustomInput;
    }
    set stringCustomInput(value) {
        this._stringCustomInput = value;
    }
    /**
     * Renders the string custom input. Allows the user to enter a custom string set for use.
     */
    renderStringCustomInput() {
        this.stringCustomInput.render();
    }
    /**
     * Shift every string's pitch and render the table.
     *
     * @param {number} semitones A semitone count.
     */
    renderPitchShifts(semitones) {
        this.strTableManager.stringTables[0].shiftPitches(semitones);
        this.strTableManager.stringTables[0].render('str-table');
    }
    /**
     * Clears the old table and re-renders a new one.
     *
     * @param {string} tableId The id for the string table.
     * @param {string} numberId The id for the `Number of Strings` input element.
     */
    renderStringTable(tableId, numberId) {
        let numStrings = document.getElementById(numberId).value;
        this.strTableManager.stringTables[0].setNumStrings(Number(numStrings));
        this.strTableManager.stringTables[0].render(tableId);
    }
    /**
     * Submit function for the custom string data.
     */
    submit() {
        const stringBrandValue = document.getElementsByClassName('custom-string-brand')[0].value;
        const stringTypeValue = document.getElementsByClassName('custom-string-type')[0].value;
        const stringGauges = document.getElementsByClassName('custom-string-gauge');
        const stringWeights = document.getElementsByClassName('custom-string-weight');
        let gaugeArray = [];
        let weightsArray = [];
        let stringObjects = [];
        for (let gauge of stringGauges) {
            let gaugeValue = gauge.value;
            if (gaugeValue) {
                gaugeArray.push(gaugeValue);
            }
        }
        for (let weight of stringWeights) {
            let weightValue = weight.value;
            if (weightValue) {
                weightsArray.push(weightValue);
            }
        }
        for (let i = 0; i < gaugeArray.length; ++i) {
            stringObjects.push({ "gauge": gaugeArray[i], "unitWeight": weightsArray[i] });
        }
        this.stringCustomInput.setCustomStringInfo(stringBrandValue, stringTypeValue, stringObjects);
    }
    /**
     * Run time!
     */
    runTime() {
        const caller = this;
        // DEBUG: customSubmit is not yet in the DOM, so it can't be accessed immediately at runtime
        //        events on this submit button need to be watched for *only* once it is accessible
        // Some of our elements to be used
        let customStrings = document.getElementsByClassName('add-custom-strings')[0];
        let numberOfStringsInput = document.getElementsByClassName('number-of-strings')[0];
        let buttonPitchDown = document.getElementsByClassName('button-pitches-decrease')[0];
        let buttonPitchUp = document.getElementsByClassName('button-pitches-increase')[0];
        // Events
        numberOfStringsInput.onchange = function () {
            caller.renderStringTable('str-table', 'num-strings');
        };
        buttonPitchDown.onclick = function () {
            caller.renderPitchShifts(-1);
        };
        buttonPitchUp.onclick = function () {
            caller.renderPitchShifts(1);
        };
        customStrings.onclick = function () {
            caller.renderStringCustomInput();
            // Watch for click on submit button
            const customSubmit = document.getElementsByClassName('submit')[0];
            if (customSubmit) {
                customSubmit.onclick = function () {
                    caller.submit();
                };
            }
        };
        caller.renderStringTable('str-table', 'num-strings');
    }
}
