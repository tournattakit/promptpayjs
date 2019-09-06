const payload = require('../lib/payload');

test('should payload of transaction currency', () => {
    expect(payload.transactionCurrency("thailand")).toMatch(/5303(764)/);
})

test('should payload of merchant account infomation', () => {
    expect(payload.merchantAcctInfo("0872134549")).toMatch(/./);
})