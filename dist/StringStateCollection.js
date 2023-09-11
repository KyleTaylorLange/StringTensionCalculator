import { StringCollection } from "./StringCollection.js";
import { Strings } from "./Strings.js";
export { StringStateCollection };
/**
 * A collection of string states - what will be displayed in the table at any given time.
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
    // NOTE: It remains to be seen whether the following two methods will be necessary - it may not
    //       but necessary to iterate through these collections in here. 
    /**
     * Get the previous string in a string collection.
     *
     * @param collection
     * @param currentString
     * @returns A string (i.e. an instance of StringInfo)
     */
    getPreviousString(collection, currentString) {
        let strPrev = currentString;
        if (collection !== undefined) {
            collection.strings.forEach((str, index) => {
                if (str === currentString && index !== 0) {
                    strPrev = collection.strings[index - 1];
                }
            });
        }
        return strPrev;
    }
    /**
     * Get the next string in a string collection.
     *
     * @param collection
     * @param currentString
     * @returns A string (i.e. an instance of StringInfo)
     */
    getNextString(collection, currentString) {
        let strNext = currentString;
        if (collection !== undefined) {
            collection.strings.forEach((str, index) => {
                if (str === currentString && index !== collection.strings.length - 1) {
                    strNext = collection.strings[index + 1];
                }
            });
        }
        return strNext;
    }
}
