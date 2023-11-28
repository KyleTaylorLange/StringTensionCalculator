export { StringSetEnum, StringSetEnumChecker };
/**
 * Defines each of the string sets.
 */
var StringSetEnum;
(function (StringSetEnum) {
    StringSetEnum["Default"] = "Default";
    StringSetEnum["EXL120"] = "EXL120";
    StringSetEnum["EXL120Plus"] = "EXL120Plus";
    StringSetEnum["EXL115"] = "EXL115";
})(StringSetEnum || (StringSetEnum = {}));
/**
 * Check if a value is a member of the StringSetEnum.
 */
class StringSetEnumChecker {
    static isValid(arg) {
        let stringSets = Object.values(StringSetEnum);
        for (let i = 0; i < stringSets.length; i++) {
            if (arg === stringSets[i]) {
                return true;
            }
        }
        return false;
    }
}
