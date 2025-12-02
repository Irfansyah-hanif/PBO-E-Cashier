import React from "react";
import ProductList from "../components/ProductList";
import PaymentUI from "../components/PaymentUI";

export default function Dashboard({ products }) {
    const total = products.reduce((sum, p) => sum + p.price, 0);

    return (
        <div>
            <h1 className="page-title">Dashboard</h1>

            <div className="card">
                <h2>Products Bought</h2>
                <ProductList products={products} />

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
