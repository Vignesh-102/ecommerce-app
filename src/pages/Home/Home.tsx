import { useEffect, useState } from "react";
import styles from './Home.module.css';
import ProductCard from "../../components/Product card/ProductCard";

interface Product {
    category: string
    name: string
    id: number
    price: number
}

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const query = `
        query Products {
            products {
                category
                name
                id
                price
            }
        }`;

        const fetchProducts = async () => {
            try {
                const res = await fetch('https://ecommerce-backend-1s9y.onrender.com', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query }),
                });
                const json = await res.json();
                if (json.errors) {
                    throw new Error(json.errors[0].message);
                }
                setProducts(json.data.products);
            } catch (err:any) {
                setError(err.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    },[])
    if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
