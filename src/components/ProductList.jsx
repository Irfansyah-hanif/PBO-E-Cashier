export default function ProductList({ products }) {
    return (
        <ul style={{ padding: 0 }}>
            {products.map((p) => (
                <li key={p.id} className="product-list-item">
                    <span>{p.name}</span>
                    <span>Rp{p.price}</span>
                </li>
            ))}
        </ul>
    );
}
