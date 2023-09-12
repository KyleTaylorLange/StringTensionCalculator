export { StringInfo };
/**
 * Represents a guitar string's inalienable characteristics.
 */
class StringInfo {
    constructor(gauge, unitWeight) {
        this._brand = "";
        this._type = "";
        this._gauge = gauge;
        this._unitWeight = unitWeight;
    }
    get brand() {
        return this._brand;
    }
    set brand(value) {
        this._brand = value;
    }
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
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
}
