import Payment from "./Payment";

export default class CashPayment extends Payment {
  pay(amount) {
    if (amount <= 0) {
      throw new Error("Amount must be greater than 0");
    }
    console.log("Cash payment:", amount);
    return true;
  }
}
