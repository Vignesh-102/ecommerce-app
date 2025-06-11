import { Outlet, Link } from 'react-router-dom';
import styles from './Layout.module.css';

export default function Layout() {
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
        </nav>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        &copy; 2025 My eCommerce Store
      </footer>
    </>
  );
}
