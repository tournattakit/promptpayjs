const promptpay = require('../src/promptpay');
const payload = require('../lib/payload');
const { fmt, fmtMobileNumber } = require('../lib/helper');

test('should format string is id + length of value + value', () => {
    expect(fmt("00", "01")).toMatch("000201");
});
test('should format string is 00 + 66 + mobile number', () => {
    expect(fmtMobileNumber("0812345678")).toMatch("0066812345678");
});
test('payload of merchant account infomation Tag29', () => {
    expect(payload.merchantAcctInfo("0812345678"))
        .toMatch("29370016A00000067701011101130066812345678");
});
test('payload of merchant account infomation Tag30', () => {
    expect(payload.merchantAcctInfo("0812345678", { billerId: "123456789012345", ref1: "refString" }))
        .toMatch("30520016A00000067701011201151234567890123450209refString");
});
test('generate qr code payload for promptpay', () => {
    expect(promptpay("0812345678"))
        .toMatch(/00020101021229370016A0000006770101110113006681234567853037645802TH6304.{4}$/);
});
test('generate qr code payload for promptpay with amount', () => {
    expect(promptpay("0812345678", { amount: 25 }))
        .toMatch(/00020101021229370016A000000677010111011300668123456785303764540525.005802TH6304.{4}$/);
});



