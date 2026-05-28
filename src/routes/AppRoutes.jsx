import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Menu from "../pages/Menu";
import Reservations from "../pages/Reservations";
import Cart from "../pages/Cart";
import Payment from "../pages/Payment";
import Profile from "../pages/Profile";
import ProtectedRoute from "../components/ProtectedRoute";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/menu" element={<Menu />} />
      {/* <Route path="/reservations" element={<Reservations />} /> */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/profile" element={<Profile />} />
      <Route
        path="/reservations"
        element={
          <ProtectedRoute>
            <Reservations />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
