import React, { useState } from "react";
import PaymentUI from "../components/PaymentUI";
import CheckoutBox from "../components/CheckoutBox";

export default function Dashboard({ products, cart, setCart }) {
    const [showModal, setShowModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const total = cart.reduce((sum, item) => sum + item.total, 0);

    // Fitur Cancel (Hapus Item)
    const handleRemoveItem = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    // Fitur Edit (Ubah Qty)
    const handleUpdateQty = (id, delta) => {
        setCart(cart.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, item.qty + delta);
                return { ...item, qty: newQty, total: item.price * newQty };
            }
            return item;
        }));
    };

    // Callback saat pembayaran sukses
    const handlePaymentSuccess = (msg) => {
        setSuccessMessage(msg);
        setShowModal(true);
        setCart([]); // Kosongkan keranjang setelah bayar
    };

    return (
        <div className="fade-in">
            <h1 className="page-title">Dashboard</h1>

            <div className="dashboard-grid">
                {/* Left Column: Cart & Add */}
                <div className="dashboard-left">
                    <div className="card">
                        <CheckoutBox products={products} cart={cart} setCart={setCart} />
                    </div>

                    <div className="card">
                        <h2 className="card-header">Current Order</h2>

                        {cart.length === 0 ? (
                            <p className="empty-cart">No items in cart.</p>
                        ) : (
                            <div className="cart-list">
                                {cart.map(item => (
                                    <div key={item.id} className="cart-item">
                                        <div className="cart-item-info">
                                            <span className="item-name">{item.name}</span>
                                            <span className="item-price">@ Rp{item.price.toLocaleString()}</span>
                                        </div>
                                        <div className="cart-item-actions">
                                            <button className="btn-qty" onClick={() => handleUpdateQty(item.id, -1)}>-</button>
                                            <span className="qty-label">{item.qty}</span>
                                            <button className="btn-qty" onClick={() => handleUpdateQty(item.id, 1)}>+</button>
                                            <button className="btn-remove" onClick={() => handleRemoveItem(item.id)}>✕</button>
                                        </div>
                                        <div className="cart-item-total">
                                            Rp{item.total.toLocaleString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="cart-footer">
                            <h3>Total Amount</h3>
                            <span className="grand-total">Rp{total.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Payment */}
                <div className="dashboard-right">
                    <div className="card sticky-card">
                        <PaymentUI total={total} onSuccess={handlePaymentSuccess} />
                    </div>
                </div>
            </div>

            {/* MODAL POPUP */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content scale-in">
                        <div className="modal-icon">✅</div>
                        <h2>Payment Successful!</h2>
                        <p>{successMessage}</p>
                        <button className="btn btn-primary" onClick={() => setShowModal(false)}>
                            Close & New Order
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}