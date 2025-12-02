import React from "react";
import PaymentUI from "../components/PaymentUI";
import CheckoutBox from "../components/CheckoutBox";

export default function Dashboard({ products, cart, setCart }) {
    const total = cart.reduce((sum, item) => sum + item.total, 0);

    return (
        <div>
            <h1 className="page-title">Dashboard</h1>

            <div className="card">
                <CheckoutBox products={products} cart={cart} setCart={setCart} />
            </div>

            <div className="card">
                <h2>Cart Items</h2>

                {cart.length === 0 && <p>No items purchased yet.</p>}

                {cart.map(item => (
                    <div key={item.id} className="product-list-item">
                        <span>{item.name} (x{item.qty})</span>
                        <span>Rp{item.total}</span>
                    </div>
                ))}

                <h3 style={{ marginTop: "15px" }}>
                    Total: <b>Rp{total}</b>
                </h3>
            </div>

            <div className="card">
                <PaymentUI total={total} />
            </div>
        </div>
    );
}
