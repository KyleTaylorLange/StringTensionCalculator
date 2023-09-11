import { StringCollection } from "./StringCollection.js"
import { StringInfo } from "./StringInfo.js"
import { StringState } from "./StringState.js"
import { Strings } from "./Strings.js"

export { StringStateCollection }

/**
 * A collection of string states - what will be displayed in the table at any given time.
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
    
    public getCollectionByBrandAndType(brand: string, type: string) : StringCollection {
        if (this.dAddarioPlainSteel.brand === brand && this.dAddarioPlainSteel.type === type) {
            return this.dAddarioPlainSteel
        }

        if (this.dAddarioXLNickelWound.brand === brand && this.dAddarioXLNickelWound.type === type) {
            return this.dAddarioXLNickelWound
        }

        return new StringCollection("", "")
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
    public getPreviousString(collection: StringCollection, currentString: StringInfo): StringInfo {
        let strPrev = currentString

        if (collection !== undefined) {
            collection.strings.forEach((str: StringInfo, index: number) => {
                if (str === currentString && index !== 0) {
                    strPrev = collection.strings[index - 1]
                }   
            })
        }

        return strPrev
    }

    /**
     * Get the next string in a string collection.
     * 
     * @param collection 
     * @param currentString 
     * @returns A string (i.e. an instance of StringInfo)
     */
    public getNextString(collection: StringCollection, currentString: StringInfo): StringInfo {
        let strNext = currentString

        if (collection !== undefined) {
            collection.strings.forEach((str: StringInfo, index: number) => {
                if (str === currentString && index !== collection.strings.length - 1) {
                    strNext = collection.strings[index + 1]
                }   
            })
        }

        return strNext
    }
}
