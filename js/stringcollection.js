export { StringCollection };

/**
 * Represents a collection of guitar strings with different gauges but with other shared characteristics.
 */
class StringCollection {
    constructor(brand, type) {
        this.brand = brand;
        this.type = type;
        this.strings = [];
    }

    setStrings(strings) {
        this.strings = strings;
        strings.forEach((str) => str.setCollection(this));
    }

    /**
     * Returns the first string with the input gauge.
     *
     * @param {number} gauge The gauge to search for.
     * @returns {string} A string matching that gauge if found, otherwise undefined.
     */
    getStringByGauge(gauge) {
        for (let str of this.strings) {
            if (str.gauge == gauge) {
                return str;
            }
        }
    }

    /**
     * Gets the string before the input string in the collection.
     *
     * @param {StringInfo} strInfo
     * @returns The string before strInfo if both exist, otherwise undefined.
     */
    getPreviousString(strInfo) {
        for (let i = 1; i < this.strings.length; i++) {
            if (this.strings[i].gauge == strInfo.gauge) {
                return this.strings[i - 1];
            }
        }
    }

    /**
     * Gets the string after the input string in the collection.
     *
     * @param {StringInfo} strInfo
     * @returns The string after strInfo if both exist, otherwise undefined.
     */
    getNextString(strInfo) {
        const endpoint = this.strings.length - 1;

        for (let i = 0; i < endpoint; i++) {
            if (this.strings[i].gauge == strInfo.gauge) {
                return this.strings[i + 1];
            }
        }
    }
}
