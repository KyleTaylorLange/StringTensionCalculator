import { StringCustomInput } from "../classes/StringCustomInput.js";
import { StringSetEnum } from "../enums/StringSetEnum.js";
import { Utilities } from "../static/Utilities.js";
export { MainRenders };
/**
 * Managing renders used in Main.
 */
class MainRenders {
    constructor(manager) {
        this._manager = manager;
        this._customInput = new StringCustomInput();
    }
    get manager() {
        return this._manager;
    }
    set manager(value) {
        this._manager = value;
    }
    get customInput() {
        return this._customInput;
    }
    set customInput(value) {
        this._customInput = value;
    }
    /**
     * Renders the string custom input. Allows the user to enter a custom string set for use.
     */
    stringCustomInput() {
        this.customInput.render();
    }
    /**
     * Shifts every string's pitch and renders the table.
     *
     * @param {number} semitones A semitone count.
     */
    pitchShifts(semitones) {
        const tables = this.manager.stringTables;
        tables.forEach((table, i) => {
            if (table.isCurrent) {
                tables[i].shiftPitches(semitones);
                tables[i].renders.table('str-table');
            }
        });
    }
    /**
     * Renders the number input element to increase or decrease the string count.
     *
     * @param minVal {number} The minimum number of strings that can be displayed.
     * @param maxVal {number} The maximum number of strings that can be displayed.
     * @param defaultVal {number} The default value displayed.
     */
    numberInput(minVal = 1, maxVal = 8, defaultVal = 6) {
        const inputContainer = document.getElementsByClassName('num-strings-inner')[0];
        const input = Utilities.createElement('input', 'number-of-strings');
        input.setAttribute('type', 'number');
        input.setAttribute('id', 'num-strings');
        input.setAttribute('name', 'num-strings');
        input.setAttribute('min', minVal);
        input.setAttribute('max', maxVal);
        input.setAttribute('value', defaultVal);
        if (document.getElementsByClassName('number-of-strings')[0]) {
            document.getElementsByClassName('number-of-strings')[0].remove();
        }
        inputContainer.appendChild(input);
    }
    /**
     * Renders the select/option interface for selecting a string set.
     */
    stringSelect() {
        const inputContainer = document.getElementsByClassName('string-set-inner')[0];
        const input = Utilities.createElement('select', 'string-set-select');
        input.setAttribute('id', 'string-set');
        input.setAttribute('name', 'string-set');
        for (let name in StringSetEnum) {
            let option = document.createElement('option');
            option.text = name;
            option.value = name;
            input.appendChild(option);
        }
        if (document.getElementsByClassName('string-set-select')[0]) {
            document.getElementsByClassName('string-set-select')[0].remove();
        }
        inputContainer.appendChild(input);
    }
}
