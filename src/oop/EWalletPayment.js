import Payment from "./Payment";

export default class EWalletPayment extends Payment {
    constructor(amount, provider) {
        super(amount);
        this.provider = provider;
    }

    // POLYMORPHISM: Implementasi spesifik untuk E-Wallet
    processPayment() {
        // EXCEPTION HANDLING: Cek validitas
        if (this.amount <= 0) {
            throw new Error("Invalid amount.");
        }
        if (!this.provider) {
            throw new Error("Silakan pilih jenis E-Wallet terlebih dahulu!");
        }

        return `Pembayaran via ${this.provider} berhasil: Rp${this.amount.toLocaleString()}`;
    }
}