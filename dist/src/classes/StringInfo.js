export { StringInfo };
/**
 * Represents a guitar string's inalienable characteristics.
 */
class StringInfo {
    constructor(gauge, unitWeight, brand = '', type = '') {
        this._gauge = gauge;
        this._unitWeight = unitWeight;
        this._brand = brand;
        this._type = type;
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
    /**
     * Creates StringInfo instances from JSON.
     *
     * @param inJson The JSON to use for the StringInfo instances.
     * @returns An array of StringInfo objects. Array may be empty if none could be created.
     */
    static createFromJson(inJson) {
        let stringInfoArray = [];
        for (let j in inJson) {
            let gauge = inJson[j].gauge;
            let unitWeight = inJson[j].unitWeight;
            if (gauge != undefined && unitWeight != undefined) {
                stringInfoArray.push(new StringInfo(gauge, unitWeight));
            }
        }
        return stringInfoArray;
    }
}
