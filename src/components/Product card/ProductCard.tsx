import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ProductCard.module.css";
import { addItemToCart } from "../cart/cartSlice";
import { useAppDispatch } from "../../hooks";

interface Product {
  category: string;
  name: string;
  id: number;
  price: number;
  image: string;
}

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const goToDetails = () => {
    navigate(`/product/${product.id}`, {
      state: { product }
    });
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(
          addItemToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            category: product.category
          })
        );
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
    }, 1500);
  };

  return (
    <div className={styles.card} onClick={goToDetails}>
      {/* Success Popup */}
      {showPopup && (
        <div className={styles.popup}>
          ✓ Added to Cart
        </div>
      )}

      <img src={product.image} alt={product.name} className={styles.image} />

      <h4 className={styles.category}>{product.category}</h4>
      <h3 className={styles.name}>{product.name}</h3>
      <p className={styles.price}>₹{product.price}</p>

      <div className={styles.actions}>
        <Link
          to={`/product/${product.id}`}
          state={{ product }}
          className={styles.viewLink}
        >
          View Details
        </Link>

        <button className={styles.cartBtn} onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
