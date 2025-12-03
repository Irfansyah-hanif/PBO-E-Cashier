import Payment from "./Payment";

export default class QRISPayment extends Payment {
    // Override method dari parent (Polymorphism)
    processPayment() {
        // Exception Handling
        if (this.amount <= 0) {
            throw new Error("Jumlah pembayaran tidak valid.");
        }
        return `Pembayaran QRIS Sukses: Rp${this.amount.toLocaleString()}`;
    }
}