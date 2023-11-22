export { TableManagerRenders };
/**
 * Managing renders used for a StringTableManager instance.
 */
class TableManagerRenders {
    constructor(stringTableManager) {
        this._manager = stringTableManager;
    }
    get manager() {
        return this._manager;
    }
    set manager(value) {
        this._manager = value;
    }
    /**
     * Clears the old table and renders a new one.
     *
     * @param {string} tableId The id for the string table.
     * @param {string} numberId The id for the `Number of Strings` input element.
     */
    stringTable(tableId, numberId) {
        const tables = this.manager.stringTables;
        const numStrings = document.getElementById(numberId).value;
        tables.forEach((table, i) => {
            if (table.isCurrent) {
                tables[i].setNumStrings(Number(numStrings));
                tables[i].renders.table(tableId);
            }
        });
    }
}
