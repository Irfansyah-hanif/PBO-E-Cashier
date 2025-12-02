export default class Payment {
    constructor(amount) {
        if (this.constructor === Payment) {
            throw new Error("Payment is an abstract class and cannot be instantiated directly.");
        }
        this.amount = amount;
    }

    processPayment() {
        throw new Error("processPayment() must be implemented in subclass.");
    }
}
