import { useState } from "react";
import { createOrder } from "../api";

interface Props {
  onOrderCreated: (orderId: number) => void;
}

const OrderForm: React.FC<Props> = ({ onOrderCreated }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newOrder = await createOrder(); // No arguments needed
      onOrderCreated(newOrder.id);
    } catch (error) {
      console.error("Error creating order:", error);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" disabled={loading}>
        {loading ? "Processing..." : "Place Order"}
      </button>
    </form>
  );
};

export default OrderForm; // ✅ Make sure it has a default export
