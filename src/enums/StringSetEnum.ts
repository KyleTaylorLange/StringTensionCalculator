export { StringSetEnum, StringSetEnumChecker }

/**
 * Defines each of the string sets.
 */
enum StringSetEnum {
    Default = "Default",
    EXL120 = "EXL120",
    EXL120Plus = "EXL120Plus",
    EXL115 = "EXL115"
}

/**
 * Check if a value is a member of the StringSetEnum.
 */
class StringSetEnumChecker {
    public static isValid(arg: StringSetEnum | null): boolean {
        let stringSets = Object.values(StringSetEnum)

        for (let i = 0; i < stringSets.length; i++) {
            if (arg === stringSets[i]) {
                return true
            }
        }

        return false
    }
}