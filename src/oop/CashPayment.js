import Payment from "./Payment";

export default class CashPayment extends Payment {
    // Override method dari parent (Polymorphism)
    processPayment() {
        // Exception Handling
        if (this.amount <= 0) {
            throw new Error("Jumlah pembayaran tidak valid.");
        }
        return `Pembayaran Cash diterima: Rp${this.amount.toLocaleString()}`;
    }
}