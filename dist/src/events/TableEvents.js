import { StringManager } from "../classes/StringManager.js";
import { ScaleLengthInputEnum } from "../enums/ScaleLengthInputEnum.js";
export { TableEvents };
/**
 * Handling events for a StringTable instance.
 */
class TableEvents {
    constructor(renders) {
        this._tableRenders = renders;
    }
    get renders() {
        return this._tableRenders;
    }
    set renders(value) {
        this._tableRenders = value;
    }
    /**
     * Handles changes to the scale length input type select box.
     *
     * @param table
     */
    onChangeScaleLengthInputType(scaleLengthInputSelect, table) {
        scaleLengthInputSelect.onchange = ((event) => {
            console.log("New: ", event.target.value);
            console.log("Old: ", table.scaleLengthInput);
            if (table.scaleLengthInput !== event.target.value) {
                table.scaleLengthInput = event.target.value;
                console.log("Different value!");
                this.renders.table('str-table');
            }
        }).bind(this);
    }
    /**
     * Handles conversions on change of scale length input.
     *
     * @param scaleLengthBox
     * @param state
     */
    onChangeInputScaleLength(scaleLengthBox, state, table) {
        scaleLengthBox.type = 'text';
        scaleLengthBox.value = state.scaleLength.toString() + '"';
        scaleLengthBox.onchange = (() => {
            let inputScale = scaleLengthBox.value.trim();
            // Temp: convert from mm to inches.
            let convertFromMillimeters = inputScale.substring(inputScale.length - 2) === 'mm';
            // Easter Egg: convert feet to inches if a single tick is input.
            let convertFromFeet = inputScale.charAt(inputScale.length - 1) == "'";
            // Trim out units from string.
            if (inputScale.charAt(inputScale.length - 1) === '"' || convertFromFeet) {
                inputScale = inputScale.substring(0, inputScale.length - 1);
            }
            else if (convertFromMillimeters) {
                inputScale = inputScale.substring(0, inputScale.length - 2).trim();
            }
            // Attempt to convert to number.
            inputScale = Number.parseFloat(inputScale);
            /*
             * If it's a number, go ahead and set the scale and redraw the table.
             * Otherwise, just return the original value.
             */
            if (typeof inputScale === 'number' && Number.isFinite(inputScale)) {
                if (convertFromFeet) {
                    inputScale *= 12;
                }
                if (convertFromMillimeters) {
                    // TODO: A smart rounding system? (i.e. only if the value is very close to a certain fraction of an inch (e.g., 1/4th, 1/8th))
                    inputScale /= 25.4;
                }
                if (table.scaleLengthInput === ScaleLengthInputEnum.Single) {
                    table.setScaleLengths(inputScale);
                }
                else if (table.scaleLengthInput === ScaleLengthInputEnum.Multi) {
                    state.scaleLength = inputScale;
                    let lastStringIdx = table.getNumStrings() - 1;
                    table.setScaleLengths(table.currentStrings.states[0].scaleLength, table.currentStrings.states[lastStringIdx].scaleLength);
                }
                else {
                    state.scaleLength = inputScale;
                }
                this.renders.table('str-table');
            }
            else {
                scaleLengthBox.value = state.scaleLength + '"';
            }
        }).bind(this);
    }
    /**
     * Handles button click to pitch down.
     *
     * @param buttonPitchDown
     * @param state
     */
    onClickButtonPitchDown(buttonPitchDown, state) {
        buttonPitchDown.onclick = (() => {
            state.shiftPitch(-1);
            this.renders.table('str-table');
        }).bind(this);
    }
    /**
     * Handles button click to pitch up.
     *
     * @param buttonPitchUp
     * @param state
     */
    onClickButtonPitchUp(buttonPitchUp, state) {
        buttonPitchUp.onclick = (() => {
            state.shiftPitch(1);
            this.renders.table('str-table');
        }).bind(this);
    }
    /**
     * Handles button click to decrease gauge.
     *
     * @param buttonGaugeDecrease
     * @param state
     */
    onClickButtonDecreaseGauge(buttonGaugeDecrease, state) {
        buttonGaugeDecrease.onclick = (() => {
            let currentSeries = StringManager.getInstance().getSeriesByBrandAndType(state.strInfo.brand, state.strInfo.type);
            state.strInfo = currentSeries.getPreviousString(state.strInfo);
            this.renders.table('str-table');
        }).bind(this);
    }
    /**
     * Handles button click to increase gauge.
     *
     * @param buttonGaugeIncrease
     * @param state
     */
    onClickButtonIncreaseGauge(buttonGaugeIncrease, state) {
        buttonGaugeIncrease.onclick = (() => {
            let currentSeries = StringManager.getInstance().getSeriesByBrandAndType(state.strInfo.brand, state.strInfo.type);
            state.strInfo = currentSeries.getNextString(state.strInfo);
            this.renders.table('str-table');
        }).bind(this);
    }
}
