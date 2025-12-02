import React, { useState } from "react";

export default function CheckoutBox({ products, cart, setCart }) {
    const [selectedId, setSelectedId] = useState("");
    const [qty, setQty] = useState(1);

    const handleAdd = () => {
        if (!selectedId) return alert("Select product!");

        const product = products.find(p => p.id == selectedId);

        const item = {
            id: Date.now(),
            productId: product.id,
            name: product.name,
            price: product.price,
            qty: qty,
            total: product.price * qty
        };

        setCart([...cart, item]);
    };

    return (
        <div>
            <h2>Add Product to Cart</h2>

            <label>Product</label>
            <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
                <option value="">-- choose product --</option>
                {products.map(p => (
                    <option key={p.id} value={p.id}>
                        {p.name} - Rp{p.price}
                    </option>
                ))}
            </select>

            <label>Qty</label>
            <input 
                type="number"
                value={qty}
                min="1"
                onChange={(e) => setQty(Number(e.target.value))}
            />

            <button onClick={handleAdd}>Add to Cart</button>
        </div>
    );
}
