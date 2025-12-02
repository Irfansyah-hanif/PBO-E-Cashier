import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function ProductList({ products, setProducts }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const addProduct = () => {
    if (!name || !price) return;

    if (editId === null) {
      setProducts((prev) => [
        ...prev,
        { id: Date.now(), name, price: Number(price) },
      ]);
    } else {
      setProducts((prev) =>
        prev.map((p) => (p.id === editId ? { ...p, name, price: Number(price) } : p))
      );
      setEditId(null);
    }

    setName("");
    setPrice("");
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const editProduct = (p) => {
    setEditId(p.id);
    setName(p.name);
    setPrice(p.price);
  };

  return (
    <Box>
      <Typography variant="h4" mb={3}>
        Product Management
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField label="Product" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        <Button variant="contained" onClick={addProduct}>
          {editId ? "Update" : "Add"}
        </Button>
      </Box>

      <TextField
        label="Search product..."
        fullWidth
        sx={{ mb: 3 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: "repeat(auto-fill, 250px)" }}>
        {filtered.map((p) => (
          <Card key={p.id}>
            <CardContent>
              <Typography variant="h6">{p.name}</Typography>
              <Typography>Rp {p.price}</Typography>

              <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                <IconButton onClick={() => editProduct(p)}>
                  <EditIcon color="primary" />
                </IconButton>
                <IconButton onClick={() => deleteProduct(p.id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
