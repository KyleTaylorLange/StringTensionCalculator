import { StringInfo } from "../classes/StringInfo.js";
import { StringManager } from "../classes/StringManager.js";
import { StringSet } from "../classes/StringSet.js";
import { StringTable } from "../classes/StringTable.js";
import { StringSetEnum } from "../enums/StringSetEnum.js";
export { MainEvents };
/**
 * Handling events for Main.
 */
class MainEvents {
    constructor(manager, renders) {
        this._manager = manager;
        this._mainRenders = renders;
    }
    get manager() {
        return this._manager;
    }
    set manager(value) {
        this._manager = value;
    }
    get renders() {
        return this._mainRenders;
    }
    set renders(value) {
        this._mainRenders = value;
    }
    /**
     * Submit function for the custom string data.
     */
    submitCustomStringData() {
        const tables = this.manager.stringTables;
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
        for (let i = 0; i < weightsArray.length; ++i) {
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
        // Push each new StringInfo object
        for (let i = 0; i < stringObjects.length; i++) {
            stringCustomInfoArray.push(new StringInfo(stringObjects[i].gauge, stringObjects[i].unitWeight, stringBrandValue, stringTypeValue));
        }
        // Add our table and set the current table
        tables.push(new StringTable(StringManager.getInstance().getStandardTuning(stringCustomInfoArray)));
        this.manager.setCurrentTable();
        overlay.classList.replace('show', 'hide');
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 500);
        this.renders.numberInput(stringMin, stringMax, stringDefault);
        this.manager.renders.stringTable('str-table', 'num-strings');
        this.onChangeInputNumberOfStrings();
    }
    /**
     * Gets a string set as selected from the select/option user interface.
     *
     * @param {StringSetEnum} stringDef The name of the string set to retrieve.
     * @returns {StringInfo[]} An array of StringInfo objects.
     */
    getSelectedStringSet(stringDef) {
        switch (stringDef) {
            case StringSetEnum.Default:
                return StringSet.getDefaultStrings();
            case StringSetEnum.EXL115:
                return StringSet.getDAddarioXEL115MediumElectric();
            case StringSetEnum.EXL120:
                return StringSet.getDAddarioEXL120SuperLight();
            case StringSetEnum.EXL120Plus:
                return StringSet.getDAddarioEXL120SuperLightPlus();
        }
    }
    /**
     * Handles change that modifies the number of strings displayed.
     */
    onChangeInputNumberOfStrings() {
        const tables = this.manager.stringTables;
        const numberOfStringsInput = document.getElementById('num-strings');
        numberOfStringsInput.onchange = (() => {
            for (let i = 0; i < tables.length; i++) {
                if (tables[i].isCurrent) {
                    this.manager.renders.stringTable('str-table', 'num-strings');
                }
            }
        }).bind(this);
    }
    // BUG: We need to allow for gauge incrementing/decrementing for the StringSet objects that are effectively subsets of the larger data sets/collections as defined in the JSON data
    /**
     * Handles change for the select/option interface for string sets.
     */
    onChangeSelectStringSet() {
        const tables = this.manager.stringTables;
        const stringSetSelect = document.getElementById('string-set');
        stringSetSelect.onchange = ((event) => {
            const stringSet = this.getSelectedStringSet(event.target.value);
            // Add our table and set the current table
            tables.push(new StringTable(StringManager.getInstance().getStandardTuning(stringSet)));
            this.manager.setCurrentTable(event.target.value ? event.target.value : null);
            this.renders.numberInput(1, stringSet.length, stringSet.length > 6 ? 6 : stringSet.length);
            this.manager.renders.stringTable('str-table', 'num-strings');
            this.onChangeInputNumberOfStrings();
        }).bind(this);
    }
    /**
     * Handles click to pitch all strings down.
     */
    onClickButtonPitchesDown() {
        const buttonPitchesDown = document.getElementsByClassName('button-pitches-decrease')[0];
        buttonPitchesDown.onclick = (() => {
            this.renders.pitchShifts(-1);
        }).bind(this);
    }
    /**
     * Handles click to pitch all strings up.
     */
    onClickButtonPitchesUp() {
        const buttonPitchesUp = document.getElementsByClassName('button-pitches-increase')[0];
        buttonPitchesUp.onclick = (() => {
            this.renders.pitchShifts(1);
        }).bind(this);
    }
    /**
     * Handles click for the custom instrument string submission.
     */
    onClickSubmitCustomString() {
        const customSubmit = document.getElementsByClassName('submit')[0];
        if (customSubmit) {
            customSubmit.onclick = (() => {
                this.submitCustomStringData();
            }).bind(this);
        }
    }
    /**
     * Handles click for the custom instrument string interface exit.
     */
    onClickExitCustomString() {
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
     * Handles button click to add custom user-defined instrument strings.
     */
    onClickButtonAddCustomStrings() {
        const buttonAddCustomStrings = document.getElementsByClassName('add-custom-strings')[0];
        buttonAddCustomStrings.onclick = (() => {
            const overlay = document.getElementsByClassName('overlay')[0];
            if (overlay) {
                overlay.style.display = 'block';
                overlay.classList.replace('hide', 'show');
            }
            else {
                this.renders.stringCustomInput();
            }
            // Handle clicks on submit or exit
            this.onClickSubmitCustomString();
            this.onClickExitCustomString();
        }).bind(this);
    }
}
