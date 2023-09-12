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
}
