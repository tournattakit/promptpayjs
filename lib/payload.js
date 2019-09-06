const CONST = require('../src/constants')
const currencyCode = require('../src/currencycode');
require('./helper');

const payload = {
    /**
     * Transaction currency
     * @param {string} location Country Name
     */
    transactionCurrency(location) {
        const currency = currencyCode.filter(c => c.Location === location.toUpperCase())[0];
        if (typeof currency === 'undefined') throw new Error("Invalid country name.");

        return "53" + "03" + currency.NumericCode;
    },
    /**
     * Merchant identifier
     * @param {string} ppNumber Mobile number, National ID or Tax ID
     * @param {string} tagId Tag ID
     * @param {string} AID Application ID
     */
    merchantAcctInfo(ppNumber, options = {}, AID = CONST.AID_MERCHENT_PRESENTED) {
        if (!/^\d+$/.test(ppNumber)) throw new Error("PromptPay account must be number");

        let MAI = ""; // Merchant Account Information
        let template = "";
        if (typeof options.billerId !== 'undefined') {
            // Tag ID 30
            if(options.billerId.length !== 15 && !/^\d+$/.test(options.billerId)) throw new Error("Invalid biller ID");
            if(typeof options.ref1 === 'undefined') throw new Error("Parameter ref1 is required");
            if(typeof options.ref1.length > 20) throw new Error("The length of ref1 up to 20");

            AID = CONST.AID_DOMESTIC_MERCHANT;
            MAI += "01" + "15" + options.billerId; // Biller ID
            MAI += "02" + options.ref1.length.pad(2) + options.ref1; // Reference 1

            if (typeof option.ref2 !== 'undefined') {
                if(typeof options.ref2.length > 20) throw new Error("The length of ref2 up to 20");
                MAI += "03" + options.ref2.length.pad(2) + options.ref2; // Reference 2
            }
            template = AID + MAI;

            return "30" + template.length + template
        }
        // Tag ID 29
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
        template = AID + MAI;

        return "29" + template.length + template;;
    }
}

module.exports = payload;