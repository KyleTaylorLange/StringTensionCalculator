import { StringCustomInput } from './classes/StringCustomInput.js';
import { StringInfo } from './classes/StringInfo.js';
import { StringManager } from './classes/StringManager.js';
import { StringTable } from './classes/StringTable.js';
import { StringTableManager } from './classes/StringTableManager.js';
export { Main };
/**
 * Main class. Pass JSON data in through this.
 */
class Main {
    // TODO: We need a more uniform way to access the tables (this.stringTables) from StringTableManager.
    constructor(jsonData) {
        this._stringCustomInfoArray = [];
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
    get stringCustomInfoArray() {
        return this._stringCustomInfoArray;
    }
    set stringCustomInfoArray(value) {
        this._stringCustomInfoArray = value;
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
        // NOTE: Add logic to validate entries on submission
        for (let gauge of stringGauges) {
            let gaugeValue = gauge.value;
            if (gaugeValue) {
                gaugeArray.push(Number(gaugeValue));
            }
        }
        for (let weight of stringWeights) {
            let weightValue = weight.value;
            if (weightValue) {
                weightsArray.push(Number(weightValue));
            }
        }
        for (let i = 0; i < gaugeArray.length; ++i) {
            stringObjects.push({ "gauge": gaugeArray[i], "unitWeight": weightsArray[i] });
        }
        for (let i = 0; i < stringObjects.length; i++) {
            this.stringCustomInfoArray.push(new StringInfo(stringObjects[i].gauge, stringObjects[i].unitWeight, stringBrandValue, stringTypeValue));
        }
        // Push a new string table
        this.strTableManager.stringTables.push(new StringTable(StringManager.getInstance().getStandardTuning(this.stringCustomInfoArray)));
    }
    /**
     * Run time!
     */
    runTime() {
        const caller = this;
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
