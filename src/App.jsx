import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./components/admin/ProtectedRoute";
// Admin Pages
import AdminLayout from "./layouts/AdminLayout";
import MainLayout from "./layouts/MainLayout";
import AddProduct from "./pages/admin/AddProduct";
import Customers from "./pages/admin/Customers";
import Dashboard from "./pages/admin/Dashboard";
import EditProduct from "./pages/admin/EditProduct";
import Login from "./pages/admin/Login";
import Orders from "./pages/admin/Orders";
import Products from "./pages/admin/Products";
import Settings from "./pages/admin/Settings";
// Info Pages
import FAQs from "./pages/info/FAQs";
import PrivacyPolicy from "./pages/info/PrivacyPolicy";
import ReturnsAndExchanges from "./pages/info/ReturnsAndExchanges";
import SizeGuide from "./pages/info/SizeGuide";
import TermsOfService from "./pages/info/TermsOfService";
// Shop Pages
import ScrollToTop from "./components/shared/ScrollToTop";
import About from "./pages/shop/About";
import Cart from "./pages/shop/Cart";
import Checkout from "./pages/shop/Checkout";
import Home from "./pages/shop/Home";
import OrderSuccess from "./pages/shop/OrderSuccess";
import OurStore from "./pages/shop/OurStore";
import ProductDetails from "./pages/shop/ProductDetails";
import Shop from "./pages/shop/Shop";
import TrackOrder from "./pages/shop/TrackOrder";

function App() {
  return (
    <Router>
      <ScrollToTop />
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

        {/* PROTECTED ROUTES */}
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
