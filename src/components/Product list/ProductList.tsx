type Product = {
  id: number;
  name: string;
};

const products: Product[] = [
  { id: 1, name: "T-shirt" },
  { id: 2, name: "Jeans" },
  { id: 3, name: "Sneakers" },
];

export default function ProductList() {
    return (
        <div>
            <h2>Products</h2>
            <ul>
                {products.map(product => 
                    <li key={product.id}>{product.name}</li>
                )}
            </ul>
        </div>
    )
}