export { StringInfo };

/**
 * Represents a guitar string's inalienable characteristics.
 */
class StringInfo {
    constructor(gauge, unitWeight) {
        this.gauge = gauge;
        this.unitWeight = unitWeight;
        this.collection = "";
    }

    /**
     * Sets the collection of strings this string belongs to.
     * 
     * @param {StringCollection} collection
     */
    setCollection(collection) {
        this.collection = collection;
    }
}