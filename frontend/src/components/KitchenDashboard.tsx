import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../api";
import { Order } from "../types";

const KitchenDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data.filter((order) => order.status !== "Ready")); // Show only active orders
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleStatusUpdate = async (id: number, newStatus: string) => {
    try {
      await updateOrderStatus(id, newStatus);
      fetchOrders();
    } catch (error) {
      console.error(`Error updating order ${id}:`, error);
    }
  };

  return (
    <div>
      <h1>Kitchen Orders</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Order {order.id} - Status: {order.status}{" "}
            {order.status === "New" && (
              <button
                onClick={() => handleStatusUpdate(order.id, "In Progress")}
              >
                Start Preparation
              </button>
            )}
            {order.status === "In Progress" && (
              <button onClick={() => handleStatusUpdate(order.id, "Ready")}>
                Mark as Ready
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KitchenDashboard;
