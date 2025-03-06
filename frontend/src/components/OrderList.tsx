import { useEffect, useState } from "react";
import { getOrders, deleteOrder } from "../api";
import { Order } from "../types";

const OrderList: React.FC = () => {
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

  const handleDelete = async (id: number) => {
    try {
      await deleteOrder(id);
      fetchOrders();
    } catch (error) {
      console.error(`Error deleting order ${id}:`, error);
    }
  };

  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Order {order.id}: {order.status}{" "}
            <button onClick={() => handleDelete(order.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
