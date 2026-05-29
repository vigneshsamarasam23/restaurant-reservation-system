import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    loading,
  } = useCart();
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
        <p>Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <Card key={item.id}>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm text-slate-500">{item.description}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button onClick={() => decreaseQuantity(item.id)}>-</Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button onClick={() => increaseQuantity(item.id)}>+</Button>
                  </div>

                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <Button
                    variant="secondary"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">
                Total: ${total.toFixed(2)}
              </h2>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Button onClick={() => navigate("/payment")}>
                Proceed to Checkout
              </Button>
              <Button variant="secondary" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
