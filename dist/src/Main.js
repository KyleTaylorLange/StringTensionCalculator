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
        for (let i = 0; i < this.strTableManager.stringTables.length; i++) {
            if (this.strTableManager.stringTables[i].isCurrent) {
                this.strTableManager.stringTables[i].shiftPitches(semitones);
                this.strTableManager.stringTables[i].render('str-table');
            }
        }
    }
    /**
     * Clears the old table and re-renders a new one.
     *
     * @param {string} tableId The id for the string table.
     * @param {string} numberId The id for the `Number of Strings` input element.
     */
    renderStringTable(tableId, numberId) {
        let numStrings = document.getElementById(numberId).value;
        for (let i = 0; i < this.strTableManager.stringTables.length; i++) {
            if (this.strTableManager.stringTables[i].isCurrent) {
                this.strTableManager.stringTables[i].setNumStrings(Number(numStrings));
                this.strTableManager.stringTables[i].render(tableId);
            }
        }
    }
    /**
     * Submit function for the custom string data.
     */
    submitCustomStringData() {
        const overlay = document.getElementsByClassName('overlay')[0];
        const stringBrandValue = document.getElementsByClassName('custom-string-brand')[0].value;
        const stringTypeValue = document.getElementsByClassName('custom-string-type')[0].value;
        const stringGauges = document.getElementsByClassName('custom-string-gauge');
        const stringWeights = document.getElementsByClassName('custom-string-weight');
        let gaugeArray = [];
        let weightsArray = [];
        let stringObjects = [];
        let stringCustomInfoArray = [];
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
            stringCustomInfoArray.push(new StringInfo(stringObjects[i].gauge, stringObjects[i].unitWeight, stringBrandValue, stringTypeValue));
        }
        // Push a new string table
        this.strTableManager.stringTables.push(new StringTable(StringManager.getInstance().getStandardTuning(stringCustomInfoArray)));
        // Set the new string table as the current
        for (let i = 0; i < this.strTableManager.stringTables.length; i++) {
            if (i === this.strTableManager.stringTables.length - 1) {
                this.strTableManager.stringTables[i].isCurrent = true;
                continue;
            }
            this.strTableManager.stringTables[i].isCurrent = false;
        }
        overlay.classList.replace('show', 'hide');
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 500);
        this.renderStringTable('str-table', 'num-strings');
    }
    /**
     * Run time!
     */
    runTime() {
        const caller = this;
        // Some of our elements to be used
        const numberOfStringsInput = document.getElementsByClassName('number-of-strings')[0];
        const buttonAddCustomStrings = document.getElementsByClassName('add-custom-strings')[0];
        const buttonPitchDown = document.getElementsByClassName('button-pitches-decrease')[0];
        const buttonPitchUp = document.getElementsByClassName('button-pitches-increase')[0];
        // Events
        numberOfStringsInput.onchange = function () {
            for (let i = 0; i < caller.strTableManager.stringTables.length; i++) {
                if (caller.strTableManager.stringTables[i].isCurrent) {
                    caller.renderStringTable('str-table', 'num-strings');
                }
            }
        };
        buttonPitchDown.onclick = function () {
            caller.renderPitchShifts(-1);
        };
        buttonPitchUp.onclick = function () {
            caller.renderPitchShifts(1);
        };
        buttonAddCustomStrings.onclick = function () {
            const overlay = document.getElementsByClassName('overlay')[0];
            const gaugeButtons = document.getElementsByClassName('button-gauge');
            if (overlay) {
                overlay.style.display = 'block';
                overlay.classList.replace('hide', 'show');
            }
            else {
                caller.renderStringCustomInput();
            }
            // Watch for click on exit or submit
            const customSubmit = document.getElementsByClassName('submit')[0];
            const customExit = document.getElementsByClassName('exit')[0];
            if (customSubmit) {
                customSubmit.onclick = function () {
                    caller.submitCustomStringData();
                    for (let button of gaugeButtons) {
                        button.classList.add('nullify');
                    }
                };
            }
            if (customExit) {
                customExit.onclick = function () {
                    const overlay = document.getElementsByClassName('overlay')[0];
                    overlay.classList.replace('show', 'hide');
                    setTimeout(() => {
                        overlay.style.display = 'none';
                    }, 500);
                };
            }
        };
        caller.renderStringTable('str-table', 'num-strings');
    }
}
