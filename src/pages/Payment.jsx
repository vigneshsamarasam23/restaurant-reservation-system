import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Navigate } from "react-router-dom";
import Button from "../components/ui/Button";
function Payment() {
  const navigate = useNavigate();

  const { cart, clearCart } = useCart();
  if (cart.length === 0) {
    return <Navigate to="/cart" />;
  }
  const [cardNumber, setCardNumber] = useState("");

  const [cardHolder, setCardHolder] = useState("");

  const [cvv, setCvv] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayment = () => {
    if (!cardNumber || !cardHolder || !cvv) {
      alert("Please complete payment details");
      return;
    }

    clearCart();

    alert("Payment Successful!");

    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <h2>Order Summary</h2>

      {cart.map((item) => (
        <div key={item.id} className="space-y-4">
          <p>
            {item.name} x{item.quantity}
          </p>
        </div>
      ))}

      <h2>Total: ${total.toFixed(2)}</h2>

      <hr />

      <h2>Payment Details</h2>

      <input
        type="text"
        placeholder="Card Number"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
      />

      <br />

      <input
        type="text"
        placeholder="Card Holder"
        value={cardHolder}
        onChange={(e) => setCardHolder(e.target.value)}
      />

      <br />

      <input
        type="password"
        placeholder="CVV"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
      />

      <br />

      <Button onClick={handlePayment} className="w-full">
        Pay Now
      </Button>
    </div>
  );
}

export default Payment;
