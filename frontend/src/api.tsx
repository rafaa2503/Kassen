import axios from "axios";
import { Order } from "./types";

const API_BASE_URL = "http://localhost:5066/api/Orders"; // Ensure correct backend URL

export const getOrders = async (): Promise<Order[]> => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

export const createOrder = async (): Promise<Order> => {
  try {
    const response = await axios.post(API_BASE_URL); // No arguments needed
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const updateOrderStatus = async (
  id: number,
  status: string
): Promise<void> => {
  try {
    await axios.put(
      `${API_BASE_URL}/${id}/status`,
      { status },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error(`Error updating order status ${id}:`, error);
    throw error;
  }
};

export const deleteOrder = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting order ${id}:`, error);
    throw error;
  }
};
