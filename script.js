import { StringTension } from './js/stringtension.js'

// So that the HTML has loaded before we start manipulating our elements with JavaScript
window.onload = function() {

	// Our string tension class
	let stringTension = new StringTension()

	// Some of our elements to be used
	let numberOfStringsInput = document.getElementsByClassName("number-of-strings")[0]
	let buttonPitchDown = document.getElementsByClassName("button-pitch-down")[0]
	let buttonPitchUp = document.getElementsByClassName("button-pitch-up")[0]

	// Events
	numberOfStringsInput.onchange = function() {
		stringTension.makeStringTable('str_table','num_strings')
	}

	buttonPitchDown.onclick = function() {
		stringTension.shiftPitchDown()
	}

	buttonPitchUp.onclick = function() {
		stringTension.shiftPitchUp()
	}

	stringTension.makeStringTable('str_table','num_strings')
}
