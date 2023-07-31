export { StringTension }

/**
 * Primary class for modulating the string tension.
 */
class StringTension {
    
    constructor() {
        // Start with standard tuning.
        this.defaultStrings = [];
        this.currentStrings = [];

        this.defaultStrings[0] = { note: 64, scale: 25.5, gauge: 10.0 };
        this.defaultStrings[1] = { note: 59, scale: 25.5, gauge: 13.0 };
        this.defaultStrings[2] = { note: 55, scale: 25.5, gauge: 17.0 };
        this.defaultStrings[3] = { note: 50, scale: 25.5, gauge: 26.0 };
        this.defaultStrings[4] = { note: 45, scale: 25.5, gauge: 36.0 };
        this.defaultStrings[5] = { note: 40, scale: 25.5, gauge: 46.0 };
        this.defaultStrings[6] = { note: 35, scale: 25.5, gauge: 59.0 };
        this.defaultStrings[7] = { note: 30, scale: 25.5, gauge: 68.0 };

        for (let i = 0; i < 6; i++) {
            this.currentStrings[i] = JSON.parse(JSON.stringify(this.defaultStrings[i]));
        }
    }


    /* MIDI notes: 0 is C-1, 127 is G9. */
    getNoteOctave(midiNote) {
        return Math.floor((midiNote / 12) -1);
    }

    getNoteLetter(midiNote) {
        let notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

        return notes[(midiNote % 12)];
    }

    noteToText(midiNote) {
        let finalText = this.getNoteLetter(midiNote) + this.getNoteOctave(midiNote);

        return finalText;
    }

    shiftPitch(semitones) {
        for (let string of this.currentStrings) {
            string.note += semitones;
        }

        this.redrawStringTable("str_table");
    }

    shiftPitchUp() {
        this.shiftPitch(1)
    }

    shiftPitchDown() {
        this.shiftPitch(-1)
    }

    makeStringTable(tableId, numberId) {
        let numStrings = document.getElementById(numberId).value;

        // Currently just clear the old table and replace it with a new one.
        // TODO: keep current strings.
        this.currentStrings = [];

        for (let i = 0; i < numStrings; i++) {
            this.currentStrings[i] = JSON.parse(JSON.stringify(this.defaultStrings[i]));
        }

        this.redrawStringTable(tableId);
    }

    redrawStringTable(tableId) {
        let strTable = document.createElement('table');
        let tr = document.createElement('tr');
        let th = [document.createElement('th'), document.createElement('th'), document.createElement('th'), document.createElement('th'), document.createElement('th'), document.createElement('th')];
        
        strTable.setAttribute("id", tableId);
        th[0].innerText = "String";
        th[1].innerText = "Note";
        th[2].innerText = "Scale";
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

    makeStringRow(number, string) {
        let tr = document.createElement('tr');
        let stringNum = document.createElement('td');
        let noteName = document.createElement('td');
        let scaleLength = document.createElement('td');
        let stringType = document.createElement('td');
        let gauge = document.createElement('td');
        let tension = document.createElement('td');

        stringNum.appendChild(document.createTextNode(number));

        noteName.innerHTML = this.getNoteLetter(string.note) + "<sub>" + this.getNoteOctave(string.note) + "</sub>";

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
