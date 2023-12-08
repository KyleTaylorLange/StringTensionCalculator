export { ScaleLengthInputEnum, ScaleLengthInputEnumChecker };
/**
 * Defines ways scale length can be assigned to a table's strings.
 * - Single: all strings have the same scale length.
 * - Multi: the strings gradually go from one scale length to another.
 * - Per String: each string has its own scale length.
 */
var ScaleLengthInputEnum;
(function (ScaleLengthInputEnum) {
    ScaleLengthInputEnum["Single"] = "Single";
    ScaleLengthInputEnum["Multi"] = "Multi";
    ScaleLengthInputEnum["PerString"] = "PerString";
})(ScaleLengthInputEnum || (ScaleLengthInputEnum = {}));
/**
 * Check if a value is a member of the ScaleLengthInputEnum.
 */
class ScaleLengthInputEnumChecker {
    static isValid(arg) {
        let scaleLengthInputs = Object.values(ScaleLengthInputEnum);
        for (let i = 0; i < scaleLengthInputs.length; i++) {
            if (arg === scaleLengthInputs[i]) {
                return true;
            }
        }
        return false;
    }
}
