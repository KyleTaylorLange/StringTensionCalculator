import { StringSeries } from "../classes/StringSeries.js";
import { StringInfo } from "../classes/StringInfo.js";
export { Strings };
/**
 * Represents guitar string brands. Each brand of guitar string is a collection, represented as a StringSeries.
 */
class Strings {
    /**
     * Get the D'Addario Plain Steel collection.
     *
     * @returns {StringSeries} D'Addario Plain Steel strings.
     */
    static dAddarioPlainSteel() {
        let dAddarioPlainSteel = new StringSeries("D'Addario", "Plain Steel", [
            new StringInfo(0.007, 0.00001085),
            new StringInfo(0.008, 0.00001418),
            new StringInfo(0.0085, 0.00001601),
            new StringInfo(0.009, 0.00001794),
            new StringInfo(0.0095, 0.00001999),
            new StringInfo(0.01, 0.00002215),
            new StringInfo(0.0105, 0.00002442),
            new StringInfo(0.011, 0.0000268),
            new StringInfo(0.0115, 0.0000293),
            new StringInfo(0.012, 0.0000319),
            new StringInfo(0.013, 0.00003744),
            new StringInfo(0.0135, 0.00004037),
            new StringInfo(0.014, 0.00004342),
            new StringInfo(0.015, 0.00004984),
            new StringInfo(0.016, 0.00005671),
            new StringInfo(0.017, 0.00006402),
            new StringInfo(0.018, 0.00007177),
            new StringInfo(0.019, 0.00007997),
            new StringInfo(0.02, 0.00008861),
            new StringInfo(0.022, 0.00010722),
            new StringInfo(0.024, 0.0001276),
            new StringInfo(0.026, 0.00014975),
        ]);
        // Pass the brand and type down from the StringSeries to each StringInfo instance
        dAddarioPlainSteel.setBrandForStrings();
        dAddarioPlainSteel.setTypeForStrings();
        return dAddarioPlainSteel;
    }
    /**
     * Get the D'Addario XL Nickel Wound collection.
     *
     * @returns {StringSeries} D'Addario XL Nickel Wound strings.
     */
    static dAddarioXLNickelWound() {
        let dAddarioXLNickelWound = new StringSeries("D'Addario", "XL Nickel Wound", [
            new StringInfo(0.017, 0.00005524),
            new StringInfo(0.018, 0.00006215),
            new StringInfo(0.019, 0.00006947),
            new StringInfo(0.02, 0.00007495),
            new StringInfo(0.021, 0.00008293),
            new StringInfo(0.022, 0.00009184),
            new StringInfo(0.024, 0.00010857),
            new StringInfo(0.026, 0.00012671),
            new StringInfo(0.028, 0.00014666),
            new StringInfo(0.03, 0.00017236),
            new StringInfo(0.032, 0.00019347),
            new StringInfo(0.034, 0.0002159),
            new StringInfo(0.036, 0.00023964),
            new StringInfo(0.038, 0.00026471),
            new StringInfo(0.039, 0.00027932),
            new StringInfo(0.042, 0.00032279),
            new StringInfo(0.044, 0.00035182),
            new StringInfo(0.046, 0.00038216),
            new StringInfo(0.048, 0.00041382),
            new StringInfo(0.049, 0.00043014),
            new StringInfo(0.052, 0.00048109),
            new StringInfo(0.054, 0.00053838),
            new StringInfo(0.056, 0.00057598),
            new StringInfo(0.059, 0.00064191),
            new StringInfo(0.06, 0.00066542),
            new StringInfo(0.062, 0.00070697),
            new StringInfo(0.064, 0.00074984),
            new StringInfo(0.066, 0.00079889),
            new StringInfo(0.068, 0.00084614),
            new StringInfo(0.07, 0.00089304),
            new StringInfo(0.072, 0.00094124),
            new StringInfo(0.074, 0.00098869),
            new StringInfo(0.08, 0.00115011),
        ]);
        // Pass the brand and type down from the StringSeries to each StringInfo instance
        dAddarioXLNickelWound.setBrandForStrings();
        dAddarioXLNickelWound.setTypeForStrings();
        return dAddarioXLNickelWound;
    }
}
