import { StringTable } from './StringTable.js';
export { StringTableManager };
/**
 * Manipulates multiple strings at once.
 *
 * // TODO: We need to implement a uniform way of accessing the string tables form StringTableManager
 * //		within Main. Currently, it just accesses the first element of the array, as there is only one
 * //		StringTable being used.
 */
class StringTableManager {
    constructor(jsonData) {
        this._stringTables = [];
        this._stringTables.push(new StringTable(jsonData));
    }
    get stringTables() {
        return this._stringTables;
    }
    set stringTables(value) {
        this._stringTables = value;
    }
}
