export { TableRenders };
/**
 * Managing renders used for a StringTable instance.
 */
class TableRenders {
    constructor(stringTable) {
        this._stringTable = stringTable;
    }
    get stringTable() {
        return this._stringTable;
    }
    set stringTable(value) {
        this._stringTable = value;
    }
    /**
     * Re-renders the guitar string table.
     *
     * @param {string} tableId The id for the string table.
     */
    table(tableId) {
        let strTable = document.createElement('table');
        let tr = document.createElement('tr');
        let tableHeaderCells = [
            document.createElement('th'),
            document.createElement('th'),
            document.createElement('th'),
            document.createElement('th'),
            document.createElement('th'),
            document.createElement('th'),
        ];
        tr.classList.add('row-top');
        strTable.setAttribute('id', tableId);
        tableHeaderCells[0].innerText = 'String';
        tableHeaderCells[1].innerText = 'Note';
        tableHeaderCells[2].innerText = 'Scale';
        tableHeaderCells[3].innerText = 'Name';
        tableHeaderCells[4].innerText = 'Gauge';
        tableHeaderCells[5].innerText = 'Tension';
        for (let headerCell of tableHeaderCells) {
            tr.appendChild(headerCell);
        }
        strTable.appendChild(tr);
        // Add string rows.
        for (let i = 0; i < this.stringTable.getNumStrings(); i++) {
            let strRow = this.stringTable.makeStringRow(i + 1, this.stringTable.getString(i), this.stringTable);
            strTable.appendChild(strRow);
        }
        let tableElem = document.getElementById(tableId);
        tableElem.parentNode.replaceChild(strTable, tableElem);
    }
}
