import { StringTable } from './classes/StringTable.js'

export { Main }

/**
 * Main class.
 */
class Main extends StringTable {

    constructor() {
        super()
    }

    /**
     * Shift every string's pitch and render the table.
     *
     * @param {number} semitones A semitone count.
     */
    public renderPitchShifts(semitones: number) {
        this.shiftPitches(semitones)
        this.render("str-table")
    }

    /**
     * Clears the old table and re-renders a new one.
     *
     * @param {string} tableId The id for the string table.
     * @param {string} numberId The id for the `Number of Strings` input element.
     */
    public renderStringTable(tableId: string, numberId: string) {
        let numStrings = (<HTMLInputElement>document.getElementById(numberId)).value

        this.setNumStrings(Number(numStrings))
        this.render(tableId)
    }

    /**
     * Run time!
     */
    public runTime() {
        let caller = this

        // Some of our elements to be used
        let numberOfStringsInput = <HTMLInputElement>document.getElementsByClassName("number-of-strings")[0]
        let buttonPitchDown = <HTMLInputElement>document.getElementsByClassName("button-pitches-decrease")[0]
        let buttonPitchUp = <HTMLInputElement>document.getElementsByClassName("button-pitches-increase")[0]

        // Events
        numberOfStringsInput.onchange = function () {
            caller.renderStringTable("str-table", "num-strings")
        }

        buttonPitchDown.onclick = function () {
            caller.renderPitchShifts(-1)
        }

        buttonPitchUp.onclick = function () {
            caller.renderPitchShifts(1)
        }

        caller.renderStringTable("str-table", "num-strings")
    }
}
