import { StringManager } from './StringManager.js';
import { StringTable } from './StringTable.js';
export { StringTableManager };
/**
 * A class for managing multiple tables.
 */
class StringTableManager {
    constructor(jsonData) {
        this._stringTables = [];
        StringManager.getInstance().appendFromJson(jsonData);
        this.stringTables.push(new StringTable(StringManager.getInstance().getStandardTuning()));
        this.stringTables[0].isCurrent = true;
    }
    get stringTables() {
        return this._stringTables;
    }
    set stringTables(value) {
        this._stringTables = value;
    }
}
