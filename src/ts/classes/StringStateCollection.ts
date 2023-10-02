import { StringSeries } from "./StringSeries.js"
import { StringState } from "./StringState.js"
import { Strings } from "../static/Strings.js"

export { StringStateCollection }

/**
 * A collection of string states - what will be displayed in the table at any given time.
 * 
 * Regular string collections are also used to check the string brands/types against the current state.
 */
class StringStateCollection {
    private _states: StringState[]
    private _dAddarioPlainSteel: StringSeries
    private _dAddarioXLNickelWound: StringSeries

    constructor(states: StringState[] = []) {
        this._states = states
        this._dAddarioPlainSteel = Strings.dAddarioPlainSteel()
        this._dAddarioXLNickelWound = Strings.dAddarioXLNickelWound()
    }

    public get states(): StringState[] {
        return this._states
    }

    public set states(value: StringState[]) {
        this._states = value
    }

    public get dAddarioPlainSteel(): StringSeries {
        return this._dAddarioPlainSteel
    }

    public set dAddarioPlainSteel(value: StringSeries) {
        this._dAddarioPlainSteel = value
    }

    public get dAddarioXLNickelWound(): StringSeries {
        return this._dAddarioXLNickelWound
    }

    public set dAddarioXLNickelWound(value: StringSeries) {
        this._dAddarioXLNickelWound = value
    }
    
    /**
     * Gets a series by guitar string and string type.
     * 
     * @param {string} brand 
     * @param {string} type 
     * @returns A string series.
     */
    public getSeriesByBrandAndType(brand: string, type: string) : StringSeries {
        if (this.dAddarioPlainSteel.brand === brand && this.dAddarioPlainSteel.type === type) {
            return this.dAddarioPlainSteel
        }

        if (this.dAddarioXLNickelWound.brand === brand && this.dAddarioXLNickelWound.type === type) {
            return this.dAddarioXLNickelWound
        }

        return new StringSeries("Undefined", "Guitar String", [])
    }
}
