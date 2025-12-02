import React, { useState } from "react";

export default function ProductPage({ products, setProducts }) {
    // Menambahkan field category pada state form
    const [form, setForm] = useState({ id: null, name: "", price: "", category: "Makanan" });
    const [isEditing, setIsEditing] = useState(false);
    const [search, setSearch] = useState("");

    // --- State baru untuk Filtering dan Sorting ---
    const [filterCategory, setFilterCategory] = useState("All");
    const [sortOrder, setSortOrder] = useState(""); // "" | "lowest" | "highest"

    const handleSave = () => {
        if (!form.name || !form.price || !form.category) return alert("Fill all fields");

        if (isEditing) {
            setProducts(products.map(p => p.id === form.id ? form : p));
            setIsEditing(false);
        } else {
            setProducts([...products, { ...form, id: Date.now() }]);
        }

        // Reset form
        setForm({ id: null, name: "", price: "", category: "Makanan" });
    };

    const handleEdit = (p) => {
        setForm(p);
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        if(window.confirm("Are you sure you want to delete this product?")) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    // --- Logika Filter & Sort Diperbarui ---
    const filteredProducts = products
        .filter(p => {
            // 1. Filter Search
            const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
            // 2. Filter Category
            const matchesCategory = filterCategory === "All" || p.category === filterCategory;
            
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            // 3. Sorting Price
            if (sortOrder === "lowest") {
                return a.price - b.price; // Rendah ke Tinggi
            } else if (sortOrder === "highest") {
                return b.price - a.price; // Tinggi ke Rendah
            }
            return 0; // Tidak ada sorting
        });

    return (
        <div className="fade-in">
            <h1 className="page-title">Product Manager</h1>

            {/* --- Form Section --- */}
            <div className="card">
                <h2 className="card-header">{isEditing ? "Edit Product" : "Add New Product"}</h2>
                <div className="form-grid">
                    <div>
                        <label className="label">Name</label>
                        <input 
                            className="input-field"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Product Name"
                        />
                    </div>

                    <div>
                        <label className="label">Category</label>
                        <select 
                            className="input-field"
                            value={form.category}
                            onChange={(e) => setForm({ ...form, category: e.target.value })}
                        >
                            <option value="Makanan">Makanan</option>
                            <option value="Minuman">Minuman</option>
                            <option value="Barang">Barang</option>
                        </select>
                    </div>

                    <div>
                        <label className="label">Price</label>
                        <input 
                            type="number"
                            className="input-field"
                            value={form.price}
                            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                            placeholder="0"
                        />
                    </div>
                </div>

                <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
                    <button className="btn btn-primary" onClick={handleSave}>
                        {isEditing ? "Update Product" : "Save Product"}
                    </button>
                    {isEditing && (
                        <button className="btn btn-secondary" onClick={() => {
                            setIsEditing(false);
                            setForm({ id: null, name: "", price: "", category: "Makanan" });
                        }}>Cancel</button>
                    )}
                </div>
            </div>

            {/* --- List Section --- */}
            <div className="card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px", flexWrap: "wrap", gap: "10px" }}>
                    <h2>Product List</h2>
                    
                    {/* Container untuk Search, Filter, dan Sort di sebelah kanan */}
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        
                        {/* Search Bar */}
                        <input 
                            style={{ width: "200px" }}
                            className="input-field"
                            placeholder="Search product..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        {/* Filter Category */}
                        <select 
                            className="input-field"
                            style={{ width: "150px" }}
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                        >
                            <option value="All">All Categories</option>
                            <option value="Makanan">Makanan</option>
                            <option value="Minuman">Minuman</option>
                            <option value="Barang">Barang</option>
                        </select>

                        {/* Sort Price */}
                        <select 
                            className="input-field"
                            style={{ width: "150px" }}
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="">Sort Price</option>
                            <option value="lowest">Lowest Price</option>
                            <option value="highest">Highest Price</option>
                        </select>
                    </div>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th style={{ width: "180px", textAlign: "center" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.length === 0 && (
                            <tr><td colSpan="4" style={{textAlign:"center", padding:"20px"}}>No products found.</td></tr>
                        )}
                        {filteredProducts.map((p) => (
                            <tr key={p.id}>
                                <td style={{ fontWeight: "500" }}>{p.name}</td>
                                <td><span className={`badge badge-${p.category.toLowerCase()}`}>{p.category}</span></td>
                                <td>Rp{p.price.toLocaleString()}</td>
                                <td style={{ textAlign: "center" }}>
                                    <button className="btn-icon btn-edit" onClick={() => handleEdit(p)}>
                                        Edit
                                    </button>
                                    <button className="btn-icon btn-danger" onClick={() => handleDelete(p.id)}>
                                        Del
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}