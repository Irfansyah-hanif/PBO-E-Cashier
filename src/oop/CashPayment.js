import Payment from "./Payment";

export default class CashPayment extends Payment {
    processPayment() {
        if (this.amount <= 0) {
            throw new Error("Invalid cash amount.");
        }
        return `Cash payment successful: Rp${this.amount}`;
    }
}
