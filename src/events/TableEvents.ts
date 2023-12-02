import { StringManager } from "../classes/StringManager.js"
import { StringSeries } from "../classes/StringSeries.js"
import { StringState } from "../classes/StringState.js"
import { TableRenders } from "../renders/TableRenders.js"

export { TableEvents }

/**
 * Handling events for a StringTable instance.
 */
class TableEvents {
    private _tableRenders: TableRenders

    constructor(renders: TableRenders) {
        this._tableRenders = renders
    }

    public get renders(): TableRenders {
        return this._tableRenders
    }

    public set renders(value: TableRenders) {
        this._tableRenders = value
    }

    /**
     * Handles conversions on change of scale length input.
     * 
     * @param scaleLengthBox 
     * @param state 
     */
    public onChangeInputScaleLength(scaleLengthBox: any, state: StringState) {
        scaleLengthBox.type = 'text'
        scaleLengthBox.value = state.scaleLength.toString() + '"'

        scaleLengthBox.onchange = (() => {
            let inputScale = scaleLengthBox.value.trim()

            // Temp: convert from mm to inches.
            let convertFromMillimeters = inputScale.substring(inputScale.length - 2) === 'mm'

            // Easter Egg: convert feet to inches if a single tick is input.
            let convertFromFeet = inputScale.charAt(inputScale.length - 1) == "'"

            // Trim out units from string.
            if (inputScale.charAt(inputScale.length - 1) === '"' || convertFromFeet) {
                inputScale = inputScale.substring(0, inputScale.length - 1)
            }
            else if (convertFromMillimeters) {
                inputScale = inputScale.substring(0, inputScale.length - 2).trim()
            }

            // Attempt to convert to number.
            inputScale = Number.parseFloat(inputScale)

            /* 
             * If it's a number, go ahead and set the scale and redraw the table.
             * Otherwise, just return the original value.
             */ 
            if (typeof inputScale === 'number' && Number.isFinite(inputScale)) {
                if (convertFromFeet) {
                    inputScale *= 12
                }
                if (convertFromMillimeters) {
                    // TODO: A smart rounding system? (i.e. only if the value is very close to a certain fraction of an inch (e.g., 1/4th, 1/8th))
                    inputScale /= 25.4
                }

                state.scaleLength = inputScale
                this.renders.table('str-table')
            }
            else {
                scaleLengthBox.value = state.scaleLength + '"'
            }
        }).bind(this)
    }

    /**
     * Handles button click to pitch down.
     * 
     * @param buttonPitchDown 
     * @param state 
     */
    public onClickButtonPitchDown(buttonPitchDown: HTMLInputElement, state: StringState) {
        buttonPitchDown.onclick = (() => {
            state.shiftPitch(-1)
            this.renders.table('str-table')
        }).bind(this)
    }

    /**
     * Handles button click to pitch up.
     * 
     * @param buttonPitchUp 
     * @param state 
     */
    public onClickButtonPitchUp(buttonPitchUp: HTMLInputElement, state: StringState) {
        buttonPitchUp.onclick = (() => {
            state.shiftPitch(1)
            this.renders.table('str-table')
        }).bind(this)
    }

    /**
     * Handles button click to decrease gauge.
     * 
     * @param buttonGaugeDecrease
     * @param state 
     */
    public onClickButtonDecreaseGauge(buttonGaugeDecrease: HTMLInputElement, state: StringState) {
        buttonGaugeDecrease.onclick = (() => {
            let currentSeries = StringManager.getInstance().getSeriesByBrandAndType(state.strInfo.brand, state.strInfo.type)

            state.strInfo = currentSeries.getPreviousString(state.strInfo)
            this.renders.table('str-table')
        }).bind(this)
    }

    /**
     * Handles button click to increase gauge.
     * 
     * @param buttonGaugeIncrease 
     * @param state 
     */
    public onClickButtonIncreaseGauge(buttonGaugeIncrease: HTMLInputElement, state: StringState) {
        buttonGaugeIncrease.onclick = (() => {
            let currentSeries = StringManager.getInstance().getSeriesByBrandAndType(state.strInfo.brand, state.strInfo.type)

            state.strInfo = currentSeries.getNextString(state.strInfo)
            this.renders.table('str-table')
        }).bind(this)
    }

    /**
     * Handles changes to the selected string type.
     * 
     * @param typeSelectBox The select box that
     * @param state The string state to modify.
     */
    public onChangeStringType(typeSelectBox: any, state: StringState) {
        typeSelectBox.onchange = (() => {
            let index = typeSelectBox.selectedIndex
            let option: string[] = typeSelectBox.options[index].value.split(";")
            let series: StringSeries = StringManager.getInstance().getSeriesByBrandAndType(option[0], option[1])
            console.log("Series:", series)
            state.strInfo = series.getStringByGauge(state.strInfo.gauge)
            this.renders.table('str-table')
        }).bind(this)
    }
}