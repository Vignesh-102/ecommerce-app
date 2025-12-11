import { useForm } from "react-hook-form";
import { SignupFormData, signupSchema } from "../../../schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import styles from "./RegisterForm.module.css";

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const onSubmit = (data: SignupFormData) => {
    console.log("Signup Form Data:", data);
    // TODO: signup logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="username" className={styles.label}>
          Username
        </label>
        <input
          id="username"
          type="text"
          {...register("username")}
          className={`${styles.input} ${errors.username ? styles.inputError : ""}`}
          placeholder="Enter your username"
          autoComplete="username"
        />
        {errors.username && (
          <p className={styles.error}>{errors.username.message}</p>
        )}
      </div>

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
          className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
          placeholder="Your secure password"
          autoComplete="new-password"
        />
        {errors.password && (
          <p className={styles.error}>{errors.password.message}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="confirmPassword" className={styles.label}>
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
          className={`${styles.input} ${
            errors.confirmPassword ? styles.inputError : ""
          }`}
          placeholder="Re-enter your password"
          autoComplete="new-password"
        />
        {errors.confirmPassword && (
          <p className={styles.error}>{errors.confirmPassword.message}</p>
        )}
      </div>

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Signing up..." : "Sign Up"}
      </button>

      <p className={styles.signupText}>
        Already have an account?
        <Link to="/login" className={styles.signupLink}> Login</Link>
      </p>
    </form>
  );
}
