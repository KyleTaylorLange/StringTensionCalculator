export { StringInfo }

/**
 * Represents a guitar string's inalienable characteristics.
 */
class StringInfo implements StringMake {
    private _brand: string
    private _type: string
    private _gauge: number
    private _unitWeight: number

    constructor(gauge: number, unitWeight: number) {
        this._brand = ""
        this._type = ""
        this._gauge = gauge
        this._unitWeight = unitWeight
    }

    public get brand(): string {
        return this._brand
    }

    public set brand(value: string) {
        this._brand = value
    }

    public get type(): string {
        return this._type
    }

    public set type(value: string) {
        this._type = value
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

    /**
     * Creates StringInfo instances from JSON.
     * @param inJson The JSON to use for the StringInfo instances.
     * @returns An array of StringInfo objects. Array may be empty if none could be created.
     */
    public static createFromJson(inJson: any[]): StringInfo[] {
        let stringInfoArray: StringInfo[] = []
        for (let j in inJson) {
            let gauge = inJson[j].gauge
            let unitWeight = inJson[j].unitWeight
            if (gauge != undefined && unitWeight != undefined) {
                let strInfo = new StringInfo(gauge, unitWeight)
                stringInfoArray.push(strInfo)
            }
        }
        return stringInfoArray
    }
}
