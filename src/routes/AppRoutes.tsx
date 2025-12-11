import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Layout from "../layout/Layout";
import Home from "../pages/home/home";
import ProductDetail from "../pages/product details/product-detail";
import LoginPage from "../auth/pages/login/login.page";
import Cart from "../components/cart/cart";
import AuthPage from "../auth/pages/auth page/AuthPage";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />
            <Route path="/" element={<PrivateRoute />}>
                <Route element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="category/:slug" element={<Home />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="product/:id" element={<ProductDetail />} />
                </Route>
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}
