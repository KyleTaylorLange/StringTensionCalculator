import { StringTension } from './dist/stringtension.js'

// So that the HTML has loaded before we start manipulating our elements with JavaScript
// So that the HTML has loaded before we start manipulating our elements with JavaScript
window.onload = function() {

	// Our string tension class
	let stringTension = new StringTension();

	// Some of our elements to be used
	let numberOfStringsInput = document.getElementsByClassName("number-of-strings")[0]
	let buttonPitchDown = document.getElementsByClassName("button-pitches-decrease")[0]
	let buttonPitchUp = document.getElementsByClassName("button-pitches-increase")[0]

	// Events
	numberOfStringsInput.onchange = function() {
		stringTension.makeStringTable('str-table','num-strings')
	}

	buttonPitchDown.onclick = function() {
		stringTension.shiftPitches(-1)
	}

	buttonPitchUp.onclick = function() {
		stringTension.shiftPitches(1)
	}

	stringTension.makeStringTable('str-table','num-strings')
}
