import { StringCollection } from "./StringCollection.js";
import { Strings } from "./Strings.js";
export { StringStateCollection };
/**
 * A collection of string states - what will be displayed in the table at any given time.
 *
 * Regular string collections are also used to check the string brands/types against the current state.
 */
class StringStateCollection {
    constructor(states = []) {
        this._states = states;
        this._dAddarioPlainSteel = Strings.dAddarioPlainSteel();
        this._dAddarioXLNickelWound = Strings.dAddarioXLNickelWound();
    }
    get states() {
        return this._states;
    }
    set states(value) {
        this._states = value;
    }
    get dAddarioPlainSteel() {
        return this._dAddarioPlainSteel;
    }
    set dAddarioPlainSteel(value) {
        this._dAddarioPlainSteel = value;
    }
    get dAddarioXLNickelWound() {
        return this._dAddarioXLNickelWound;
    }
    set dAddarioXLNickelWound(value) {
        this._dAddarioXLNickelWound = value;
    }
    getCollectionByBrandAndType(brand, type) {
        if (this.dAddarioPlainSteel.brand === brand && this.dAddarioPlainSteel.type === type) {
            return this.dAddarioPlainSteel;
        }
        if (this.dAddarioXLNickelWound.brand === brand && this.dAddarioXLNickelWound.type === type) {
            return this.dAddarioXLNickelWound;
        }
        return new StringCollection("", "");
    }
}
