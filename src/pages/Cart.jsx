import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
function Cart() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <Card>
              {" "}
              <div key={item.id} className="flex justify-between items-center">
                <h3 className="font-semibold">{item.name} </h3>

                <div className="flex gap-2 items-center">
                  <Button onClick={() => decreaseQuantity(item.id)}>-</Button>

                  <span>{item.quantity}</span>

                  <Button onClick={() => increaseQuantity(item.id)}>+</Button>
                </div>

                <p>${(item.price * item.quantity).toFixed(2)}</p>

                <Button onClick={() => removeFromCart(item.id)}>Remove</Button>
              </div>
            </Card>
          ))}

          <h2>Total: ${total.toFixed(2)}</h2>
          <Button onClick={() => navigate("/payment")}>
            Proceed to Checkout
          </Button>
        </>
      )}
    </div>
  );
}

export default Cart;
