import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ProductPage from "./pages/ProductPage";
import "./ui.css";

export default function App() {
    const [currentPage, setCurrentPage] = useState("dashboard");

    // Menambahkan kategori default pada data awal
    const [products, setProducts] = useState([
        { id: 1, name: "Nasi Goreng", price: 20000, category: "Makanan" },
        { id: 2, name: "Es Teh Manis", price: 5000, category: "Minuman" },
        { id: 3, name: "Kerupuk", price: 2000, category: "Barang" }
    ]);

    const [cart, setCart] = useState([]);

    return (
        <div className="layout">
            <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />

            <main className="content">
                {currentPage === "dashboard" && (
                    <Dashboard products={products} cart={cart} setCart={setCart} />
                )}

                {currentPage === "product" && (
                    <ProductPage products={products} setProducts={setProducts} />
                )}
            </main>
        </div>
    );
}