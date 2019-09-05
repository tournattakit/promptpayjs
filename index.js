const { promptpay } = require('./src/promptpay');

let pp = promptpay("08XXXXXXXX");

// test
function printLog(text) {
    console.log('\u001b[' + 95 + 'm' + text + '\u001b[0m');
}
printLog(pp);