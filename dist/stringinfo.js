import { StringCollection } from "./stringcollection.js";
export { StringInfo };
/**
 * Represents a guitar string's inalienable characteristics.
 */
class StringInfo {
    constructor(gauge, unitWeight) {
        this._gauge = gauge;
        this._unitWeight = unitWeight;
        this._collection = new StringCollection();
    }
    get gauge() {
        return this._gauge;
    }
    set gauge(value) {
        this._gauge = value;
    }
    get unitWeight() {
        return this._unitWeight;
    }
    set unitWeight(value) {
        this._unitWeight = value;
    }
    get collection() {
        return this._collection;
    }
    set collection(value) {
        this._collection = value;
    }
}
