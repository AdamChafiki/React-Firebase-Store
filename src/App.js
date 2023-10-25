import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
// import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ProductsById from "./pages/ProductById";
import Cart from "./pages/Cart";
import ProductSearch from "./pages/ProductsSearch";
import NotFound from "./pages/NotFound";
import Account from "./pages/Account";
import Login from "./pages/Login";
import ProductByCat from "./pages/ProductByCat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductsById />} />
          <Route path="/product/search" element={<ProductSearch />} />
          <Route path="/product/category/:name" element={<ProductByCat />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
