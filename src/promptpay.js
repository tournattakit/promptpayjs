const crc16xmodem = require('crc/lib/crc16_xmodem');
const payload = require('../lib/payload');
const CONST = require('./constants');
require('../lib/helper');

const initValue = {
    amount: undefined,
    billerId: undefined,
    merchantName: undefined,
    location: "thailand",
    ref1: undefined,
    ref2: undefined,
}

function promptpay(promptPayNumber, options = initValue) {
    let {
        amount,
        billerId,
        merchantName,
        location,
        Ref1,
        Ref2
    } = options;

    let qrString = "";

    //  Mandatory (M)    
    qrString += CONST.PAYLOAD_FORMAT_INDICATOR; // Payload Format Indicator
    qrString += CONST.POINT_OF_INITIATION_METHOD_DYNAMIC; // Point of Initiation Method
    qrString += payload.merchantAcctInfo(promptPayNumber, options); // Merchant Account Information
    qrString += CONST.TRANSACTION_CURRENCY_THB; // Transaction Currency (ISO 4217)
    // Optional (O)
    if (typeof amount !== 'undefined') {
        // Transaction Amount
        amount = amount.toFixed(2);
        console.log("amt: ", amount)
        qrString += "54" + amount.length.pad(2) + amount;
    }
    qrString += "5802TH"; // Country Code (ISO 3166-1 alpha-2)
    if (typeof merchantName !== 'undefined') {
        // Merchant Name
        qrString += "59" + options.merchantName.length.pad(2) + options.merchantName;
    }

    // CRC
    qrString += "63" + "04";
    console.log("before", qrString);
    const crc16 = crc16xmodem(qrString, 0xffff).toString(16);
    console.log("crc16: ", crc16);
    qrString += crc16;

    return qrString
}

module.exports.promptpay = promptpay;