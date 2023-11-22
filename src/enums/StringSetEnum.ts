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
        switch (arg) {
            case StringSetEnum.Default:
                return true
            case StringSetEnum.EXL115:
                return true
            case StringSetEnum.EXL120:
                return true
            case StringSetEnum.EXL120Plus:
                return true
            default:
                return false
        }
    }
}