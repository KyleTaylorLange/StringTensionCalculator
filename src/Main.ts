import { StringCustomInput } from './classes/StringCustomInput.js'
import { StringInfo } from './classes/StringInfo.js'
import { StringManager } from './classes/StringManager.js'
import { StringTable } from './classes/StringTable.js'
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
        const tables = this.strTableManager.stringTables

        tables.forEach((table, i) => {
            if (table.isCurrent) {
                tables[i].shiftPitches(semitones)
                tables[i].render('str-table')
            }
        })
    }

    /**
     * Clears the old table and re-renders a new one.
     *
     * @param {string} tableId The id for the string table.
     * @param {string} numberId The id for the `Number of Strings` input element.
     */
    public renderStringTable(tableId: string, numberId: string) {
        const tables = this.strTableManager.stringTables
        const numStrings = (<HTMLInputElement>document.getElementById(numberId)).value!

        tables.forEach((table, i) => {
            if (table.isCurrent) {
                tables[i].setNumStrings(Number(numStrings))
                tables[i].render(tableId)
            }
        })
    }

    /**
     * Submit function for the custom string data.
     */
    public submitCustomStringData() {
        const tables = this.strTableManager.stringTables
        const overlay = <HTMLInputElement>document.getElementsByClassName('overlay')[0]
        const stringBrandValue = (<HTMLInputElement>document.getElementsByClassName('custom-string-brand')[0]).value
        const stringTypeValue = (<HTMLInputElement>document.getElementsByClassName('custom-string-type')[0]).value
        const stringGauges = <HTMLCollectionOf<Element>>document.getElementsByClassName('custom-string-gauge')
        const stringWeights = <HTMLCollectionOf<Element>>document.getElementsByClassName('custom-string-weight')

        let stringMin, stringMax, stringDefault

        let gaugeArray = []
        let weightsArray = []
        let stringObjects = []
        let stringCustomInfoArray = []
        
        // NOTE: Add logic to validate entries on submission
        for (let gauge of stringGauges) {
            let gaugeValue = (gauge as HTMLInputElement).value

            if (gaugeValue) {
                gaugeArray.push(Number(gaugeValue))
            }
        }

        for (let weight of stringWeights) {
            let weightValue = (weight as HTMLInputElement).value

            if (weightValue) {
                weightsArray.push(Number(weightValue))
            }
        }

        for (let i = 0; i < weightsArray.length; ++i) {
            if (gaugeArray[i] && weightsArray[i]) {
                stringObjects.push({ "gauge": gaugeArray[i], "unitWeight": weightsArray[i] })
            }
        }

        // If no brand name, type name, or valid strings have been entered, return early
        if (!stringBrandValue || !stringTypeValue || stringObjects.length === 0) {
            return
        }

        // Assign our variables for the input of type 'number'
        stringMax = stringObjects.length
        stringMin = 1
        stringDefault = stringMax > 6 ? 6 : stringMax

        // Push each new StringInfo object
        for (let i = 0; i < stringObjects.length; i++) {
            stringCustomInfoArray.push(
                new StringInfo(stringObjects[i].gauge, stringObjects[i].unitWeight, stringBrandValue, stringTypeValue
            ))
        }

        // Push a new string table
        tables.push(new StringTable(StringManager.getInstance().getStandardTuning(stringCustomInfoArray)))

        // Set the new string table as the current
        for (let i = 0; i < tables.length; i++) {
            if (i === tables.length - 1) {
                tables[i].canModifyGauge = false
                tables[i].isCurrent = true
                continue
            }

            tables[i].isCurrent = false
        }

        overlay.classList.replace('show', 'hide')

        setTimeout(() => {
            overlay.style.display = 'none'
        }, 500);

        this.strTableManager.renderNumberInput(stringMin, stringMax, stringDefault)
        this.renderStringTable('str-table', 'num-strings')
        this.onChangeInputNumberOfStrings()
    }

    /**
     * Handles change that modifies the number of strings displayed.
     */
    public onChangeInputNumberOfStrings() {
        const tables = this.strTableManager.stringTables
        const numberOfStringsInput = <HTMLInputElement>document.getElementById('num-strings')

        numberOfStringsInput.onchange = (() => {
            for (let i = 0; i < tables.length; i++) {
                if (tables[i].isCurrent) {
                    this.renderStringTable('str-table', 'num-strings');
                }
            }
        }).bind(this)
    }

    /**
     * Handles click to pitch all strings down.
     */
    public onClickButtonPitchesDown() {
        const buttonPitchesDown = <HTMLInputElement>document.getElementsByClassName('button-pitches-decrease')[0]

        buttonPitchesDown.onclick = (() => {
            this.renderPitchShifts(-1)
        }).bind(this)
    }

    /**
     * Handles click to pitch all strings up.
     */
    public onClickButtonPitchesUp() {
        const buttonPitchesUp = <HTMLInputElement>document.getElementsByClassName('button-pitches-increase')[0]

        buttonPitchesUp.onclick = (() => {
            this.renderPitchShifts(1)
        }).bind(this)
    }

    /**
     * Handles click for the custom instrument string submission.
     */
    public onClickSubmitCustomString() {
        const customSubmit = <HTMLInputElement>document.getElementsByClassName('submit')[0]

        if (customSubmit) {
            customSubmit.onclick = (() => {
                this.submitCustomStringData()
            }).bind(this)
        }
    }

    /**
     * Handles click for the custom instrument string interface exit.
     */
    public onClickExitCustomString() {
        const customExit = <HTMLInputElement>document.getElementsByClassName('exit')[0]

        if (customExit) {
            customExit.onclick = (() => {
                const overlay = <HTMLInputElement>document.getElementsByClassName('overlay')[0]

                overlay.classList.replace('show', 'hide')

                setTimeout(() => {
                    overlay.style.display = 'none'
                }, 500);
            })
        }
    }

    /**
     * Handles button click to add custom user-defined instrument strings.
     */
    public onClickButtonAddCustomStrings() {
        const buttonAddCustomStrings = <HTMLInputElement>document.getElementsByClassName('add-custom-strings')[0]

        buttonAddCustomStrings.onclick = (() => {
            const overlay = <HTMLInputElement>document.getElementsByClassName('overlay')[0]

            if (overlay) {
                overlay.style.display = 'block'
                overlay.classList.replace('hide', 'show')
            }
            else {
                this.renderStringCustomInput()
            }

            // Handle clicks on submit or exit
            this.onClickSubmitCustomString()
            this.onClickExitCustomString()

        }).bind(this)
    }

    /**
     * Run time!
     */
    public run() {
        // Render our input of type number first
        if (!document.getElementsByClassName('number-of-strings')[0]) {
            this.strTableManager.renderNumberInput()
        }

        // Event handlers
        this.onChangeInputNumberOfStrings()
        this.onClickButtonPitchesDown()
        this.onClickButtonPitchesUp()
        this.onClickButtonAddCustomStrings()

        // Table render
        this.renderStringTable('str-table', 'num-strings')
    }
}
