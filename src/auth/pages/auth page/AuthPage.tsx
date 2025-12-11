import { LoginForm } from "../../components/login form/login-form";
import { RegisterForm } from "../../components/register form/RegisterForm";
import styles from "./AuthPage.module.css";
import { useLocation } from "react-router-dom";

export default function AuthPage() {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  return (
    <div className={styles.authPage}>
      <div className={styles.leftPanel}>
        <div className={styles.branding}>
          <h1>ShopSmart</h1>
          <p>
            {isLogin
              ? "Welcome back! Login to manage your store and orders."
              : "Join now and start managing your store effortlessly."}
          </p>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <div className={`${styles.authBox} ${!isLogin ? styles.signupBox : ""}`}>
          <h2 className={styles.authTitle}>
            {isLogin ? "Sign In" : "Sign Up"}
          </h2>

          {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
}
