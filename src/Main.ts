import { StringCustomInput } from './classes/StringCustomInput.js'
import { StringTableManager } from './classes/StringTableManager.js'

export { Main }

/**
 * Main class. Pass JSON data in through this.
 */
class Main {
    private _strTableManager: StringTableManager
    private _stringCustomInput: StringCustomInput

    // TODO: We need a more uniform way to access the tables (this.stringTables) from StringTableManager.
    constructor(jsonData: any) {
        this._strTableManager = new StringTableManager(jsonData)
        this._stringCustomInput = new StringCustomInput()
    }

    get strTableManager(): StringTableManager {
        return this._strTableManager
    }

    set strTableManager(value: StringTableManager) {
        this._strTableManager = value
    }

    public get stringCustomInput(): StringCustomInput {
        return this._stringCustomInput
    }

    public set stringCustomInput(value: StringCustomInput) {
        this._stringCustomInput = value
    }

    /**
     * Renders the string custom input. Allows the user to enter a custom string set for use.
     */
    public renderStringCustomInput() {
        this.stringCustomInput.render()
    }

    /**
     * Shift every string's pitch and render the table.
     *
     * @param {number} semitones A semitone count.
     */
    public renderPitchShifts(semitones: number) {
        this.strTableManager.stringTables[0].shiftPitches(semitones)
        this.strTableManager.stringTables[0].render('str-table')
    }

    /**
     * Clears the old table and re-renders a new one.
     *
     * @param {string} tableId The id for the string table.
     * @param {string} numberId The id for the `Number of Strings` input element.
     */
    public renderStringTable(tableId: string, numberId: string) {
        let numStrings = (<HTMLInputElement>document.getElementById(numberId)).value!
        
        this.strTableManager.stringTables[0].setNumStrings(Number(numStrings))
        this.strTableManager.stringTables[0].render(tableId)
    }

    /**
     * Run time!
     */
    public runTime() {
        const caller = this

        // Some of our elements to be used
        let addCustomStrings = <HTMLInputElement>document.getElementsByClassName('add-custom-strings')[0]
        let numberOfStringsInput = <HTMLInputElement>document.getElementsByClassName('number-of-strings')[0]
        let buttonPitchDown = <HTMLInputElement>document.getElementsByClassName('button-pitches-decrease')[0]
        let buttonPitchUp = <HTMLInputElement>document.getElementsByClassName('button-pitches-increase')[0]

        // Events
        addCustomStrings.onclick = function() {
            caller.renderStringCustomInput()
        }
        
        numberOfStringsInput.onchange = function () {
            caller.renderStringTable('str-table', 'num-strings')
        }

        buttonPitchDown.onclick = function () {
            caller.renderPitchShifts(-1)
        }

        buttonPitchUp.onclick = function () {
            caller.renderPitchShifts(1)
        }

        caller.renderStringTable('str-table', 'num-strings')
    }
}
