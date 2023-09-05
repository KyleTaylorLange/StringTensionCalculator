"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringTension = void 0;
const utilities_js_1 = require("./utilities.js");
const note_js_1 = require("./note.js");
const stringtable_js_1 = require("./stringtable.js");
/**
 * Primary class for modulating the string tension.
 */
class StringTension {
    constructor() {
        this.stringTable = new stringtable_js_1.StringTable();
    }
    /**
     * Shift every string's pitch.
     *
     * @param {number} semitones
     */
    shiftPitches(semitones) {
        this.stringTable.shiftPitches(semitones);
        this.redrawStringTable("str-table");
    }
    /**
     * Clears the old table and re-renders a new one.
     *
     * @param {string} tableId
     * @param {string} numberId
     */
    makeStringTable(tableId, numberId) {
        let numStrings = document.getElementById(numberId).value;
        this.stringTable.setNumStrings(numStrings);
        this.redrawStringTable(tableId);
    }
    /**
     * Re-renders the guitar string table.
     *
     * @param {string} tableId
     */
    redrawStringTable(tableId) {
        let strTable = document.createElement('table');
        let tr = document.createElement('tr');
        let tableHeaderCells = [
            document.createElement('th'),
            document.createElement('th'),
            document.createElement('th'),
            document.createElement('th'),
            document.createElement('th'),
            document.createElement('th')
        ];
        tr.classList.add('row-top');
        strTable.setAttribute("id", tableId);
        tableHeaderCells[0].innerText = "String";
        tableHeaderCells[1].innerText = "Note";
        tableHeaderCells[2].innerText = "Scale";
        tableHeaderCells[3].innerText = "String Type";
        tableHeaderCells[4].innerText = "Gauge";
        tableHeaderCells[5].innerText = "Tension";
        for (let headerCell of tableHeaderCells) {
            tr.appendChild(headerCell);
        }
        strTable.appendChild(tr);
        // Add string rows.
        for (let i = 0; i < this.stringTable.getNumStrings(); i++) {
            let strRow = this.makeStringRow(i + 1, this.stringTable.getString(i));
            strTable.appendChild(strRow);
        }
        let tableElem = document.getElementById(tableId);
        tableElem.parentNode.replaceChild(strTable, tableElem);
    }
    /**
     * Makes a row for a guitar string.
     *
     * @param {number} num
     * @param {StringState} str
     * @returns {any} A string table row (tr).
     */
    makeStringRow(num, str) {
        // The calling object
        let caller = this;
        // Array that will hold our fields/columns
        let fields = [];
        // Creating our elements with their respective class names
        let tr = utilities_js_1.Utilities.createElement('tr', 'row');
        let stringNum = utilities_js_1.Utilities.createElement('td', 'string-num');
        let noteName = utilities_js_1.Utilities.createElement('td', 'note-name');
        let noteInner = utilities_js_1.Utilities.createElement('div', 'note-inner');
        let noteLetter = utilities_js_1.Utilities.createElement('span', 'note-letter', note_js_1.Note.getNoteLetter(str.note));
        let noteOctave = utilities_js_1.Utilities.createElement('sub', 'note-octave', note_js_1.Note.getNoteOctave(str.note));
        let scaleLength = utilities_js_1.Utilities.createElement('td', 'scale-length');
        let stringType = utilities_js_1.Utilities.createElement('td', 'string-type', str.stringInfo.collection.brand + " " + str.stringInfo.collection.type);
        let gauge = utilities_js_1.Utilities.createElement('td', 'gauge', (str.stringInfo.gauge * 1000));
        let tension = utilities_js_1.Utilities.createElement('td', 'tension', str.calculateStringTension());
        // Pushing the elements that constitute our fields (the columns)
        fields.push(stringNum, noteName, scaleLength, stringType, gauge, tension);
        let buttonContainer = utilities_js_1.Utilities.createElement('div', 'note-buttons');
        let buttonPitchDown = utilities_js_1.Utilities.createElement('button', 'button-pitch-down', '-');
        let buttonPitchUp = utilities_js_1.Utilities.createElement('button', 'button-pitch-up', '+');
        let scaleLengthBox = utilities_js_1.Utilities.createElement('input', 'scale-length');
        scaleLengthBox.type = "text";
        scaleLengthBox.value = str.scale.toString() + '"';
        // TODO: Make more efficient and eventually split into smaller functions.
        scaleLengthBox.onchange = function () {
            let inputScale = scaleLengthBox.value.trim();
            // Temp: convert from mm to inches.
            let convertFromMillimeters = inputScale.substring(inputScale.length - 2) == "mm";
            // Easter Egg: convert feet to inches if a single tick is input.
            let convertFromFeet = inputScale.charAt(inputScale.length - 1) == '\'';
            // Trim out units from string.
            if (inputScale.charAt(inputScale.length - 1) == '"' || convertFromFeet) {
                inputScale = inputScale.substring(0, inputScale.length - 1);
            }
            else if (convertFromMillimeters) {
                inputScale = inputScale.substring(0, inputScale.length - 2).trim();
            }
            // Attempt to convert to number.
            inputScale = Number.parseFloat(inputScale);
            // If it is a number, go ahead and set the scale and redraw the table.
            if (typeof inputScale == 'number' && Number.isFinite(inputScale)) {
                if (convertFromFeet) {
                    inputScale *= 12;
                }
                if (convertFromMillimeters) {
                    // TODO: A smart rounding system? (i.e. only if the value is very close to a certain fraction of an inch (e.g., 1/4th, 1/8th))
                    inputScale /= 25.4;
                }
                str.scale = inputScale;
                caller.redrawStringTable('str-table');
            }
            // If it is not a number, just return the original value.
            else {
                scaleLengthBox.value = str.scale + "\"";
            }
        };
        scaleLength.appendChild(scaleLengthBox);
        let gaugeContainer = utilities_js_1.Utilities.createElement('div', 'gauge-buttons');
        let buttonGaugeDecrease = utilities_js_1.Utilities.createElement('button', 'button-gauge-decrease', '-');
        let buttonGaugeIncrease = utilities_js_1.Utilities.createElement('button', 'button-gauge-increase', '+');
        stringNum.appendChild(document.createTextNode(num));
        buttonPitchDown.onclick = function () {
            str.shiftPitch(-1);
            caller.redrawStringTable('str-table');
        };
        buttonPitchUp.onclick = function () {
            str.shiftPitch(1);
            caller.redrawStringTable('str-table');
        };
        buttonGaugeDecrease.onclick = function () {
            let lighterGauge = str.stringInfo.collection.getPreviousString(str.stringInfo);
            if (lighterGauge != undefined) {
                str.stringInfo = lighterGauge;
            }
            caller.redrawStringTable('str-table');
        };
        buttonGaugeIncrease.onclick = function () {
            let heavierGauge = str.stringInfo.collection.getNextString(str.stringInfo);
            if (heavierGauge != undefined) {
                str.stringInfo = heavierGauge;
            }
            caller.redrawStringTable('str-table');
        };
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
        gaugeContainer.appendChild(buttonGaugeDecrease);
        gaugeContainer.appendChild(buttonGaugeIncrease);
        return tr;
    }
}
exports.StringTension = StringTension;
