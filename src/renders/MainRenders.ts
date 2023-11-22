import { StringCustomInput } from "../classes/StringCustomInput.js"
import { StringTableManager } from "../classes/StringTableManager.js"
import { StringSetEnum } from "../enums/StringSetEnum.js"
import { Utilities } from "../static/Utilities.js"

export { MainRenders }

/**
 * Managing renders uses in Main.
 */
class MainRenders {
    private _manager: StringTableManager
    private _customInput: StringCustomInput

    constructor(manager: StringTableManager) {
        this._manager = manager
        this._customInput = new StringCustomInput()
    }

    public get manager(): StringTableManager {
        return this._manager
    }

    public set manager(value: StringTableManager) {
        this._manager = value
    }

    public get customInput(): StringCustomInput {
        return this._customInput
    }

    public set customInput(value: StringCustomInput) {
        this._customInput = value
    }

    /**
     * Renders the string custom input. Allows the user to enter a custom string set for use.
     */
    public stringCustomInput() {
        this.customInput.render()
    }

    /**
     * Shift every string's pitch and render the table.
     *
     * @param {number} semitones A semitone count.
     */
    public pitchShifts(semitones: number) {
        const tables = this.manager.stringTables

        tables.forEach((table, i) => {
            if (table.isCurrent) {
                tables[i].shiftPitches(semitones)
                tables[i].renders.table('str-table')
            }
        })
    }

    /**
     * Render the number input element to increase or decrease the string count.
     * 
     * @param minVal {number} The minimum number of strings that can be displayed.
     * @param maxVal {number} The maximum number of strings that can be displayed.
     * @param defaultVal {number} The default value displayed.
     */
    public numberInput(minVal: number = 1, maxVal: number = 8, defaultVal: number = 6) {
        const inputContainer = <HTMLInputElement>document.getElementsByClassName('num-strings-inner')[0]
        const input = Utilities.createElement('input', 'number-of-strings')

        input.setAttribute('type', 'number')
        input.setAttribute('id', 'num-strings')
        input.setAttribute('name', 'num-strings')
        input.setAttribute('min', minVal)
        input.setAttribute('max', maxVal)
        input.setAttribute('value', defaultVal)

        if (document.getElementsByClassName('number-of-strings')[0]) {
            document.getElementsByClassName('number-of-strings')[0].remove()
        }

        inputContainer.appendChild(input)
    }

    /**
     * Renders the select/option interface for selecting a string set.
     */
    public stringSelect() {
        const inputContainer = <HTMLInputElement>document.getElementsByClassName('string-set-inner')[0]
        const input = Utilities.createElement('select', 'string-set-select')

        input.setAttribute('id', 'string-set')
        input.setAttribute('name', 'string-set')

        for (let name in StringSetEnum) {
            let option = document.createElement('option')
            option.text = name
            option.value = name
            input.appendChild(option)
        }

        if (document.getElementsByClassName('string-set-select')[0]) {
            document.getElementsByClassName('string-set-select')[0].remove()
        }

        inputContainer.appendChild(input)
    }
}