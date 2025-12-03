import React from "react";

export default function Sidebar({ currentPage, setCurrentPage }) {
    return (
        <aside className="sidebar">
            <h2>E-Cashier</h2>
            <ul>
                <li 
                    className={currentPage === "dashboard" ? "active" : ""}
                    onClick={() => setCurrentPage("dashboard")}
                >
                    Dashboard
                </li>

                <li 
                    className={currentPage === "product" ? "active" : ""}
                    onClick={() => setCurrentPage("product")}
                >
                    Product
                </li>
            </ul>
        </aside>
    );
}