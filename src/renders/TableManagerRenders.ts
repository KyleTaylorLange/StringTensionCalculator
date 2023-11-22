import { StringTableManager } from "../classes/StringTableManager.js"

export { TableManagerRenders }

/**
 * Managing renders used for a StringTableManager instance.
 */
class TableManagerRenders {
    private _manager: StringTableManager

    constructor(stringTableManager: StringTableManager) {
        this._manager = stringTableManager
    }

    public get manager(): StringTableManager {
        return this._manager
    }

    public set manager(value: StringTableManager) {
        this._manager = value
    }

    /**
     * Clears the old table and renders a new one.
     *
     * @param {string} tableId The id for the string table.
     * @param {string} numberId The id for the `Number of Strings` input element.
     */
    public stringTable(tableId: string, numberId: string) {
        const tables = this.manager.stringTables
        const numStrings = (<HTMLInputElement>document.getElementById(numberId)).value!

        tables.forEach((table, i) => {
            if (table.isCurrent) {
                tables[i].setNumStrings(Number(numStrings))
                tables[i].renders.table(tableId)
            }
        })
    }
}