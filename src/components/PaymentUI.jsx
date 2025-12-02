import React, { useState } from "react";
import CashPayment from "../oop/CashPayment";
import QRISPayment from "../oop/QRISPayment";
import EWalletPayment from "../oop/EWalletPayment";

// Menerima prop onSuccess
export default function PaymentUI({ total, onSuccess }) {
    const [method, setMethod] = useState("cash");
    const [error, setError] = useState("");

    const handlePay = () => {
        setError("");
        try {
            if (total <= 0) throw new Error("Cart is empty, cannot pay!");

            let pay;
            // Factory Pattern sederhana
            if (method === "cash") pay = new CashPayment(total);
            if (method === "qris") pay = new QRISPayment(total);
            if (method === "ewallet") pay = new EWalletPayment(total);

            const message = pay.processPayment();
            
            // Panggil fungsi onSuccess dari parent (Dashboard) untuk memicu Popup
            if (onSuccess) {
                onSuccess(message);
            }

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2 className="card-header">Payment Details</h2>
            
            <div className="payment-summary">
                <span>Total to Pay:</span>
                <span className="total-amount">Rp{total.toLocaleString()}</span>
            </div>

            <div style={{ marginTop: "20px" }}>
                <label className="label">Payment Method</label>
                <select className="input-field" value={method} onChange={(e) => setMethod(e.target.value)}>
                    <option value="cash">Cash</option>
                    <option value="qris">QRIS</option>
                    <option value="ewallet">E-Wallet</option>
                </select>
            </div>

            <button className="btn btn-success" style={{ width: "100%", marginTop: "20px" }} onClick={handlePay}>
                Confirm Payment
            </button>

            {error && <div className="alert-error">{error}</div>}
        </div>
    );
}