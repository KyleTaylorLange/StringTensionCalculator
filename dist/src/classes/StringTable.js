import { StringStateCollection } from "./StringStateCollection.js";
import { ScaleLengthInputEnum } from "../enums/ScaleLengthInputEnum.js";
import { TableRenders } from "../renders/TableRenders.js";
import { TableEvents } from "../events/TableEvents.js";
import { Utilities } from "../static/Utilities.js";
import { Note } from "../static/Note.js";
export { StringTable };
/**
 * String table class.
 */
class StringTable {
    constructor(startingStrings) {
        this._stringSetName = null;
        this._currentStrings = startingStrings;
        this._stringCache = new StringStateCollection();
        this._canModifyGauge = true;
        this._isCurrent = false;
        this._scaleLengthInput = ScaleLengthInputEnum.Single;
        this._renders = new TableRenders(this);
        this._handles = new TableEvents(this.renders);
    }
    get currentStrings() {
        return this._currentStrings;
    }
    set currentStrings(value) {
        this._currentStrings = value;
    }
    get stringCache() {
        return this._stringCache;
    }
    set stringCache(value) {
        this._stringCache = value;
    }
    get stringSetName() {
        return this._stringSetName;
    }
    set stringSetName(value) {
        this._stringSetName = value;
    }
    get canModifyGauge() {
        return this._canModifyGauge;
    }
    set canModifyGauge(value) {
        this._canModifyGauge = value;
    }
    get isCurrent() {
        return this._isCurrent;
    }
    set isCurrent(value) {
        this._isCurrent = value;
    }
    get scaleLengthInput() {
        return this._scaleLengthInput;
    }
    set scaleLengthInput(value) {
        this._scaleLengthInput = value;
    }
    get renders() {
        return this._renders;
    }
    set renders(value) {
        this._renders = value;
    }
    get handles() {
        return this._handles;
    }
    set handles(value) {
        this._handles = value;
    }
    /**
     * Gets a current single string.
     *
     * @param {number} i The zero-based index for the string.
     * @returns {StringState} The string at the input index.
     */
    getString(i) {
        return this.currentStrings.states[i];
    }
    /**
     * Gets the number of strings in the string table.
     *
     * @returns {number} The number of strings in the string table.
     */
    getNumStrings() {
        return this.currentStrings.states.length;
    }
    /**
     * Adds or removes strings to be equal to the input number of strings.
     *
     * @param {number} numStrings
     */
    setNumStrings(numStrings) {
        if (numStrings < 1) {
            return;
        }
        while (numStrings > this.currentStrings.states.length && this.stringCache.states.length > 0) {
            this.currentStrings.states.push(this.stringCache.states.pop());
        }
        while (numStrings < this.currentStrings.states.length && this.currentStrings.states.length > 0) {
            this.stringCache.states.push(this.currentStrings.states.pop());
        }
    }
    /**
     * Shift every string's pitch.
     *
     * @param {number} semitones A semitone count.
     */
    shiftPitches(semitones) {
        for (let string of this.currentStrings.states) {
            string.shiftPitch(semitones);
        }
    }
    /**
     * Sets the scale length for every string in this table.
     * Entering just firstScale assigns it to every string.
     * Entering both scale lengths calculates the scales of the intermediate strings.
     * No calculation occurs if both values are <= 0.
     *
     * @param firstScale The scale length of the high string (and all strings if only value).
     * @param secondScale The scale length of the low string.
     */
    setScaleLengths(firstScale, secondScale = 0) {
        if (firstScale <= 0) {
            return;
        }
        // Single scale length: assign it to all strings.
        if (secondScale <= 0) {
            for (let i = 0; i < this.getNumStrings(); i++) {
                this.getString(i).scaleLength = firstScale;
            }
        }
        // Handle multiscale calculations.
        else {
            let difference = secondScale - firstScale;
            let numStrings = this.getNumStrings();
            for (let i = 0; i < numStrings; i++) {
                this.getString(i).scaleLength = firstScale + (difference * (i / (numStrings - 1)));
            }
        }
    }
    /**
     * Makes a row for a guitar string.
     *
     * @param {number} num The string number.
     * @param {StringState} str The string state.
     * @returns {any} A string table row (tr).
     */
    makeStringRow(num, state, strTable) {
        // If gauge buttons will have nullify class
        let nullify = this.canModifyGauge === false ? 'nullify' : '';
        let nullifyScaleLength = '';
        if (this.scaleLengthInput === ScaleLengthInputEnum.Single && num !== 1) {
            nullifyScaleLength = 'nullify';
            console.log("Single Num", num);
        }
        if (this.scaleLengthInput === ScaleLengthInputEnum.Multi && num !== 1 && num !== (this.getNumStrings())) {
            nullifyScaleLength = 'nullify';
            console.log("Multi Num", num);
        }
        console.log("Num", num, "Null", nullifyScaleLength, "Type", this.scaleLengthInput);
        // Array that will hold our fields/columns
        let fields = [];
        // Creating our elements with their respective class names
        let tr = Utilities.createElement('tr', 'row');
        let stringNum = Utilities.createElement('td', 'string-num');
        let noteName = Utilities.createElement('td', 'note-name');
        let noteInner = Utilities.createElement('div', 'note-inner');
        let noteLetter = Utilities.createElement('span', 'note-letter', Note.getNoteLetter(state.note));
        let noteOctave = Utilities.createElement('sub', 'note-octave', Note.getNoteOctave(state.note));
        let scaleLength = Utilities.createElement('td', 'scale-length');
        let stringType = Utilities.createElement('td', 'string-type', state.strInfo.brand + ' ' + state.strInfo.type);
        let gauge = Utilities.createElement('td', 'gauge', state.strInfo.gauge * 1000);
        let tension = Utilities.createElement('td', 'tension', state.calculateStringTension());
        // Pushing the elements that constitute our fields (the columns)
        fields.push(stringNum, noteName, scaleLength, stringType, gauge, tension);
        let buttonContainer = Utilities.createElement('div', 'note-buttons');
        let buttonPitchDown = Utilities.createElement('button', 'button-pitch down', '-');
        let buttonPitchUp = Utilities.createElement('button', 'button-pitch up', '+');
        let scaleLengthBox = Utilities.createElement('input', `scale-length ${nullifyScaleLength}`);
        let gaugeContainer = Utilities.createElement('div', 'gauge-buttons');
        let buttonDecreaseGauge = Utilities.createElement('button', `button-gauge-decrease ${nullify}`, '-');
        let buttonIncreaseGauge = Utilities.createElement('button', `button-gauge-increase ${nullify}`, '+');
        scaleLength.appendChild(scaleLengthBox);
        stringNum.appendChild(document.createTextNode(num.toString()));
        // Event handlers
        this.handles.onChangeInputScaleLength(scaleLengthBox, state, this);
        this.handles.onClickButtonPitchDown(buttonPitchDown, state);
        this.handles.onClickButtonPitchUp(buttonPitchUp, state);
        this.handles.onClickButtonDecreaseGauge(buttonDecreaseGauge, state);
        this.handles.onClickButtonIncreaseGauge(buttonIncreaseGauge, state);
        // Adding each field to the row, as well as the `note-inner` element to the 'Note' field
        for (let field of fields) {
            if (field.classList.contains('note-name')) {
                field.appendChild(noteInner);
            }
            tr.appendChild(field);
        }
        // Adding the data and buttons to the 'Note' field
        noteInner.appendChild(noteLetter);
        noteInner.appendChild(noteOctave);
        noteName.appendChild(buttonContainer);
        buttonContainer.appendChild(buttonPitchDown);
        buttonContainer.appendChild(buttonPitchUp);
        gauge.appendChild(gaugeContainer);
        gaugeContainer.appendChild(buttonDecreaseGauge);
        gaugeContainer.appendChild(buttonIncreaseGauge);
        return tr;
    }
}
