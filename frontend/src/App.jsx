import { React, createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Welcome from "./pages/Welcome";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import HomeBooks from "./pages/HomeBooks";
import AddBooks from "./pages/AddBooks";
import Cart from "./pages/Cart";
import OrderHistory from "./pages/OrderHistory";
import AdminOrders from "./pages/AdminOrders";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAddBook from "./pages/AdminAddBook";
import AdminEditBook from "./pages/AdminEditBook";
import Books from "./pages/Books";

export const LoginContext = createContext();

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState("");

  return (
    <LoginContext.Provider
      value={{ isLogin, setIsLogin, isAdmin, setIsAdmin, userId, setUserId }}
    >
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/books" element={<Books />} />
          <Route path="/homeBooks" element={<HomeBooks />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addBook" element={<AddBooks />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orderHistory" element={<OrderHistory />} />
          <Route path="/adminOrders" element={<AdminOrders />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/adminAddBook" element={<AdminAddBook />} />
          <Route path="/adminEditBook" element={<AdminEditBook />} />
        </Routes>
        <Footer />
      </Router>
    </LoginContext.Provider>
  );
}

export default App;
