import { MainEvents } from "./events/MainEvents.js";
import { MainRenders } from "./renders/MainRenders.js";
import { StringTableManager } from "./classes/StringTableManager.js";
export { Main };
/**
 * Main class. Pass JSON data in through this.
 */
class Main {
    constructor(jsonData) {
        this._manager = new StringTableManager(jsonData);
        this._renders = new MainRenders(this.manager);
        this._handles = new MainEvents(this.manager, this.renders);
    }
    get manager() {
        return this._manager;
    }
    set manager(value) {
        this._manager = value;
    }
    get renders() {
        return this._renders;
    }
    set renders(value) {
        this._renders = value;
    }
    get handles() {
        return this._handles;
    }
    set handles(value) {
        this._handles = value;
    }
    /**
     * Run time!
     */
    run() {
        // Renders input of type number first
        this.renders.numberInput();
        // Renders string select options
        this.renders.stringSelect();
        // Event handlers
        this.handles.onChangeInputNumberOfStrings();
        this.handles.onChangeSelectStringSet();
        this.handles.onClickButtonPitchesDown();
        this.handles.onClickButtonPitchesUp();
        this.handles.onClickButtonAddCustomStrings();
        // Table render
        this.manager.renders.stringTable('str-table', 'num-strings');
    }
}
