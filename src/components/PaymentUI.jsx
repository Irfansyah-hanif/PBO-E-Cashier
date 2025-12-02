import React, { useState } from "react";
import CashPayment from "../oop/CashPayment";
import QRISPayment from "../oop/QRISPayment";
import EWalletPayment from "../oop/EWalletPayment";

export default function PaymentUI({ total }) {
    const [method, setMethod] = useState("cash");
    const [result, setResult] = useState("");

    const handlePay = () => {
        try {
            let pay;

            if (method === "cash") pay = new CashPayment(total);
            if (method === "qris") pay = new QRISPayment(total);
            if (method === "ewallet") pay = new EWalletPayment(total);

            setResult(pay.processPayment());
        } catch (err) {
            setResult(err.message);
        }
    };

    return (
        <div>
            <h2>Payment</h2>
            <p>Total: <b>Rp{total}</b></p>

            <label>Payment Method</label>
            <select value={method} onChange={(e) => setMethod(e.target.value)}>
                <option value="cash">Cash</option>
                <option value="qris">QRIS</option>
                <option value="ewallet">E-Wallet</option>
            </select>

            <button onClick={handlePay}>Pay Now</button>

            {result && <p className="result">{result}</p>}
        </div>
    );
}
