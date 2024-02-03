import { MainEvents } from "./events/MainEvents.js"
import { MainRenders } from "./renders/MainRenders.js"
import { StringTableManager } from "./classes/StringTableManager.js"

export { Main }

/**
 * Main class. Pass JSON data in through this.
 */
class Main {
    private _manager: StringTableManager
    private _renders: MainRenders
    private _handles: MainEvents

    constructor(jsonData: any) {
        this._manager = new StringTableManager(jsonData)
        this._renders = new MainRenders(this.manager)
        this._handles = new MainEvents(this.manager, this.renders)
    }

    public get manager(): StringTableManager {
        return this._manager
    }

    public set manager(value: StringTableManager) {
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
        // Renders input of type number first
        this.renders.numberInput()

        // Renders string select options
        this.renders.stringSelect()

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
