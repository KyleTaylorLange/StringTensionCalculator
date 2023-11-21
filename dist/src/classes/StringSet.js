import { StringManager } from './StringManager.js';
export { StringSet };
/**
 * Each method represents set of strings that one would purchase from a manufacturer.
 */
class StringSet {
    /**
     * Wrapper for function of the same name called from the StringManager Singleton.
     *
     * @param {string} brand
     * @param {string} type
     * @returns A string series.
     */
    static getSeriesByBrandAndType(brand, type) {
        return StringManager.getInstance().getSeriesByBrandAndType(brand, type);
    }
    /**
     * Get the default string info set.
     *
     * @returns An array of StringInfo objects.
     */
    static getDefaultStrings() {
        return [
            this.getSeriesByBrandAndType("D'Addario", "Plain Steel").getStringByGauge(0.01),
            this.getSeriesByBrandAndType("D'Addario", "Plain Steel").getStringByGauge(0.013),
            this.getSeriesByBrandAndType("D'Addario", "Plain Steel").getStringByGauge(0.017),
            this.getSeriesByBrandAndType("D'Addario", "XL Nickel Wound").getStringByGauge(0.026),
            this.getSeriesByBrandAndType("D'Addario", "XL Nickel Wound").getStringByGauge(0.036),
            this.getSeriesByBrandAndType("D'Addario", "XL Nickel Wound").getStringByGauge(0.046),
            this.getSeriesByBrandAndType("D'Addario", "XL Nickel Wound").getStringByGauge(0.059),
            this.getSeriesByBrandAndType("D'Addario", "XL Nickel Wound").getStringByGauge(0.074)
        ];
    }
    /**
     * Get the D'Addario EXL120 Super Light string info set.
     *
     * @returns An array of StringInfo objects.
     */
    static getDAddarioEXL120SuperLight() {
        return [
            this.getSeriesByBrandAndType("D'Addario", "Plain Steel").getStringByGauge(0.009),
            this.getSeriesByBrandAndType("D'Addario", "Plain Steel").getStringByGauge(0.011),
            this.getSeriesByBrandAndType("D'Addario", "Plain Steel").getStringByGauge(0.016),
            this.getSeriesByBrandAndType("D'Addario", "XL Nickel Wound").getStringByGauge(0.024),
            this.getSeriesByBrandAndType("D'Addario", "XL Nickel Wound").getStringByGauge(0.032),
            this.getSeriesByBrandAndType("D'Addario", "XL Nickel Wound").getStringByGauge(0.042)
        ];
    }
    /**
     * Get the D'Addario EXL120+ Super Light Plus string info set.
     *
     * @returns An array of StringInfo objects.
     */
    static getDAddarioEXL120SuperLightPlus() {
        return [
            this.getSeriesByBrandAndType("D'Addario", "Plain Steel").getStringByGauge(0.0095),
            this.getSeriesByBrandAndType("D'Addario", "Plain Steel").getStringByGauge(0.0115),
            this.getSeriesByBrandAndType("D'Addario", "Plain Steel").getStringByGauge(0.016),
            this.getSeriesByBrandAndType("D'Addario", "XL Nickel Wound").getStringByGauge(0.024),
            this.getSeriesByBrandAndType("D'Addario", "XL Nickel Wound").getStringByGauge(0.034),
            this.getSeriesByBrandAndType("D'Addario", "XL Nickel Wound").getStringByGauge(0.044)
        ];
    }
    /**
     * Get the D'Addario EXL120 Medium Electric string info set.
     *
     * @returns An array of StringInfo objects.
     */
    static getDAddarioXEL115MediumElectric() {
        return [
            this.getSeriesByBrandAndType("D'Addario", "Plain Steel").getStringByGauge(0.011),
            this.getSeriesByBrandAndType("D'Addario", "Plain Steel").getStringByGauge(0.014),
            this.getSeriesByBrandAndType("D'Addario", "Plain Steel").getStringByGauge(0.018),
            this.getSeriesByBrandAndType("D'Addario", "XL Nickel Wound").getStringByGauge(0.028),
            this.getSeriesByBrandAndType("D'Addario", "XL Nickel Wound").getStringByGauge(0.038),
            this.getSeriesByBrandAndType("D'Addario", "XL Nickel Wound").getStringByGauge(0.049)
        ];
    }
}
