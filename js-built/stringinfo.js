"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringInfo = void 0;
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
exports.StringInfo = StringInfo;
