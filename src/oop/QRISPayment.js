import Payment from "./Payment";

export default class QRISPayment extends Payment {
  pay(amount) {
    if (!amount) throw new Error("Invalid QRIS amount");
    console.log("QRIS payment:", amount);
    return true;
  }
}
