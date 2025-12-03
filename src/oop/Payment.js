export default class Payment {
  pay(amount) {
    throw new Error("PAYMENT_METHOD_NOT_IMPLEMENTED");
  }
}
