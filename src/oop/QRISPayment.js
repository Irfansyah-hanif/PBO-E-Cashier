import Payment from "./Payment";

export default class QRISPayment extends Payment {
    processPayment() {
        if (this.amount <= 0) {
            throw new Error("Invalid QRIS amount.");
        }
        return `QRIS payment completed: Rp${this.amount}`;
    }
}
