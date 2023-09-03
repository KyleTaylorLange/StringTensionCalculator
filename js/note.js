export { Note };

class Note {
    /**
     * Gets note octave. MIDI notes: 0 is C-1, 127 is G9.
     * 
     * @param {*} midiNote 
     * @returns 
     */
    static getNoteOctave(midiNote) {
        return Math.floor((midiNote / 12) -1);
    }

    /**
     * Gets note letter.
     * 
     * @param {*} midiNote 
     * @returns 
     */
    static getNoteLetter(midiNote) {
        let notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        return notes[(midiNote % 12)];
    }

    /**
     * Returns the note letter concatenated with the octave.
     * 
     * @param {*} midiNote 
     * @returns 
     */
    static noteToString(midiNote) {
        return this.getNoteLetter(midiNote) + this.getNoteOctave(midiNote);
    }
}