import { MainEvents } from './events/MainEvents.js'
import { MainRenders } from './renders/MainRenders.js'
import { StringTableManager } from './classes/StringTableManager.js'
export { Main }

/**
 * Main class. Pass JSON data in through this.
 */
class Main {
    private _manager: StringTableManager
    private _renders: MainRenders
    private _handles: MainEvents

    // TODO: We need a more uniform way to access the tables (this.stringTables) from StringTableManager.
    constructor(jsonData: any) {
        this._manager = new StringTableManager(jsonData)
        this._renders = new MainRenders(this.manager)
        this._handles = new MainEvents(this.manager, this.renders)
    }

    get manager(): StringTableManager {
        return this._manager
    }

    set manager(value: StringTableManager) {
        this._manager = value
    }

    public get renders(): MainRenders {
        return this._renders
    }

    public set renders(value: MainRenders) {
        this._renders = value
    }

    public get handles(): MainEvents {
        return this._handles
    }

    public set handles(value: MainEvents) {
        this._handles = value
    }

    /**
     * Run time!
     */
    public run() {
        // Render our input of type number first
        if (!document.getElementsByClassName('num-strings')[0]) {
            this.renders.numberInput()
        }

        // Render our string select options
        if (!document.getElementsByClassName('string-set')[0]) {
            this.renders.stringSelect()
        }

        // Event handlers
        this.handles.onChangeInputNumberOfStrings()
        this.handles.onChangeSelectStringSet()
        this.handles.onClickButtonPitchesDown()
        this.handles.onClickButtonPitchesUp()
        this.handles.onClickButtonAddCustomStrings()
        
        // Table render
        this.manager.renders.stringTable('str-table', 'num-strings')
    }
}
