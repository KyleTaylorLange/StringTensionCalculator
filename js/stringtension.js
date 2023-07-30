"use strict";

// Start with standard tuning.
var defaultStrings = [];
defaultStrings[0] = { note: 64, scale: 25.5, gauge: 10.0 };
defaultStrings[1] = { note: 59, scale: 25.5, gauge: 13.0 };
defaultStrings[2] = { note: 55, scale: 25.5, gauge: 17.0 };
defaultStrings[3] = { note: 50, scale: 25.5, gauge: 26.0 };
defaultStrings[4] = { note: 45, scale: 25.5, gauge: 36.0 };
defaultStrings[5] = { note: 40, scale: 25.5, gauge: 46.0 };
defaultStrings[6] = { note: 35, scale: 25.5, gauge: 59.0 };
defaultStrings[7] = { note: 30, scale: 25.5, gauge: 68.0 };

var currentStrings = [];
for (let i = 0; i < 6; i++) {
    currentStrings[i] = JSON.parse(JSON.stringify(defaultStrings[i]));
}

/* MIDI notes: 0 is C-1, 127 is G9. */
function getNoteOctave(midiNote) {
    return Math.floor((midiNote / 12) -1);
}

function getNoteLetter(midiNote) {
    var notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    return notes[(midiNote % 12)];
}

function noteToText(midiNote) {
    let finalText = getNoteLetter(midiNote) + getNoteOctave(midiNote);
    return finalText;
}

function shiftPitch(semitones) {
    for (let string of currentStrings) {
        string.note += semitones;
    }
    redrawStringTable("str_table");
}

function makeStringTable(tableId, numberId) {
    let numStrings = document.getElementById(numberId).value;
    // Currently just clear the old table and replace it with a new one.
    // TODO: keep current strings.
    currentStrings = [];
    for (let i = 0; i < numStrings; i++) {
        currentStrings[i] = JSON.parse(JSON.stringify(defaultStrings[i]));
    }
    redrawStringTable(tableId);
}

function redrawStringTable(tableId) {
    let strTable = document.createElement('table');
    strTable.setAttribute("id", tableId);
    let tr = document.createElement('tr');
    let th = [document.createElement('th'), document.createElement('th'), document.createElement('th'), document.createElement('th'), document.createElement('th'), document.createElement('th')];
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
    for (let i = 0; i < currentStrings.length; i++) {
        let strRow = makeStringRow(i + 1, currentStrings[i]);
        strTable.appendChild(strRow);
    }
    let tableElem = document.getElementById(tableId);
    tableElem.parentNode.replaceChild(strTable, tableElem);
    //document.getElementById(tableId).appendChild(strTable);
}

function makeStringRow(number, string) {
    let tr = document.createElement('tr');
    let stringNum = document.createElement('td');
    stringNum.appendChild(document.createTextNode(number));
    let noteName = document.createElement('td');
    noteName.innerHTML = getNoteLetter(string.note) + "<sub>" + getNoteOctave(string.note) + "</sub>";
    let scaleLength = document.createElement('td');
    scaleLength.innerHTML = string.scale.toString() + "\"";
    let stringType = document.createElement('td');
    stringType.innerHTML = "TODO";
    let gauge = document.createElement('td');
    gauge.innerHTML = string.gauge;
    let tension = document.createElement('td');
    tension.innerHTML = "TODO";
    tr.appendChild(stringNum);
    tr.appendChild(noteName);
    tr.appendChild(scaleLength);
    tr.appendChild(stringType);
    tr.appendChild(gauge);
    tr.appendChild(tension);
    return tr;
}