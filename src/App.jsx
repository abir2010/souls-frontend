import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import MainLayout from "./layouts/MainLayout";

// Shop Pages
import Checkout from "./pages/shop/Checkout";
import Home from "./pages/shop/Home";
import ProductDetails from "./pages/shop/ProductDetails";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import Login from "./pages/admin/Login";
import About from "./pages/shop/About";
import Cart from "./pages/shop/Cart";
import OurStore from "./pages/shop/OurStore";
import Shop from "./pages/shop/Shop";

import { useEffect } from "react";
import axiosInstance from "./api/axiosInstance";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AddProduct from "./pages/admin/AddProduct";
import Customers from "./pages/admin/Customers";
import EditProduct from "./pages/admin/EditProduct";
import Orders from "./pages/admin/Orders";
import Products from "./pages/admin/Products";
import Settings from "./pages/admin/Settings";
import FAQs from "./pages/info/FAQs";
import PrivacyPolicy from "./pages/info/PrivacyPolicy";
import ReturnsAndExchanges from "./pages/info/ReturnsAndExchanges";
import SizeGuide from "./pages/info/SizeGuide";
import TermsOfService from "./pages/info/TermsOfService";
import OrderSuccess from "./pages/shop/OrderSuccess";
import TrackOrder from "./pages/shop/TrackOrder";

function App() {
  // A simple component to test backend connectivity on app load
  const TestConnection = () => {
    useEffect(() => {
      const pingBackend = async () => {
        try {
          // Assuming you have a basic GET /api/products route in your backend
          const res = await axiosInstance.get("/products");
          console.log("Backend Connection Successful!", res.data);
        } catch (error) {
          console.error("Backend Connection Failed:", error.message);
        }
      };
      pingBackend();
    }, []);

    return null;
  };
  // TestConnection(); // Call the test connection component

  return (
    <Router>
      <Routes>
        {/* Customer Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="location" element={<OurStore />} />
          <Route path="about" element={<About />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order-success" element={<OrderSuccess />} />
          <Route path="/track" element={<TrackOrder />} />
          <Route path="/returns" element={<ReturnsAndExchanges />} />
          <Route path="/size-guide" element={<SizeGuide />} />
          <Route path="/faq" element={<FAQs />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="product/:code" element={<ProductDetails />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route path="/admin/login" element={<Login />} />

        {/* Wrap the entire admin section in the ProtectedRoute */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="products/edit/:id" element={<EditProduct />} />
            <Route path="orders" element={<Orders />} />
            <Route path="customers" element={<Customers />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
