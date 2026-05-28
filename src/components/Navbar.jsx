import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-lg border-b border-white/10 shadow-xl px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 text-white">
        <Link
          to="/"
          className="text-2xl font-semibold tracking-tight text-sky-300"
        >
          RestaurantHub
        </Link>

        <div className="hidden items-center gap-4 md:flex text-sm font-medium text-slate-100">
          <Link
            to="/menu"
            className="inline-flex h-10 items-center rounded-full px-4 hover:text-white transition"
          >
            Menu
          </Link>

          <Link
            to="/reservations"
            className="inline-flex h-10 items-center rounded-full px-4 hover:text-white transition"
          >
            Reservations
          </Link>

          <Link
            to="/cart"
            className="inline-flex h-10 items-center rounded-full px-4 hover:text-white transition"
          >
            Cart ({cartCount})
          </Link>

          {user ? (
            <>
              <Link
                to="/profile"
                className="inline-flex h-10 items-center rounded-full px-4 hover:text-white transition"
              >
                Profile
              </Link>

              <button
                type="button"
                onClick={logout}
                className="inline-flex h-10 items-center rounded-full border border-slate-200/10 px-4 text-sm text-slate-100 transition hover:bg-slate-800"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="inline-flex h-10 items-center rounded-full border border-slate-200/10 px-4 text-sm text-slate-100 transition hover:bg-slate-800"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="inline-flex h-10 items-center rounded-full bg-sky-500 px-4 text-sm font-semibold text-white transition hover:bg-sky-400"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
