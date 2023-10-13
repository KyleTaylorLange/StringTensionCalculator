import { StringManager } from './StringManager.js'
import { StringTable } from './StringTable.js'

export { StringTableManager }

/**
 * A class for managing multiple tables.
 */
class StringTableManager  {
    protected _stringTables: StringTable[] = []

	constructor(jsonData: any) {
		StringManager.getInstance().appendFromJson(jsonData)
		this.stringTables.push(new StringTable(StringManager.getInstance().getStandardTuning()))
    }

	public get stringTables(): StringTable[] {
		return this._stringTables
	}

	public set stringTables(value: StringTable[]) {
		this._stringTables = value
	}
}
