const { crc16xmodem } = require('crc/lib');

const CONST = require('./constants');
const currencyCode = require('./currency-code')

Number.prototype.pad = function (size = 2) {
    let str = this.toString();
    while (str.length < size) {
        str = "0" + str;
    }
    return str;
}

const initValue = {
    tagId: "29",
    amount: undefined,
    merchantName: undefined,
    location: "thailand"
}

function qrString(promptPayNumber, options = initValue) {
    const {
        tagId,
        amount,
        merchantName,
        location
    } = options;

    let qrString = "";

    //  Mandatory (M)    
    qrString += CONST.PAYLOAD_FORMAT_INDICATOR; // Payload Format Indicator
    qrString += CONST.POINT_OF_INITIATION_METHOD_DYNAMIC; // Point of Initiation Method

    qrString += merchantAcctInfo(promptPayNumber); // Merchant Account Information
    qrString += transactionCurrency(location); // Transaction Currency (ISO 4217)

    qrString += "58" + "02" + "TH"; // Country Code (ISO 3166-1 alpha-2)

    // Optional (O)
    if (typeof amount !== 'undefined') {
        // Transaction Amount
        qrString += "54" + options.amount.toFixed(2).length.pad(2) + options.amount.toFixed(2);
    }
    if (typeof merchantName !== 'undefined') {
        // Merchant Name
        qrString += "59" + options.merchantName.length.pad(2) + options.merchantName;
    }

    // CRC
    qrString += "63" + "04";
    qrString += crc16xmodem(qrString, 0xffff).toString(16);

    return qrString
}
/**
 * Merchant identifier
 * @param {string} ppNumber Mobile number, National ID or Tax ID
 * @param {string} tagId Tag ID
 * @param {string} AID Application Identifier
 */
function merchantAcctInfo(ppNumber, tagId = "29", AID = CONST.AID_MERCHENT_PRESENTED) {
    let GUID = "00" + AID.length + AID;
    let MAI = ""; // Merchant Account Information

    switch (ppNumber.length) {
        case 10:
            // mobile number
            let mobileNumber = "00" + "66" + ppNumber.substring(1);
            MAI = "01" + mobileNumber.length + mobileNumber;
            break;
        case 13:
            // id card number
            MAI = "02" + ppNumber.length + ppNumber;
            break;
        default:
            throw new Error("Invalid merchant identifier.");
    }

    const template = GUID + MAI;
    const merchantID = tagId + template.length + template; // Merchant identifier

    return merchantID;
}
/**
 * Transaction currency.
 * @param {string} location Country name
 */
function transactionCurrency(location) {
    const currency = currencyCode.filter(c => c.Location === location.toUpperCase())[0];
    if (typeof currency === 'undefined') throw new Error("Invalid location.");

    return "53" + "03" + currency.NumericCode;
}

module.exports.promptpay = qrString;