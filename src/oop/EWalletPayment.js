import Payment from "./Payment";

export default class EWalletPayment extends Payment {
    processPayment() {
        if (this.amount <= 0) {
            throw new Error("Invalid e-wallet amount.");
        }
        return `E-Wallet payment processed: Rp${this.amount}`;
    }
}
