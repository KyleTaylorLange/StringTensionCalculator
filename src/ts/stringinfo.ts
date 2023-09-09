import { StringCollection } from "./stringcollection.js"

export { StringInfo }

/**
 * Represents a guitar string's inalienable characteristics.
 */
class StringInfo {
    private _gauge: number
    private _unitWeight: number
    private _collection: StringCollection

    constructor(gauge: number, unitWeight: number) {
        this._gauge = gauge
        this._unitWeight = unitWeight
        this._collection = new StringCollection()
    }

    public get gauge() {
        return this._gauge
    }

    public set gauge(value: number) {
        this._gauge = value
    }

    public get unitWeight(): number {
        return this._unitWeight
    }

    public set unitWeight(value: number) {
        this._unitWeight = value
    }

    public get collection() {
        return this._collection
    }

    public set collection(value: StringCollection) {
        this._collection = value
    }
}
