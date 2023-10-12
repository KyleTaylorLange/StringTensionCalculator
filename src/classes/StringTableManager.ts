import { StringTable } from './StringTable.js'

export { StringTableManager }

/**
 * A class for managing multiple tables.
 */
class StringTableManager  {
    protected _stringTables: StringTable[] = []

	constructor(jsonData: any) {
		this._stringTables.push(new StringTable(jsonData))
    }

	public get stringTables(): StringTable[] {
		return this._stringTables
	}

	public set stringTables(value: StringTable[]) {
		this._stringTables = value
	}
}
