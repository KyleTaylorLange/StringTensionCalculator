import { Utilities } from './utilities.js'
import { Note } from './note.js'
import { StringTable } from './stringtable.js'

export { StringTension }

/**
 * Primary class for modulating the string tension.
 */
class StringTension {
    
    constructor() {
        this.stringTable = new StringTable();
    }

    /**
     * Shift every string's pitch.
     * 
     * @param {*} semitones 
     */
    shiftPitches(semitones) {
        this.stringTable.shiftPitches(semitones);
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
        this.stringTable.setNumStrings(numStrings);
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
        tableHeaderCells[2].innerText = "Scale";
        tableHeaderCells[3].innerText = "String Type";
        tableHeaderCells[4].innerText = "Gauge";
        tableHeaderCells[5].innerText = "Tension";

        for (let headerCell of tableHeaderCells) {
            tr.appendChild(headerCell)
        }

        strTable.appendChild(tr);

        // Add string rows.
        for (let i = 0; i < this.stringTable.getNumStrings(); i++) {
            let strRow = this.makeStringRow(i + 1, this.stringTable.getString(i));
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
     * @param {StringState} string 
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
        let noteLetter = Utilities.createElement('span', 'note-letter', Note.getNoteLetter(string.note))
        let noteOctave = Utilities.createElement('sub', 'note-octave', Note.getNoteOctave(string.note))
        let scaleLength = Utilities.createElement('td', 'scale-length');
        let stringType = Utilities.createElement('td', 'string-type', string.stringInfo.collection.brand + " " + string.stringInfo.collection.type);
        let gauge = Utilities.createElement('td', 'gauge', (string.stringInfo.gauge * 1000));
        let tension = Utilities.createElement('td', 'tension', string.calculateStringTension());

        // Pushing the elements that constitute our fields (the columns)
        fields.push(stringNum, noteName, scaleLength, stringType, gauge, tension)

        let buttonContainer = Utilities.createElement('div', 'note-buttons')
        let buttonPitchDown = Utilities.createElement('button', 'button-pitch-down', '-')
        let buttonPitchUp = Utilities.createElement('button', 'button-pitch-up', '+')

        let scaleLengthBox = Utilities.createElement('input', 'scale-length');
        scaleLengthBox.type = "text";
        scaleLengthBox.value = string.scale.toString() + '"';
        // TODO: Make more efficient and eventually split into smaller functions.
        scaleLengthBox.onchange = function() {
            let inputScale = scaleLengthBox.value.trim();
            // Temp: convert from mm to inches.
            let convertFromMillimeters = inputScale.substring(inputScale.length - 2) == "mm";
            // Easter Egg: convert feet to inches if a single tick is input.
            let convertFromFeet = inputScale.charAt(inputScale.length - 1) == '\'';
            // Trim out units from string.
            if (inputScale.charAt(inputScale.length - 1) == '"'  || convertFromFeet) {
                inputScale = inputScale.substring(0, inputScale.length - 1);
            }
            else if (convertFromMillimeters) {
                inputScale = inputScale.substring(0, inputScale.length - 2).trim();
            }
            // Attempt to convert to number.
            inputScale = Number.parseFloat(inputScale);
            // If it is a number, go ahead and set the scale and redraw the table.
            if (typeof inputScale == 'number' && Number.isFinite(inputScale)) {
                console.log("InputScale:", inputScale);
                if (convertFromFeet) {
                    inputScale *= 12;
                    console.log("InputScale FT:", inputScale);
                }
                if (convertFromMillimeters) {
                    // TODO: a smart rounding system? (i.e. only if the value is very close to a certain fraction of an inch (e.g., 1/4th, 1/8th))
                    inputScale /= 25.4;
                    console.log("InputScale MM:", inputScale);
                }
                console.log("InputScale:", inputScale);
                string.scale = inputScale;
                caller.redrawStringTable('str-table');
            }
            // If it is not a number, just return the original value.
            else {
                scaleLengthBox.value = string.scale + "\"";
            }
        }
        scaleLength.appendChild(scaleLengthBox);


        let gaugeContainer = Utilities.createElement('div', 'gauge-buttons');
        let buttonGaugeDecrease = Utilities.createElement('button', 'button-gauge-decrease', '-');
        let buttonGaugeIncrease = Utilities.createElement('button', 'button-gauge-increase', '+');

        stringNum.appendChild(document.createTextNode(number));

        buttonPitchDown.onclick = function() {
            string.shiftPitch(-1);
            caller.redrawStringTable('str-table');
        }

        buttonPitchUp.onclick = function() {
            string.shiftPitch(1);
            caller.redrawStringTable('str-table');
        }

        buttonGaugeDecrease.onclick = function() {
            let lighterGauge = string.stringInfo.collection.getPreviousString(string.stringInfo);
            if (lighterGauge != undefined) {
                string.stringInfo = lighterGauge;
            }
            caller.redrawStringTable('str-table');
        }

        buttonGaugeIncrease.onclick = function() {
            let heavierGauge = string.stringInfo.collection.getNextString(string.stringInfo);
            if (heavierGauge != undefined) {
                string.stringInfo = heavierGauge;
            }
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

        gauge.appendChild(gaugeContainer);
        gaugeContainer.appendChild(buttonGaugeDecrease);
        gaugeContainer.appendChild(buttonGaugeIncrease);

        return tr;
    }
}
