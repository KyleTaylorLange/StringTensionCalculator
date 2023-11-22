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
        switch (arg) {
            case StringSetEnum.Default:
                return true;
            case StringSetEnum.EXL115:
                return true;
            case StringSetEnum.EXL120:
                return true;
            case StringSetEnum.EXL120Plus:
                return true;
            default:
                return false;
        }
    }
}
