import { useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "../../../schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import styles from "./loginForm.module.css";
import { axiosInstance } from "../../../lib/axios";
import { useAuth } from "../../../context/AuthContext";

export function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    const res = await axiosInstance.post('api/auth/login', data);
    const token = res.data.token;
      if (token) {
        login(token);
        navigate("/");
      }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
          placeholder="you@example.com"
          autoComplete="email"
        />
        {errors.email && (
          <p className={styles.error}>{errors.email.message}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register("password")}
          className={`${styles.input} ${
            errors.password ? styles.inputError : ""
          }`}
          placeholder="Your secure password"
          autoComplete="current-password"
        />
        {errors.password && (
          <p className={styles.error}>{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>

      <p className={styles.signupText}>
        Don't have an account?
        <Link to="/signup" className={styles.signupLink}> Sign Up</Link>
      </p>
    </form>
  );
}
