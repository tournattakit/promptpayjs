const payload = require('../lib/payload');
const CONST = require('./constants');
const { fmt } = require('../lib/helper');

const initValue = {
    amount: undefined,
    billerId: undefined,
    merchantName: undefined,
    location: "thailand",
    ref1: undefined,
    ref2: undefined,
}

function promptpay(promptPayNumber, options = initValue) {
    let { amount, merchantName } = options;

    let qrString = "";

    qrString += CONST.PAYLOAD_FORMAT_INDICATOR;
    
    qrString += CONST.POI_METHOD_DYNAMIC;

    qrString += payload.merchantAcctInfo(promptPayNumber, options);

    qrString += CONST.TRANSACTION_CURRENCY_THB;

    if (typeof amount !== 'undefined') {
        amount = amount.toFixed(2);
        qrString += fmt(CONST.root.TRAN_AMT_ID, amount);
    }

    qrString += fmt(CONST.root.CC_ID, "TH");

    if (typeof merchantName !== 'undefined') {
        qrString += fmt(CONST.root.MN_ID, merchantName);
    }

    // CRC
    qrString = payload.crc(qrString);

    return qrString
}

module.exports = promptpay;