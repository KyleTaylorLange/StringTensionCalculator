import { StringState } from "./StringState.js"

export { StringStateCollection }

/**
 * A collection of string states - what will be displayed in the table at any given time.
 * // TODO: if all manipulation of the _states array occurs in other classes, this class can be replaced with the raw array.
 */
class StringStateCollection {
    private _states: StringState[]

    constructor(states: StringState[] = []) {
        this._states = states
    }

    public get states(): StringState[] {
        return this._states
    }

    public set states(value: StringState[]) {
        this._states = value
    }
}