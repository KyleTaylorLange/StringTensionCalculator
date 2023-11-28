import { StringManager } from "./StringManager.js";
import { StringTable } from "./StringTable.js";
import { TableManagerRenders } from "../renders/TableManagerRenders.js";
import { StringSetEnum, StringSetEnumChecker } from "../enums/StringSetEnum.js";
export { StringTableManager };
/**
 * A class for managing multiple tables.
 */
class StringTableManager {
    constructor(jsonData) {
        this._stringTables = [];
        StringManager.getInstance().appendFromJson(jsonData);
        this.stringTables.push(new StringTable(StringManager.getInstance().getStandardTuning()));
        this.stringTables[0].stringSetName = StringSetEnum.Default;
        this.stringTables[0].isCurrent = true;
        this._renders = new TableManagerRenders(this);
    }
    get stringTables() {
        return this._stringTables;
    }
    set stringTables(value) {
        this._stringTables = value;
    }
    get renders() {
        return this._renders;
    }
    set renders(value) {
        this._renders = value;
    }
    /**
     * Sets the current table.
     *
     * @param tables
     */
    setCurrentTable(stringSetName = null) {
        let tables = this.stringTables;
        for (let i = 0; i < tables.length; i++) {
            if (i === tables.length - 1) {
                tables[i].stringSetName = stringSetName ? stringSetName : null;
                tables[i].canModifyGauge = StringSetEnumChecker.isValid(tables[i].stringSetName) ? true : false;
                tables[i].isCurrent = true;
                continue;
            }
            tables[i].isCurrent = false;
        }
    }
    /**
     * Get the table set as current.
     *
     * @returns A string table if found.
     */
    getCurrentTable() {
        let tables = this.stringTables;
        for (let i = tables.length - 1; i >= 0; i--) {
            if (tables[i].isCurrent === true) {
                return tables[i];
            }
        }
        return tables[tables.length - 1];
    }
}
