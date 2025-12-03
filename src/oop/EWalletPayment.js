import Payment from "./Payment";

export default class EWalletPayment extends Payment {
    constructor(amount, provider) {
        super(amount); // Inheritance: Panggil constructor Payment
        this.provider = provider;
    }

    // Override method dari parent (Polymorphism)
    processPayment() {
        // Exception Handling
        if (this.amount <= 0) {
            throw new Error("Jumlah pembayaran tidak valid.");
        }
        if (!this.provider) {
            throw new Error("Mohon pilih jenis E-Wallet terlebih dahulu!");
        }

        return `Pembayaran via ${this.provider} Berhasil: Rp${this.amount.toLocaleString()}`;
    }
}