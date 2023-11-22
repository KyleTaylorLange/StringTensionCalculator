import { StringState } from "./StringState.js"
import { StringStateCollection } from "./StringStateCollection.js"
import { StringSetEnum } from "../enums/StringSetEnum.js"
import { TableRenders } from "../renders/TableRenders.js"
import { TableHandlers } from "../events/TableEvents.js"
import { Utilities } from "../static/Utilities.js"
import { Note } from "../static/Note.js"

export { StringTable }

/**
 * Manipulates multiple strings at once.
 */
class StringTable {
    private _currentStrings: StringStateCollection
    private _stringCache: StringStateCollection
    private _stringSetName: StringSetEnum | null = null
    private _canModifyGauge: boolean
    private _isCurrent: boolean

    private _renders: TableRenders
    private _handles: TableHandlers

    constructor(startingStrings: StringStateCollection) {
        this._currentStrings = startingStrings
        this._stringCache = new StringStateCollection()
        this._canModifyGauge = true
        this._isCurrent = false

        this._renders = new TableRenders(this)
        this._handles = new TableHandlers(this.renders)
    }

    public get currentStrings(): StringStateCollection {
        return this._currentStrings
    }

    public set currentStrings(value: StringStateCollection) {
        this._currentStrings = value
    }

    public get stringCache(): StringStateCollection {
        return this._stringCache
    }

    public set stringCache(value: StringStateCollection) {
        this._stringCache = value
    }

    public get stringSetName(): StringSetEnum | null {
        return this._stringSetName
    }

    public set stringSetName(value: StringSetEnum | null) {
        this._stringSetName = value
    }

    public get canModifyGauge(): boolean {
        return this._canModifyGauge
    }

    public set canModifyGauge(value: boolean) {
        this._canModifyGauge = value
    }

    public get isCurrent(): boolean {
        return this._isCurrent
    }

    public set isCurrent(value: boolean) {
        this._isCurrent = value
    }

    public get renders(): TableRenders {
        return this._renders
    }

    public set renders(value: TableRenders) {
        this._renders = value
    }

    public get handles(): TableHandlers {
        return this._handles
    }

    public set handles(value: TableHandlers) {
        this._handles = value
    }

    /**
     * Gets a current single string.
     *
     * @param {number} i The zero-based index for the string.
     * @returns {StringState} The string at the input index.
     */
    public getString(i: number): StringState {
        return this.currentStrings.states[i]
    }

    /**
     * Gets the number of strings in the string table.
     *
     * @returns {number} The number of strings in the string table.
     */
    public getNumStrings(): number {
        return this.currentStrings.states.length
    }

    /**
     * Adds or removes strings to be equal to the input number of strings.
     *
     * @param {number} numStrings
     */
    public setNumStrings(numStrings: number) {
        if (numStrings < 1) {
            return
        }

        while (numStrings > this.currentStrings.states.length && this.stringCache.states.length > 0) {
            this.currentStrings.states.push(this.stringCache.states.pop()!)
        }

        while (numStrings < this.currentStrings.states.length && this.currentStrings.states.length > 0) {
            this.stringCache.states.push(this.currentStrings.states.pop()!)
        }
    }

    /**
     * Shift every string's pitch.
     *
     * @param {number} semitones A semitone count.
     */
    public shiftPitches(semitones: number) {
        for (let string of this.currentStrings.states) {
            string.shiftPitch(semitones)
        }
    }

    /**
     * Makes a row for a guitar string.
     *
     * @param {number} num The string number.
     * @param {StringState} str The string state.
     * @returns {any} A string table row (tr).
     */
    public makeStringRow(num: number, state: StringState, strTable: StringTable): any {
        // If gauge buttons will have nullify class
        let nullify = this.canModifyGauge === false ? 'nullify' : ''

        // Array that will hold our fields/columns
        let fields = []

        // Creating our elements with their respective class names
        let tr = Utilities.createElement('tr', 'row')
        let stringNum = Utilities.createElement('td', 'string-num')
        let noteName = Utilities.createElement('td', 'note-name')
        let noteInner = Utilities.createElement('div', 'note-inner')
        let noteLetter = Utilities.createElement('span', 'note-letter', Note.getNoteLetter(state.note))
        let noteOctave = Utilities.createElement('sub', 'note-octave', Note.getNoteOctave(state.note))
        let scaleLength = Utilities.createElement('td', 'scale-length')
        let stringType = Utilities.createElement('td', 'string-type', state.strInfo.brand + ' ' + state.strInfo.type)
        let gauge = Utilities.createElement('td', 'gauge', state.strInfo.gauge * 1000)
        let tension = Utilities.createElement('td', 'tension', state.calculateStringTension())

        // Pushing the elements that constitute our fields (the columns)
        fields.push(stringNum, noteName, scaleLength, stringType, gauge, tension)

        let buttonContainer = Utilities.createElement('div', 'note-buttons')
        let buttonPitchDown = Utilities.createElement('button', 'button-pitch down', '-')
        let buttonPitchUp = Utilities.createElement('button', 'button-pitch up', '+')
        let scaleLengthBox = Utilities.createElement('input', 'scale-length')
        let gaugeContainer = Utilities.createElement('div', 'gauge-buttons')
        let buttonDecreaseGauge = Utilities.createElement('button', `button-gauge-decrease ${nullify}`, '-')
        let buttonIncreaseGauge = Utilities.createElement('button', `button-gauge-increase ${nullify}`, '+')

        scaleLength.appendChild(scaleLengthBox)
        stringNum.appendChild(document.createTextNode(num.toString()))

        // Event handlers
        this.handles.onChangeInputScaleLength(scaleLengthBox, state)
        this.handles.onClickButtonPitchDown(buttonPitchDown, state)
        this.handles.onClickButtonPitchUp(buttonPitchUp, state)
        this.handles.onClickButtonDecreaseGauge(buttonDecreaseGauge, state)
        this.handles.onClickButtonIncreaseGauge(buttonIncreaseGauge, state)

        // Adding each field to the row, as well as the `note-inner` element to the 'Note' field
        for (let field of fields) {
            if (field.classList.contains('note-name')) {
                field.appendChild(noteInner)
            }

            tr.appendChild(field)
        }

        // Adding the data and buttons to the 'Note' field
        noteInner.appendChild(noteLetter)
        noteInner.appendChild(noteOctave)
        noteName.appendChild(buttonContainer)
        buttonContainer.appendChild(buttonPitchDown)
        buttonContainer.appendChild(buttonPitchUp)

        gauge.appendChild(gaugeContainer)
        gaugeContainer.appendChild(buttonDecreaseGauge)
        gaugeContainer.appendChild(buttonIncreaseGauge)

        return tr
    }
}
