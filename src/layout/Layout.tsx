import { Outlet, Link, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Layout.module.css";
import { FaShoppingCart, FaUserCircle, FaSearch } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Category } from "../models/category.model";
import { axiosInstance } from "../lib/axios";
import { getCategories } from "../services/categoryService";

export default function Layout() {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const data = await getCategories();
        if (isMounted) {
          setCategories(data);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || "Something went wrong");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);


  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    setParams({search: searchTerm});
  };

  return (
    <>
      {/* Header / Navbar */}
      <header className={styles.header}>
        <div className={styles.navbar}>
          {/* Logo */}
          <Link to="/" className={styles.logo}>
            {t("layout.logo")}
          </Link>

          {/* Search Bar */}
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder={t("layout.searchPlaceholder")}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <button className={styles.searchBtn} onClick={handleSearch}>
              <FaSearch />
            </button>
          </div>

          {/* Right Actions */}
          <div className={styles.actions}>
            <Link to="/cart" className={styles.cart}>
              <FaShoppingCart size={20} /> {t("layout.cart")}
            </Link>
            <Link to="/profile" className={styles.profile}>
              <FaUserCircle size={20} /> {t("layout.account")}
            </Link>
          </div>
        </div>

        {/* Categories Bar */}
        <nav className={styles.categories}>
          {categories.map((cat) => (
            <Link key={cat.id} to={`category/${cat.slug}`}>
              {t(`layout.categories.${cat.slug}`, cat.name)}
            </Link>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerColumns}>
          <div>
            <h4>{t("layout.footer.about.title")}</h4>
            <ul>
              <li><Link to="/about">{t("layout.footer.about.links.aboutUs")}</Link></li>
              <li><Link to="/careers">{t("layout.footer.about.links.careers")}</Link></li>
              <li><Link to="/press">{t("layout.footer.about.links.press")}</Link></li>
            </ul>
          </div>
          <div>
            <h4>{t("layout.footer.help.title")}</h4>
            <ul>
              <li><Link to="/payments">{t("layout.footer.help.links.payments")}</Link></li>
              <li><Link to="/shipping">{t("layout.footer.help.links.shipping")}</Link></li>
              <li><Link to="/returns">{t("layout.footer.help.links.returns")}</Link></li>
            </ul>
          </div>
          <div>
            <h4>{t("layout.footer.policies.title")}</h4>
            <ul>
              <li><Link to="/privacy">{t("layout.footer.policies.links.privacy")}</Link></li>
              <li><Link to="/terms">{t("layout.footer.policies.links.terms")}</Link></li>
              <li><Link to="/security">{t("layout.footer.policies.links.security")}</Link></li>
            </ul>
          </div>
        </div>
        <div className={styles.copy}>
          {t("layout.footer.copy")}
        </div>
      </footer>
    </>
  );
}
