import { StringTension } from "./classes/StringTension.js"

export { Main }

/**
 * Main class.
 */
class Main {
    private _stringTension: StringTension

    constructor() {
        this._stringTension = new StringTension()
    }

    public get stringTension(): StringTension {
        return this._stringTension
    }

    public set stringTension(value: StringTension) {
        this._stringTension = value
    }

	 /**
	  * Run time!
	  */
    public runTime() {
        let caller = this

        // Some of our elements to be used
        let numberOfStringsInput = <HTMLInputElement>document.getElementsByClassName("number-of-strings")[0]
        let buttonPitchDown = <HTMLInputElement>document.getElementsByClassName("button-pitches-decrease")[0]
        let buttonPitchUp = <HTMLInputElement>document.getElementsByClassName("button-pitches-increase")[0]

        // Events
        numberOfStringsInput.onchange = function () {
            caller.stringTension.makeStringTable("str-table", "num-strings")
        }

        buttonPitchDown.onclick = function () {
            caller.stringTension.shiftPitches(-1)
        }

        buttonPitchUp.onclick = function () {
            caller.stringTension.shiftPitches(1)
        }

        caller.stringTension.makeStringTable("str-table", "num-strings")
    }
}
