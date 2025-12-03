import React, { useState } from "react";
import CashPayment from "../oop/CashPayment";
import QRISPayment from "../oop/QRISPayment";
import EWalletPayment from "../oop/EWalletPayment";

export default function PaymentUI({ total, onSuccess }) {
    const [method, setMethod] = useState("cash");
    const [walletProvider, setWalletProvider] = useState("");
    const [error, setError] = useState("");
    
    // State baru untuk Modal Zoom QRIS
    const [showQRModal, setShowQRModal] = useState(false);

    const handlePay = () => {
        setError("");
        try {
            if (total <= 0) throw new Error("Cart is empty, cannot pay!");

            let pay;
            
            // --- PENERAPAN OOP (Factory Pattern) ---
            if (method === "cash") {
                pay = new CashPayment(total); // Inheritance dari Payment
            } else if (method === "qris") {
                pay = new QRISPayment(total); // Inheritance dari Payment
            } else if (method === "ewallet") {
                pay = new EWalletPayment(total, walletProvider); // Inheritance dari Payment
            }

            // --- POLYMORPHISM ---
            // Memanggil method yang sama (processPayment), tapi hasilnya beda tiap objek
            const message = pay.processPayment();
            
            if (onSuccess) onSuccess(message);

        } catch (err) {
            // --- EXCEPTION HANDLING ---
            setError(err.message);
        }
    };

    // URL API QR Code (Simulasi)
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=PaymentRp${total}`;

    return (
        <div>
            <h2 className="card-header">Payment Details</h2>
            
            <div className="payment-summary">
                <span>Total to Pay:</span>
                <span className="total-amount">Rp{total.toLocaleString()}</span>
            </div>

            {/* PAYMENT METHOD SELECTION */}
            <div style={{ marginTop: "20px" }}>
                <label className="label">Select Payment Method</label>
                <div className="payment-methods-grid">
                    {['cash', 'qris', 'ewallet'].map((m) => (
                        <button
                            key={m}
                            className={`method-btn ${method === m ? 'active' : ''}`}
                            onClick={() => { setMethod(m); setError(""); }}
                        >
                            {m.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            {/* DYNAMIC CONTENT AREA */}
            <div className="payment-content-area fade-in">
                
                {/* 1. CASH */}
                {method === "cash" && (
                    <div className="info-box">
                        <div style={{fontSize: "24px", marginBottom: "10px"}}>💵</div>
                        <p style={{fontWeight: "600", margin: 0}}>Silahkan bayar Cash ke Kasir</p>
                        <p style={{fontSize: "13px", color: "var(--text-gray)"}}>Pastikan uang pas atau siapkan kembalian.</p>
                    </div>
                )}

                {/* 2. QRIS (Updated with Zoom Feature) */}
                {method === "qris" && (
                    <div className="qris-container">
                        <p className="label" style={{textAlign: "center"}}>Scan QRIS</p>
                        
                        <div 
                            className="qris-wrapper" 
                            onClick={() => setShowQRModal(true)}
                            title="Click to enlarge"
                        >
                            <img 
                                src={qrCodeUrl} 
                                alt="QRIS Code" 
                                className="qris-image qris-zoomable"
                            />
                            <div className="qris-overlay-hint">🔍 Zoom</div>
                        </div>

                        <p style={{fontSize: "12px", color: "var(--text-gray)", marginTop: "10px"}}>
                            NMID: ID1020304050
                        </p>
                    </div>
                )}

                {/* 3. E-WALLET */}
                {method === "ewallet" && (
                    <div>
                        <label className="label">Choose E-Wallet</label>
                        <div className="wallet-grid">
                            {['GoPay', 'OVO', 'Dana', 'ShopeePay'].map((wallet) => (
                                <button
                                    key={wallet}
                                    className={`wallet-btn ${walletProvider === wallet ? 'active' : ''}`}
                                    onClick={() => setWalletProvider(wallet)}
                                >
                                    {wallet}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <button className="btn btn-success" style={{ width: "100%", marginTop: "25px" }} onClick={handlePay}>
                {method === 'qris' ? 'I Have Scanned' : 'Confirm Payment'}
            </button>

            {error && <div className="alert-error scale-in">⚠️ {error}</div>}

            {/* --- MODAL ZOOM QRIS --- */}
            {showQRModal && (
                <div className="modal-overlay" onClick={() => setShowQRModal(false)}>
                    <div className="modal-content scale-in" onClick={(e) => e.stopPropagation()}>
                        <h2>Scan Payment</h2>
                        <div style={{ margin: "20px 0" }}>
                            <img 
                                src={qrCodeUrl} 
                                alt="QRIS Large" 
                                style={{ width: "100%", maxWidth: "300px", borderRadius: "10px" }} 
                            />
                        </div>
                        <p style={{marginBottom: "20px", fontWeight: "bold"}}>Rp{total.toLocaleString()}</p>
                        <button className="btn btn-secondary" onClick={() => setShowQRModal(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}