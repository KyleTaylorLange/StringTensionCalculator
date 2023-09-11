import { StringCollection } from "./StringCollection.js"
import { StringState } from "./StringState.js"
import { Strings } from "./Strings.js"

export { StringStateCollection }

/**
 * A collection of string states - what will be displayed in the table at any given time.
 * 
 * Regular string collections are also used to check the string brands/types against the current state.
 */
class StringStateCollection {
    private _states: StringState[]
    private _dAddarioPlainSteel: StringCollection
    private _dAddarioXLNickelWound: StringCollection

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

    public get dAddarioPlainSteel(): StringCollection {
        return this._dAddarioPlainSteel
    }

    public set dAddarioPlainSteel(value: StringCollection) {
        this._dAddarioPlainSteel = value
    }

    public get dAddarioXLNickelWound(): StringCollection {
        return this._dAddarioXLNickelWound
    }

    public set dAddarioXLNickelWound(value: StringCollection) {
        this._dAddarioXLNickelWound = value
    }
    
    /**
     * Gets a collection by guitar string and string type.
     * 
     * @param {string} brand 
     * @param {string} type 
     * @returns A string collection.
     */
    public getCollectionByBrandAndType(brand: string, type: string) : StringCollection {
        if (this.dAddarioPlainSteel.brand === brand && this.dAddarioPlainSteel.type === type) {
            return this.dAddarioPlainSteel
        }

        if (this.dAddarioXLNickelWound.brand === brand && this.dAddarioXLNickelWound.type === type) {
            return this.dAddarioXLNickelWound
        }

        return new StringCollection("Undefined", "Guitar String")
    }
}
