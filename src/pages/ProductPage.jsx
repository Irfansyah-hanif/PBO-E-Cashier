import React, { useState } from "react";

export default function ProductPage({ products, setProducts }) {
    const [form, setForm] = useState({ id: null, name: "", price: "" });
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
        if (!form.name || !form.price) return alert("Fill All Fields");

        if (isEditing) {
            setProducts(products.map(p => p.id === form.id ? form : p));
            setIsEditing(false);
        } else {
            setProducts([...products, { ...form, id: Date.now() }]);
        }

        setForm({ id: null, name: "", price: "" });
    };

    const handleEdit = (p) => {
        setForm(p);
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        setProducts(products.filter(p => p.id !== id));
    };

    return (
        <div>
            <h1 className="page-title">Product Manager</h1>

            <div className="card">
                <h2>{isEditing ? "Edit Product" : "Add Product"}</h2>

                <label>Product Name</label>
                <input 
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <label>Price</label>
                <input 
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                />

                <button onClick={handleSave}>
                    {isEditing ? "Save Changes" : "Add Product"}
                </button>
            </div>

            <div className="card">
                <h2>Product List</h2>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th style={{ width: "160px" }}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((p) => (
                            <tr key={p.id}>
                                <td>{p.name}</td>
                                <td>Rp{p.price}</td>
                                <td>
                                    <button className="btn-edit" onClick={() => handleEdit(p)}>
                                        Edit
                                    </button>
                                    <button className="btn-danger" onClick={() => handleDelete(p.id)}>
                                        Delete
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
