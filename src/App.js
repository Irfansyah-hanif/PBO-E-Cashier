import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ProductPage from "./pages/ProductPage";
import "./ui.css";

export default function App() {
    const [currentPage, setCurrentPage] = useState("dashboard");
    const [products, setProducts] = useState([
        { id: 1, name: "Nasi Goreng", price: 20000 },
        { id: 2, name: "Mie Ayam", price: 15000 }
    ]);

    return (
        <div className="layout">
            <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />

            <main className="content">
                {currentPage === "dashboard" && (
                    <Dashboard products={products} />
                )}

                {currentPage === "product" && (
                    <ProductPage products={products} setProducts={setProducts} />
                )}
            </main>
        </div>
    );
}
