import React, { useState } from "react";

export default function CheckoutBox({ products, cart, setCart }) {
    const [selectedId, setSelectedId] = useState("");
    const [qty, setQty] = useState(1);

    const handleAdd = () => {
        if (!selectedId) return alert("Select product!");

        const product = products.find(p => p.id == selectedId);

        // Cek jika produk sudah ada di cart
        const existingItem = cart.find(item => item.productId === product.id);

        if (existingItem) {
            // Update qty jika sudah ada
            setCart(cart.map(item => 
                item.productId === product.id 
                ? { ...item, qty: item.qty + qty, total: product.price * (item.qty + qty) }
                : item
            ));
        } else {
            // Tambah item baru
            const item = {
                id: Date.now(),
                productId: product.id,
                name: product.name,
                price: product.price,
                qty: qty,
                total: product.price * qty
            };
            setCart([...cart, item]);
        }
    };

    return (
        <div>
            <h2 className="card-header">Add to Cart</h2>

            <div className="input-group">
                <label className="label">Select Product</label>
                <select 
                    className="input-field" 
                    value={selectedId} 
                    onChange={(e) => setSelectedId(e.target.value)}
                >
                    <option value="">-- Choose Product --</option>
                    {products.map(p => (
                        <option key={p.id} value={p.id}>
                            {p.name} — Rp{p.price.toLocaleString()}
                        </option>
                    ))}
                </select>
            </div>

            <div className="input-group">
                <label className="label">Quantity</label>
                <input 
                    className="input-field"
                    type="number"
                    value={qty}
                    min="1"
                    onChange={(e) => setQty(Number(e.target.value))}
                />
            </div>

            <button className="btn btn-primary" style={{width: "100%"}} onClick={handleAdd}>
                + Add Product
            </button>
        </div>
    );
}