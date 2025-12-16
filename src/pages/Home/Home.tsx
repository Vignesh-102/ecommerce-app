import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import ProductCard from "../../components/product card/productCard";
import { getBestDealProducts, getProductsByCategory } from "../../services/productService";
import { useParams, useSearchParams } from "react-router-dom";

interface Product {
  category: string;
  name: string;
  id: number;
  price: number;
  image: string;
}

export default function Home() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search")?.trim().toLowerCase() || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let data;

        if (slug) {
          data = await getProductsByCategory(slug);
        } else {
          data = await getBestDealProducts();
        }

        setProducts(data);
        setFilteredProducts(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);


  useEffect(() => {
    const normalized = searchTerm.toLowerCase();

    if (!normalized) {
      setFilteredProducts(products);
      return;
    }

    setFilteredProducts(
      products.filter((p) =>
        p.name.toLowerCase().includes(normalized)
      )
    );
  }, [searchTerm, products]);

  // -----------------------------
  // UI
  // -----------------------------
  if (loading) return <p>Loading products from backend...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>
        {slug ? slug.toUpperCase() : "Best Deals for You"}
      </h2>

      <div className={styles.grid}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

        {filteredProducts.length === 0 && (
          <p className={styles.noResults}>No products found</p>
        )}
      </div>
    </div>
  );
}
