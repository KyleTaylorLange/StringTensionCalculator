export { StringStateCollection };
/**
 * A collection of string states - what will be displayed in the table at any given time.
 */
class StringStateCollection {
    // TODO: If all manipulation of the _states array occurs in other classes, this class can be replaced with the raw array.
    constructor(states = []) {
        this._states = states;
    }
    get states() {
        return this._states;
    }
    set states(value) {
        this._states = value;
    }
}
