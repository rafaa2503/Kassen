import { useEffect, useState } from "react";
import OrderForm from "../components/OrderForm"; // ✅ Ensure this is correctly imported
import { getOrders } from "../api";
import { Order } from "../types";

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleOrderCreated = (orderId: number) => {
    // ✅ Explicitly define orderId's type
    console.log(`New order created with ID: ${orderId}`);
    fetchOrders();
  };

  return (
    <div>
      <h1>Orders</h1>
      <OrderForm onOrderCreated={handleOrderCreated} />
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Order {order.id}: {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersPage;
