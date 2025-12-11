// src/pages/login/LoginPage.tsx
import styles from "./Login.module.css";
import { LoginForm } from "../../components/login form/login-form";

export default function LoginPage() {
  return (
    <div className={styles.loginPage}>
      <div className={styles.leftPanel}>
        <div className={styles.branding}>
          <h1>ShopSmart</h1>
          <p>Welcome back! Login to manage your store and orders.</p>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.loginBox}>
          <h2 className={styles.loginTitle}>Sign In</h2>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
