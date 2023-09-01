import { Utilities } from './utilities.js'
import { StringState } from './stringstate.js'
import { StringInfo } from './stringinfo.js'

export { StringTension }

/**
 * Primary class for modulating the string tension.
 */
class StringTension {
    
    constructor() {
        // Start with standard tuning.
        this.defaultStrings = [];
        this.currentStrings = [];

        this.defaultStrings[0] = new StringState(64, 25.5, new StringInfo(Utilities.getStringWeightTablePL()['weights'][0.010])); //{ note: 64, scale: 25.5, gauge: 10.0 };
        this.defaultStrings[1] = new StringState(59, 25.5, new StringInfo(Utilities.getStringWeightTablePL()['weights'][0.013])); //{ note: 59, scale: 25.5, gauge: 13.0 };
        this.defaultStrings[2] = new StringState(55, 25.5, new StringInfo(Utilities.getStringWeightTablePL()['weights'][0.017])); //{ note: 55, scale: 25.5, gauge: 17.0 };
        this.defaultStrings[3] = new StringState(50, 25.5, new StringInfo(Utilities.getStringWeightTableNW()['weights'][0.026])); //{ note: 50, scale: 25.5, gauge: 26.0 };
        this.defaultStrings[4] = new StringState(45, 25.5, new StringInfo(Utilities.getStringWeightTableNW()['weights'][0.036])); //{ note: 45, scale: 25.5, gauge: 36.0 };
        this.defaultStrings[5] = new StringState(40, 25.5, new StringInfo(Utilities.getStringWeightTableNW()['weights'][0.046])); //{ note: 40, scale: 25.5, gauge: 46.0 };
        this.defaultStrings[6] = new StringState(35, 25.5, new StringInfo(Utilities.getStringWeightTableNW()['weights'][0.059])); //{ note: 35, scale: 25.5, gauge: 59.0 };
        this.defaultStrings[7] = new StringState(30, 25.5, new StringInfo(Utilities.getStringWeightTableNW()['weights'][0.072])); //{ note: 30, scale: 25.5, gauge: 68.0 };

        for (let i = 0; i < 6; i++) {
            this.currentStrings[i] = new StringState(this.defaultStrings[i].note, this.defaultStrings[i].scale, this.defaultStrings[i].stringInfo);
        }
    }

    /**
     * Gets note octave. MIDI notes: 0 is C-1, 127 is G9.
     * 
     * @param {*} midiNote 
     * @returns 
     */
    getNoteOctave(midiNote) {
        return Math.floor((midiNote / 12) -1);
    }

    /**
     * Gets note letter.
     * 
     * @param {*} midiNote 
     * @returns 
     */
    getNoteLetter(midiNote) {
        let notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

        return notes[(midiNote % 12)];
    }

    /**
     * Returns the note letter concatenated with the octave.
     * 
     * @param {*} midiNote 
     * @returns 
     */
    noteToText(midiNote) {
        return this.getNoteLetter(midiNote) + this.getNoteOctave(midiNote);
    }

    /**
     * Shift every string's pitch.
     * 
     * @param {*} semitones 
     */
    shiftPitches(semitones) {
        for (let string of this.currentStrings) {
            string.shiftPitch(semitones);
        }

        this.redrawStringTable("str-table");
    }

    /**
     * Clears the old table and re-renders a new one.
     * 
     * @param {*} tableId 
     * @param {*} numberId 
     */
    makeStringTable(tableId, numberId) {
        let numStrings = document.getElementById(numberId).value;

        // TODO: Keep current strings.
        this.currentStrings = [];

        for (let i = 0; i < numStrings; i++) {
            this.currentStrings[i] = new StringState(this.defaultStrings[i].note, this.defaultStrings[i].scale, this.defaultStrings[i].stringInfo);
        }

        this.redrawStringTable(tableId);
    }

    /**
     * Re-renders the guitar string table.
     * 
     * @param {*} tableId 
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
        
        tr.classList.add('row-top')
        strTable.setAttribute("id", tableId);

        tableHeaderCells[0].innerText = "String";
        tableHeaderCells[1].innerText = "Note";
        tableHeaderCells[2].innerText = "Scale (in)";
        tableHeaderCells[3].innerText = "String Type";
        tableHeaderCells[4].innerText = "Gauge";
        tableHeaderCells[5].innerText = "Tension";

        for (let headerCell of tableHeaderCells) {
            tr.appendChild(headerCell)
        }

        strTable.appendChild(tr);

        // Add string rows.
        for (let i = 0; i < this.currentStrings.length; i++) {
            let strRow = this.makeStringRow(i + 1, this.currentStrings[i]);
            strTable.appendChild(strRow);
        }

        let tableElem = document.getElementById(tableId);

        tableElem.parentNode.replaceChild(strTable, tableElem);
        //document.getElementById(tableId).appendChild(strTable);
    }

    /**
     * Makes a row for a guitar string.
     * 
     * @param {*} number 
     * @param {*} string 
     * @returns 
     */
    makeStringRow(number, string) {
        // The calling object
        let caller = this;

        // Array that will hold our fields/columns
        let fields = [];

        // Creating our elements with their respective class names
        let tr = Utilities.createElement('tr', 'row')
        let stringNum = Utilities.createElement('td', 'string-num')
        let noteName = Utilities.createElement('td', 'note-name')
        let noteInner = Utilities.createElement('div', 'note-inner')
        let noteLetter = Utilities.createElement('span', 'note-letter', this.getNoteLetter(string.note))
        let noteOctave = Utilities.createElement('sub', 'note-octave', this.getNoteOctave(string.note))
        let scaleLength = Utilities.createElement('td', 'scale-length', string.scale.toString() + '"')
        let stringType = Utilities.createElement('td', 'string-type', 'TODO')
        let gauge = Utilities.createElement('td', 'gauge', string.gauge) // NOTE: string.gauge is undefined
        let tension = Utilities.createElement('td', 'tension', this.calculateStringTension(string))

        // Pushing the elements that constitute our fields (the columns)
        fields.push(stringNum, noteName, scaleLength, stringType, gauge, tension)

        let buttonContainer = Utilities.createElement('div', 'note-buttons')
        let buttonPitchDown = Utilities.createElement('button', 'button-pitch-down', '-')
        let buttonPitchUp = Utilities.createElement('button', 'button-pitch-up', '+')

        stringNum.appendChild(document.createTextNode(number));

        buttonPitchDown.onclick = function() {
            string.shiftPitch(-1);
            caller.redrawStringTable('str-table');
        }

        buttonPitchUp.onclick = function() {
            string.shiftPitch(1);
            caller.redrawStringTable('str-table');
        }

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
        buttonContainer.appendChild(buttonPitchDown);
        buttonContainer.appendChild(buttonPitchUp);

        return tr;
    }

    /**
     * Calculates the tension of the string.
     * @param {StringState} string
     * @returns {*} the calculated tension of the string
     */
    calculateStringTension(string) {
        // Test code to calculate note frequency.
        let note = string.note;
        let frequency = Math.pow(2, (note - 69) / 12) * 440.0;
        let unitWeight = string.stringInfo.unitWeight;
        let scaleLength = string.scale;
        let tension = (unitWeight * Math.pow((2 * scaleLength * frequency), 2)) / 386.4;
        return tension;
    }
}
