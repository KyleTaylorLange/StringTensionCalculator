export { Note }

class Note {
    /**
     * Gets note octave. MIDI notes: 0 is C-1, 127 is G9.
     *
     * @param {number} midiNote
     * @returns {number} A note octave.
     */
    public static getNoteOctave(midiNote: number) {
        return Math.floor(midiNote / 12 - 1);
    }

    /**
     * Gets note letter.
     *
     * @param {number} midiNote
     * @returns A note letter.
     */
    public static getNoteLetter(midiNote: number) {
        let notes = [
            "C",
            "C#",
            "D",
            "D#",
            "E",
            "F",
            "F#",
            "G",
            "G#",
            "A",
            "A#",
            "B",
        ];

        return notes[midiNote % 12];
    }

    /**
     * Returns the note letter concatenated with the octave.
     *
     * @param {number} midiNote
     * @returns A note letter and a note octave.
     */
    public static noteToString(midiNote: number) {
        return this.getNoteLetter(midiNote) + this.getNoteOctave(midiNote);
    }
}
