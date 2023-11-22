
import { StringManager } from "./StringManager.js"
import { StringTable } from "./StringTable.js"
import { TableManagerRenders } from "../renders/TableManagerRenders.js"

export { StringTableManager }

/**
 * A class for managing multiple tables.
 */
class StringTableManager {
    protected _stringTables: StringTable[] = []
    private _renders: TableManagerRenders

    constructor(jsonData: any) {
        StringManager.getInstance().appendFromJson(jsonData)
        this.stringTables.push(new StringTable(StringManager.getInstance().getStandardTuning()))
        this.stringTables[0].isCurrent = true

        this._renders = new TableManagerRenders(this)
    }

    public get stringTables(): StringTable[] {
        return this._stringTables
    }

    public set stringTables(value: StringTable[]) {
        this._stringTables = value
    }

    public get renders(): TableManagerRenders {
        return this._renders
    }

    public set renders(value: TableManagerRenders) {
        this._renders = value
    }

    /**
     * Sets the current table.
     * 
     * @param tables 
     */
    public setCurrentTable() {
        let tables = this.stringTables

        for (let i = 0; i < tables.length; i++) {
            if (i === tables.length - 1) {
                tables[i].canModifyGauge = false
                tables[i].isCurrent = true
                continue
            }

            tables[i].isCurrent = false
        }
    }

    /**
     * Get the table set as current.
     * 
     * @returns A string table if found, else throws an error.
     */
    public getCurrentTable(): StringTable | Error {
        let tables = this.stringTables

        for (let i = tables.length - 1; i >= 0; i--) {
            if (tables[i].isCurrent === true) {
                return tables[i]
            }
        }

        throw Error('No table is set as current.')
    }
}
