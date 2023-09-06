import { StringCollection } from "./stringcollection.js"

export { StringInfo }

/**
 * Represents a guitar string's inalienable characteristics.
 */
class StringInfo {
    gauge: number
    unitWeight: number
    collection: StringCollection

    constructor(gauge: number, unitWeight: number) {
        this.gauge = gauge
        this.unitWeight = unitWeight
        this.collection = new StringCollection()
    }

    /**
     * Sets the collection of strings this string belongs to.
     *
     * @param {StringCollection} collection A collection of guitar strings.
     */
    setCollection(collection: StringCollection) {
        this.collection = collection
    }
}
