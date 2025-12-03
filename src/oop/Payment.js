export default class Payment {
    constructor(amount) {
        if (this.constructor === Payment) {
            throw new Error("Abstract class 'Payment' cannot be instantiated directly.");
        }
        this.amount = amount;
    }

    // Abstract method: Harus di-override oleh child
    processPayment() {
        throw new Error("Method 'processPayment()' must be implemented.");
    }
}