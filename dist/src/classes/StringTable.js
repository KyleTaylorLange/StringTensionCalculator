import { StringStateCollection } from './StringStateCollection.js';
import { StringManager } from './StringManager.js';
import { Utilities } from '../static/Utilities.js';
import { Note } from '../static/Note.js';
export { StringTable };
/**
 * Manipulates multiple strings at once.
 */
class StringTable {
    constructor(startingStrings) {
        this._currentStrings = startingStrings;
        this._stringCache = new StringStateCollection();
        this._canModifyGauge = true;
        this._isCurrent = false;
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
     * Re-renders the guitar string table.
     *
     * @param {string} tableId The id for the string table.
     */
    render(tableId) {
        let strTable = document.createElement('table');
        let tr = document.createElement('tr');
        let tableHeaderCells = [
            document.createElement('th'),
            document.createElement('th'),
            document.createElement('th'),
            document.createElement('th'),
            document.createElement('th'),
            document.createElement('th'),
        ];
        tr.classList.add('row-top');
        strTable.setAttribute('id', tableId);
        tableHeaderCells[0].innerText = 'String';
        tableHeaderCells[1].innerText = 'Note';
        tableHeaderCells[2].innerText = 'Scale';
        tableHeaderCells[3].innerText = 'Name';
        tableHeaderCells[4].innerText = 'Gauge';
        tableHeaderCells[5].innerText = 'Tension';
        for (let headerCell of tableHeaderCells) {
            tr.appendChild(headerCell);
        }
        strTable.appendChild(tr);
        // Add string rows.
        for (let i = 0; i < this.getNumStrings(); i++) {
            let strRow = this.makeStringRow(i + 1, this.getString(i), this);
            strTable.appendChild(strRow);
        }
        let tableElem = document.getElementById(tableId);
        tableElem.parentNode.replaceChild(strTable, tableElem);
    }
    /**
     * Handles conversions on change of scale length input.
     *
     * @param scaleLengthBox
     * @param state
     */
    onChangeInputScaleLength(scaleLengthBox, state) {
        scaleLengthBox.type = 'text';
        scaleLengthBox.value = state.scaleLength.toString() + '"';
        scaleLengthBox.onchange = (() => {
            let inputScale = scaleLengthBox.value.trim();
            // Temp: convert from mm to inches.
            let convertFromMillimeters = inputScale.substring(inputScale.length - 2) === 'mm';
            // Easter Egg: convert feet to inches if a single tick is input.
            let convertFromFeet = inputScale.charAt(inputScale.length - 1) == "'";
            // Trim out units from string.
            if (inputScale.charAt(inputScale.length - 1) === '"' || convertFromFeet) {
                inputScale = inputScale.substring(0, inputScale.length - 1);
            }
            else if (convertFromMillimeters) {
                inputScale = inputScale.substring(0, inputScale.length - 2).trim();
            }
            // Attempt to convert to number.
            inputScale = Number.parseFloat(inputScale);
            /*
             * If it's a number, go ahead and set the scale and redraw the table.
             * Otherwise, just return the original value.
             */
            if (typeof inputScale === 'number' && Number.isFinite(inputScale)) {
                if (convertFromFeet) {
                    inputScale *= 12;
                }
                if (convertFromMillimeters) {
                    // TODO: A smart rounding system? (i.e. only if the value is very close to a certain fraction of an inch (e.g., 1/4th, 1/8th))
                    inputScale /= 25.4;
                }
                state.scaleLength = inputScale;
                this.render('str-table');
            }
            else {
                scaleLengthBox.value = state.scaleLength + '"';
            }
        }).bind(this);
    }
    /**
     * Handles button click to pitch down.
     *
     * @param buttonPitchDown
     * @param state
     */
    onClickButtonPitchDown(buttonPitchDown, state) {
        buttonPitchDown.onclick = (() => {
            state.shiftPitch(-1);
            this.render('str-table');
        }).bind(this);
    }
    /**
     * Handles button click to pitch up.
     *
     * @param buttonPitchUp
     * @param state
     */
    onClickButtonPitchUp(buttonPitchUp, state) {
        buttonPitchUp.onclick = (() => {
            state.shiftPitch(1);
            this.render('str-table');
        }).bind(this);
    }
    /**
     * Handles button click to decrease gauge.
     *
     * @param buttonGaugeDecrease
     * @param state
     */
    onClickButtonDecreaseGauge(buttonGaugeDecrease, state) {
        buttonGaugeDecrease.onclick = (() => {
            let currentSeries = StringManager.getInstance().getSeriesByBrandAndType(state.strInfo.brand, state.strInfo.type);
            state.strInfo = currentSeries.getPreviousString(state.strInfo);
            this.render('str-table');
        }).bind(this);
    }
    /**
     * Handles button click to increase gauge.
     *
     * @param buttonGaugeIncrease
     * @param state
     */
    onClickButtonIncreaseGauge(buttonGaugeIncrease, state) {
        buttonGaugeIncrease.onclick = (() => {
            let currentSeries = StringManager.getInstance().getSeriesByBrandAndType(state.strInfo.brand, state.strInfo.type);
            state.strInfo = currentSeries.getNextString(state.strInfo);
            this.render('str-table');
        }).bind(this);
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
        let scaleLengthBox = Utilities.createElement('input', 'scale-length');
        let gaugeContainer = Utilities.createElement('div', 'gauge-buttons');
        let buttonDecreaseGauge = Utilities.createElement('button', `button-gauge-decrease ${nullify}`, '-');
        let buttonIncreaseGauge = Utilities.createElement('button', `button-gauge-increase ${nullify}`, '+');
        scaleLength.appendChild(scaleLengthBox);
        stringNum.appendChild(document.createTextNode(num.toString()));
        // Event handlers
        this.onChangeInputScaleLength(scaleLengthBox, state);
        this.onClickButtonPitchDown(buttonPitchDown, state);
        this.onClickButtonPitchUp(buttonPitchUp, state);
        this.onClickButtonDecreaseGauge(buttonDecreaseGauge, state);
        this.onClickButtonIncreaseGauge(buttonIncreaseGauge, state);
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
