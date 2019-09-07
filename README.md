# promptpayjs

Generate **QR Code payload for PromptPay**

## Usage

```javascript
const promptpay = require('./src/promptpay');

let payload = promptpay("0812345678", { amount: 100,});
```

## Source :pizza:

- [Thai QR Code Document](https://www.bot.or.th/Thai/PaymentSystems/StandardPS/Documents/ThaiQRCode_Payment_Standard.pdf)

- [EMVCo QR Code Specification for Payment Systems: Merchant-Presented Mode](https://www.emvco.com/wp-content/uploads/documents/EMVCo-Merchant-Presented-QR-Specification-v1-1.pdf)
