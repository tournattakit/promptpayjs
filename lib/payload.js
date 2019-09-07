const crc16xmodem = require('crc/lib/crc16_xmodem');
const CONST = require('../src/constants');
const { fmt, fmtMobileNumber } = require('./helper');
require('./prototypes');

const payload = {
    /**
     * Merchant identifier
     * @param {string} ppNumber Mobile number, National ID or Tax ID
     * @param {string} tagId Tag ID
     * @param {string} AID Application ID
     */
    merchantAcctInfo(ppNumber, options = {}, AID = CONST.AID_MERCHENT_PRESENTED) {
        if (!/^\d+$/.test(ppNumber)) throw new Error("PromptPay account must be number");

        /** Merchant Account Information */
        let MAI = "";
        let template = "";
        const { billerId, ref1, ref2 } = options;

        if (typeof billerId !== 'undefined') {
            // Tag ID 30
            if (billerId.length !== 15 && !/^\d+$/.test(billerId)) throw new Error("Invalid biller ID");
            if (typeof ref1 === 'undefined') throw new Error("Parameter ref1 is required");
            if (typeof ref1.length > 20) throw new Error("The length of ref1 up to 20");

            AID = CONST.AID_DOMESTIC_MERCHANT;
            MAI += fmt(CONST.root.BID_ID, billerId);
            MAI += fmt(CONST.root.REF_1_ID, ref1);

            if (typeof ref2 !== 'undefined') {
                if (typeof ref2.length > 20) throw new Error("The length of ref2 up to 20");
                MAI += fmt(CONST.root.REF_2_ID, ref2);
            }
            template = AID + MAI;

            return fmt(CONST.root.MAI_30_ID, template);
        }
        // Tag ID 29
        switch (ppNumber.length) {
            case 10:
                // mobile number
                let mobileNumber = fmtMobileNumber(ppNumber);
                MAI = fmt(CONST.root.MB_NUM_ID, mobileNumber);
                break;
            case 13:
                // national id
                MAI = fmt(CONST.root.NTL_ID, ppNumber);
                break;
            default:
                throw new Error("Invalid merchant identifier.");
        }
        template = AID + MAI;

        return fmt(CONST.root.MAI_29_ID, template);
    },
    /**
     * Generate QR Code payload with checksum.
     * @param {string} payload QR Code payload for promptpay
     * @returns {string} QR Code payload with checksum
     */
    crc(payload) {
        payload += CONST.root.CRC_ID + CONST.len.CRC_LEN;
        const crc16 = crc16xmodem(payload, 0xffff).toString(16);
        // make sure for length of CRC
        if (crc16.length !== 4) throw new Error("Invalid CRC.")
        payload += crc16;

        return payload;
    }
}

module.exports = payload;