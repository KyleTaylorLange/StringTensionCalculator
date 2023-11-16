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
        let stringMin, stringMax, stringDefault;
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
            if (gaugeArray[i] && weightsArray[i]) {
                stringObjects.push({ "gauge": gaugeArray[i], "unitWeight": weightsArray[i] });
            }
        }
        // If no brand name, type name, or valid strings have been entered, return early
        if (!stringBrandValue || !stringTypeValue || stringObjects.length === 0) {
            return;
        }
        // Assign our variables for the input of type 'number'
        stringMax = stringObjects.length;
        stringMin = 1;
        stringDefault = stringMax > 6 ? 6 : stringMax;
        for (let i = 0; i < stringObjects.length; i++) {
            stringCustomInfoArray.push(new StringInfo(stringObjects[i].gauge, stringObjects[i].unitWeight, stringBrandValue, stringTypeValue));
        }
        // Push a new string table
        this.strTableManager.stringTables.push(new StringTable(StringManager.getInstance().getStandardTuning(stringCustomInfoArray)));
        // Set the new string table as the current
        for (let i = 0; i < this.strTableManager.stringTables.length; i++) {
            if (i === this.strTableManager.stringTables.length - 1) {
                this.strTableManager.stringTables[i].canModifyGauge = false;
                this.strTableManager.stringTables[i].isCurrent = true;
                continue;
            }
            this.strTableManager.stringTables[i].isCurrent = false;
        }
        overlay.classList.replace('show', 'hide');
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 500);
        this.strTableManager.renderNumberInput(stringMin, stringMax, stringDefault);
        this.renderStringTable('str-table', 'num-strings');
        this.handleNumberOfStringsInputOnChange();
    }
    /**
     * Handle change in the input that modifies the number of strings displayed.
     */
    handleNumberOfStringsInputOnChange() {
        const numberOfStringsInput = document.getElementById('num-strings');
        numberOfStringsInput.onchange = (() => {
            for (let i = 0; i < this.strTableManager.stringTables.length; i++) {
                if (this.strTableManager.stringTables[i].isCurrent) {
                    this.renderStringTable('str-table', 'num-strings');
                }
            }
        }).bind(this);
    }
    /**
     * Handle click on the button to pitch down.
     */
    handlePitchDownButtonOnClick() {
        const buttonPitchDown = document.getElementsByClassName('button-pitches-decrease')[0];
        buttonPitchDown.onclick = (() => {
            this.renderPitchShifts(-1);
        }).bind(this);
    }
    /**
     * Handle click on the button to pitch up.
     */
    handlePitchUpButtonOnClick() {
        const buttonPitchUp = document.getElementsByClassName('button-pitches-increase')[0];
        buttonPitchUp.onclick = (() => {
            this.renderPitchShifts(1);
        }).bind(this);
    }
    /**
     * Handle click for the custom instrument string submission.
     */
    handleCustomStringSubmit() {
        const customSubmit = document.getElementsByClassName('submit')[0];
        if (customSubmit) {
            customSubmit.onclick = (() => {
                this.submitCustomStringData();
            }).bind(this);
        }
    }
    /**
     * Handle click for the custom instrument string interface exit.
     */
    handleCustomStringExit() {
        const customExit = document.getElementsByClassName('exit')[0];
        if (customExit) {
            customExit.onclick = (() => {
                const overlay = document.getElementsByClassName('overlay')[0];
                overlay.classList.replace('show', 'hide');
                setTimeout(() => {
                    overlay.style.display = 'none';
                }, 500);
            });
        }
    }
    /**
     * Handle click on the button to add custom user-defined instrument strings.
     */
    handleAddCustomStringsButtonOnClick() {
        const buttonAddCustomStrings = document.getElementsByClassName('add-custom-strings')[0];
        buttonAddCustomStrings.onclick = (() => {
            const overlay = document.getElementsByClassName('overlay')[0];
            if (overlay) {
                overlay.style.display = 'block';
                overlay.classList.replace('hide', 'show');
            }
            else {
                this.renderStringCustomInput();
            }
            // Handle clicks on submit or exit
            this.handleCustomStringSubmit();
            this.handleCustomStringExit();
        }).bind(this);
    }
    /**
     * Run time!
     */
    run() {
        // Render our input of type number first
        if (!document.getElementsByClassName('number-of-strings')[0]) {
            this.strTableManager.renderNumberInput();
        }
        // Event handlers
        this.handleNumberOfStringsInputOnChange();
        this.handlePitchDownButtonOnClick();
        this.handlePitchUpButtonOnClick();
        this.handleAddCustomStringsButtonOnClick();
        // Table render
        this.renderStringTable('str-table', 'num-strings');
    }
}
