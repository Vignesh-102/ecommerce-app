import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import styles from "./Cart.module.css";
import { CartItem } from "./cartTypes";
import { clearCart } from "./cartSlice";

export default function Cart() {
  const items = useAppSelector((state) => state.cart.items);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [showSuccess, setShowSuccess] = useState(false);
  const dispatch = useAppDispatch();

  const handlePlaceOrder = () => {
    if (items.length === 0) return;
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.cartTitle}>🛒 Your Cart</h2>

      {items.length === 0 ? (
        <p className={styles.emptyCart}>Your cart is empty.</p>
      ) : (
        <>
          {showSuccess && (
            <div className={styles.popup}>
              ✅ Your order has been placed successfully!
            </div>
          )}

          <div className={styles.cartItems}>
            {items.map((item: CartItem) => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemDetails}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <p className={styles.itemInfo}>
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>
                <div className={styles.itemTotal}>
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.cartTotal}>
            <span>Total:</span>
            <span className={styles.totalPrice}>₹{total.toFixed(2)}</span>
          </div>

          <button className={styles.orderBtn} onClick={handlePlaceOrder}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
}
