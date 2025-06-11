import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';

interface Product {
  category: string;
  name: string;
  id: number;
  price: number;
}
export default function ProductCard({product}: any){
    return (
    <div className={styles.card}>
      <h4 className={styles.category}>{product.category}</h4>
      <h3 className={styles.name}>{product.name}</h3>
      <p className={styles.price}>₹{product.price}</p>
      <Link to={`/product/${product.id}`} className={styles.viewLink}>
        View Details
      </Link>
    </div>
  );
}