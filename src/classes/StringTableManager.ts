import { StringManager } from './StringManager.js'
import { StringTable } from './StringTable.js'

export { StringTableManager }

/**
 * A class for managing multiple tables.
 */
class StringTableManager  {
    protected _stringTables: StringTable[] = []
    protected _lastIndex: number = this._stringTables.length - 1

	constructor(jsonData: any) {
		StringManager.getInstance().appendFromJson(jsonData)
		this.stringTables.push(new StringTable(StringManager.getInstance().getStandardTuning()))
		this.stringTables[0].isCurrent = true
    }

	public get stringTables(): StringTable[] {
		return this._stringTables
	}

	public set stringTables(value: StringTable[]) {
		this._stringTables = value
	}
    
    protected get lastIndex(): number {
        return this._lastIndex
    }

    protected set lastIndex(value: number) {
        this._lastIndex = value
    }
}
