import { StringTable } from "../classes/StringTable.js"
import { ScaleLengthInputEnum } from "../enums/ScaleLengthInputEnum.js"

export { TableRenders }

/**
 * Managing renders used for a StringTable instance.
 */
class TableRenders {
    private _stringTable: StringTable

    constructor(stringTable: StringTable) {
        this._stringTable = stringTable
    }

    public get stringTable(): StringTable {
        return this._stringTable
    }

    public set stringTable(value: StringTable) {
        this._stringTable = value
    }

    /**
     * Renders the guitar string table.
     *
     * @param {string} tableId The id for the string table.
     */
    public table(tableId: string) {
        let strTable = document.createElement('table')

        let tr = document.createElement('tr')

        let tableHeaderCells = [
            document.createElement('th'),
            document.createElement('th'),
            document.createElement('th'),
            document.createElement('th'),
            document.createElement('th'),
            document.createElement('th'),
        ]

        tr.classList.add('row-top')
        strTable.setAttribute('id', tableId)

        tableHeaderCells[0].innerText = 'String'
        tableHeaderCells[1].innerText = 'Note'
        tableHeaderCells[2].innerText = 'Scale Length: '
        tableHeaderCells[3].innerText = 'Name'
        tableHeaderCells[4].innerText = 'Gauge'
        tableHeaderCells[5].innerText = 'Tension'

        for (let headerCell of tableHeaderCells) {
            tr.appendChild(headerCell)
        }

        strTable.appendChild(tr)

        // Add select box for scale length entry
        let scaleLengthInputSelect = document.createElement('select')
        scaleLengthInputSelect.classList.add('scale-length-input-select')
        let idx = 0
        for (let input in ScaleLengthInputEnum) {
            let option = document.createElement('option')
            option.text = input
            option.value = input
            scaleLengthInputSelect.appendChild(option)
            if (this.stringTable.scaleLengthInput === input) {
                scaleLengthInputSelect.selectedIndex = idx
            }
            idx++
        }
        tableHeaderCells[2].appendChild(scaleLengthInputSelect)

        // TODO: put this in a better location
        this.stringTable.handles.onChangeScaleLengthInputType(scaleLengthInputSelect, this.stringTable)

        // Add string rows.
        for (let i = 0; i < this.stringTable.getNumStrings(); i++) {
            let strRow = this.stringTable.makeStringRow(i + 1, this.stringTable.getString(i), this.stringTable)

            strTable.appendChild(strRow)
        }

        let tableElem = document.getElementById(tableId)!

        tableElem.parentNode!.replaceChild(strTable, tableElem)
    }
}