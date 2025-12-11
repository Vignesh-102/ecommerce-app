import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { addItemToCart } from "../../components/cart/cartSlice";
import styles from "./ProductDetail.module.css";
import { useState } from "react";

export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
};

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);

  const product = location.state?.product as Product | undefined;

  if (!product) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>
        Product not found
      </h2>
    );
  }

  const handleAddToCart = () => {
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
    setTimeout(() => setShowPopup(false), 1500);
  };

  return (
    <div className={styles.wrapper}>
      {/* Back Button */}
      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* Success Popup */}
      {showPopup && <div className={styles.popup}>✓ Added to Cart</div>}

      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <img src={product.image} alt={product.name} />
        </div>

        <div className={styles.details}>
          <span className={styles.category}>{product.category}</span>

          <h1 className={styles.name}>{product.name}</h1>

          <p className={styles.price}>₹{product.price}</p>

          <button className={styles.cartBtn} onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
