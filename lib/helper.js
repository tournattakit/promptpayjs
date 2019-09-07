require('./prototypes');

const helper = {
    /**
     * Concat string
     * @param {string} id Tag ID
     * @param {string} value Value
     * @param {string=} len Length of value e.g. "02" or 2
     * @returns {string} Format of string is id + length + value
     */
    fmt(id, value, len) {
        switch (typeof len) {
            case 'number':
                len = len.pad(2);
                break;
            case 'undefined':
                len = value.length.pad(2);
            default:
                break;
        }
        let str = [id, len, value];
        return str.join('');
    },
    /**
     * Format string for mobile number
     * @param {string} mobileNumber Mobile number
     */
    fmtMobileNumber(mobileNumber){
        mobileNumber = mobileNumber.substring(1);
        return ["00", "66", mobileNumber].join('');
    }
}

module.exports = helper