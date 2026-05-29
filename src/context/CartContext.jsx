import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import {
  fetchCart,
  addToCart as addToCartAPI,
  removeFromCart as removeFromCartAPI,
  clearCart as clearCartAPI,
  updateCartItem as updateCartItemAPI,
} from "../services/api";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load cart from backend or localStorage on user change
  useEffect(() => {
    const loadCart = async () => {
      if (user && user.email) {
        try {
          setLoading(true);
          const data = await fetchCart(user.email);
          setCart(data);
        } catch (error) {
          console.error("Error fetching cart from backend:", error);
          // Fallback to localStorage
          const savedCart = localStorage.getItem("cart");
          setCart(savedCart ? JSON.parse(savedCart) : []);
        } finally {
          setLoading(false);
        }
      } else {
        // User not logged in, use localStorage
        const savedCart = localStorage.getItem("cart");
        setCart(savedCart ? JSON.parse(savedCart) : []);
        setLoading(false);
      }
    };

    loadCart();
  }, [user]);

  // Always sync with localStorage as backup
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const increaseQuantity = async (id) => {
    const item = cart.find((cartItem) => cartItem.id === id);
    if (!item) return;

    const newQuantity = item.quantity + 1;

    if (user && user.email) {
      try {
        const updatedCart = await updateCartItemAPI(
          user.email,
          id,
          newQuantity,
        );
        setCart(updatedCart);
        return;
      } catch (error) {
        console.error("Error updating cart quantity on backend:", error);
      }
    }

    setCart((prev) =>
      prev.map((cartItem) =>
        cartItem.id === id
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            }
          : cartItem,
      ),
    );
  };

  const decreaseQuantity = async (id) => {
    const item = cart.find((cartItem) => cartItem.id === id);
    if (!item) return;

    const newQuantity = item.quantity - 1;

    if (user && user.email) {
      try {
        const updatedCart = await updateCartItemAPI(
          user.email,
          id,
          newQuantity,
        );
        setCart(updatedCart);
        return;
      } catch (error) {
        console.error("Error updating cart quantity on backend:", error);
      }
    }

    setCart((prev) =>
      prev
        .map((cartItem) =>
          cartItem.id === id
            ? {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              }
            : cartItem,
        )
        .filter((cartItem) => cartItem.quantity > 0),
    );
  };
  const clearCart = async () => {
    if (user && user.email) {
      try {
        await clearCartAPI(user.email);
      } catch (error) {
        console.error("Error clearing cart on backend:", error);
      }
    }
    setCart([]);
  };
  const addToCart = async (item) => {
    if (user && user.email) {
      try {
        const updatedCart = await addToCartAPI(user.email, item);
        setCart(updatedCart);
      } catch (error) {
        console.error("Error adding to cart on backend:", error);
        setCart((prev) => {
          const existingItem = prev.find((cartItem) => cartItem.id === item.id);
          if (existingItem) {
            return prev.map((cartItem) =>
              cartItem.id === item.id
                ? {
                    ...cartItem,
                    quantity: cartItem.quantity + 1,
                  }
                : cartItem,
            );
          }
          return [
            ...prev,
            {
              ...item,
              quantity: 1,
            },
          ];
        });
      }
    } else {
      setCart((prev) => {
        const existingItem = prev.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
          return prev.map((cartItem) =>
            cartItem.id === item.id
              ? {
                  ...cartItem,
                  quantity: cartItem.quantity + 1,
                }
              : cartItem,
          );
        }
        return [
          ...prev,
          {
            ...item,
            quantity: 1,
          },
        ];
      });
    }
  };

  const removeFromCart = async (id) => {
    if (user && user.email) {
      try {
        const updatedCart = await removeFromCartAPI(user.email, id);
        setCart(updatedCart);
      } catch (error) {
        console.error("Error removing from cart on backend:", error);
        setCart((prev) => prev.filter((item) => item.id !== id));
      }
    } else {
      setCart((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
