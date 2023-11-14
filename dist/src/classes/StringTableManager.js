import { Utilities } from '../static/Utilities.js';
import { StringManager } from './StringManager.js';
import { StringTable } from './StringTable.js';
export { StringTableManager };
/**
 * A class for managing multiple tables.
 */
class StringTableManager {
    constructor(jsonData) {
        this._stringTables = [];
        StringManager.getInstance().appendFromJson(jsonData);
        this.stringTables.push(new StringTable(StringManager.getInstance().getStandardTuning()));
        this.stringTables[0].isCurrent = true;
    }
    get stringTables() {
        return this._stringTables;
    }
    set stringTables(value) {
        this._stringTables = value;
    }
    /**
     * Render the number input element to increase or decrease the string count.
     *
     * @param minVal {number} The minimum number of strings that can be displayed.
     * @param maxVal {number} The maximum number of strings that can be displayed.
     * @param defaultVal {number} The default value displayed.
     */
    renderNumberInput(minVal = 4, maxVal = 8, defaultVal = 6) {
        const inputContainer = document.getElementsByClassName('number-of-strings-container')[0];
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
}
