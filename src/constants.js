const constants = {
    /** 00 16 A000000677012006 - Application ID cross-border merchant*/
    AID_CROSS_BORDER_MERCHANT: "0016A000000677012006",
    /** 00 16 A000000677010111 - Application ID merchant presented */
    AID_MERCHENT_PRESENTED: "0016A000000677010111",
    /** 00 16 A000000677010114 - Application ID customer presented */
    AID_CUSTOMER_PRESENTED: "0016A000000677010114",
    /** 00 16 A000000677010112 - Application ID domestic merchant*/
    AID_DOMESTIC_MERCHANT: "0016A000000677010112",
    /** 58 02 TH - Country Code */
    COUNTRY_CODE: "5802TH",
    /** 00 02 01 - Payload Format Indicator */
    PAYLOAD_FORMAT_INDICATOR: "000201",
    /** 01 02 11 - Point of Initiation Method Static */
    POI_METHOD_STATIC: "010211",
    /** 01 02 12 - Point of Initiation Method Dynamic */
    POI_METHOD_DYNAMIC: "010212",
    /** 53 03 764 - Transaction Currency THB */
    TRANSACTION_CURRENCY_THB: "5303764",
    root: {
        /** 00 - Payload Format Indicator ID */
        PFI_ID: "00",
        /** 01 - Point of Initiation Method */
        POI_ID: "01",
        /** 63 - CRC */
        CRC_ID: "63",
        /** 54 - Transaction Amount */
        TRAN_AMT_ID: "54",
        /** 53 - Transaction Currency */
        TRAN_CUR_ID: "53",
        /** 58 - Country Code */
        CC_ID: "58",
        /** 29 - Merchant Account Information */
        MAI_29_ID: "29",
        /** 30 - Merchant Account Information */
        MAI_30_ID: "30",
        /** 00 - Globally Unique Identifier */
        MAI_GUID_ID: "00",
        /** 01 - Payment network specific */
        MAI_PNS_ID: "01",
        /** 59 - Merchant Name */
        MN_ID: "59",
        /** 00 - Application Identifier */
        AID_ID: "00",
        /** 01 - Mobile number */
        MB_NUM_ID: "01",
        /** 02 - National ID or Tax ID */
        NTL_ID: "02",
        /** 01 - Biller ID */
        BID_ID: "01",
        /** 02 - Reference 1 */
        REF_1_ID: "02",
        /** 03 - Reference 2 */
        REF_2_ID: "03"
    },
    len: {
        /** 01 - Length of Payload Format Indicator value */
        PFI_LEN: "02",
        /** 04 - Length of CRC value */
        CRC_LEN: "04",
        /** 03 - Length of Transaction Currency */
        TRAN_CUR_LEN: "03",
    },
    val: {
        /** 01 - The Payload Format Indicator shall contain a value of "01" */
        PFI_VAL: "01"
    }
}

module.exports = constants;