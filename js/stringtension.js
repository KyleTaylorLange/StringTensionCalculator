import { StringState } from './stringstate.js'

export { StringTension }

/**
 * Primary class for modulating the string tension.
 */
class StringTension {
    
    constructor() {
        // Start with standard tuning.
        this.defaultStrings = [];
        this.currentStrings = [];

        this.defaultStrings[0] = new StringState(64, 25.5); //{ note: 64, scale: 25.5, gauge: 10.0 };
        this.defaultStrings[1] = new StringState(59, 25.5); //{ note: 59, scale: 25.5, gauge: 13.0 };
        this.defaultStrings[2] = new StringState(55, 25.5); //{ note: 55, scale: 25.5, gauge: 17.0 };
        this.defaultStrings[3] = new StringState(50, 25.5); //{ note: 50, scale: 25.5, gauge: 26.0 };
        this.defaultStrings[4] = new StringState(45, 25.5); //{ note: 45, scale: 25.5, gauge: 36.0 };
        this.defaultStrings[5] = new StringState(40, 25.5); //{ note: 40, scale: 25.5, gauge: 46.0 };
        this.defaultStrings[6] = new StringState(35, 25.5); //{ note: 35, scale: 25.5, gauge: 59.0 };
        this.defaultStrings[7] = new StringState(30, 25.5); //{ note: 30, scale: 25.5, gauge: 68.0 };

        for (let i = 0; i < 6; i++) {
            this.currentStrings[i] = new StringState(this.defaultStrings[i].note, this.defaultStrings[i].scale);
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

        this.redrawStringTable("str_table");
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
            this.currentStrings[i] = new StringState(this.defaultStrings[i].note, this.defaultStrings[i].scale);
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
        let th = [document.createElement('th'), document.createElement('th'), document.createElement('th'), document.createElement('th'), document.createElement('th'), document.createElement('th')];
        
        strTable.setAttribute("id", tableId);

        th[0].innerText = "String";
        th[1].innerText = "Note";
        th[2].innerText = "Scale (in)";
        th[3].innerText = "String Type";
        th[4].innerText = "Gauge";
        th[5].innerText = "Tension";

        for (let heading of th) {
            tr.appendChild(heading);
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
        let caller = this;

        let tr = document.createElement('tr');
        let stringNum = document.createElement('td');
        let noteName = document.createElement('td');
        let scaleLength = document.createElement('td');
        let stringType = document.createElement('td');
        let gauge = document.createElement('td');
        let tension = document.createElement('td');

        let buttonPitchDown = document.createElement('button');
        let buttonPitchUp = document.createElement('button');

        stringNum.appendChild(document.createTextNode(number));

        // Write the note's name, but also create two buttons to change the individual string's pitch.
        noteName.innerHTML = this.getNoteLetter(string.note) + "<sub>" + this.getNoteOctave(string.note) + "</sub>";

        buttonPitchDown.innerHTML = '-';
        buttonPitchUp.innerHTML = '+';

        buttonPitchDown.onclick = function() {
            string.shiftPitch(-1);
            caller.redrawStringTable('str_table');
        }

        buttonPitchUp.onclick = function() {
            string.shiftPitch(1);
            caller.redrawStringTable('str_table');
        }

        noteName.appendChild(buttonPitchDown);
        noteName.appendChild(buttonPitchUp);

        scaleLength.innerHTML = string.scale.toString() + "\"";

        stringType.innerHTML = "TODO";

        gauge.innerHTML = string.gauge;

        tension.innerHTML = "TODO";

        tr.appendChild(stringNum);
        tr.appendChild(noteName);
        tr.appendChild(scaleLength);
        tr.appendChild(stringType);
        tr.appendChild(gauge);
        tr.appendChild(tension);

        return tr;
    }
}
