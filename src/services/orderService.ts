
interface Order {
  id: string;
  items: any[];
  total: number;
  date: string;
  status: string;
  userName?: string;
  userEmail?: string;
}

interface SalesData {
  [category: string]: number;
}

// Get all orders from localStorage
export const getAllOrders = (): Order[] => {
  const savedOrders = localStorage.getItem('orders');
  return savedOrders ? JSON.parse(savedOrders) : [];
};

// Get order by ID
export const getOrderById = (orderId: string): Order | null => {
  const orders = getAllOrders();
  return orders.find(order => order.id === orderId) || null;
};

// Save orders to localStorage
export const saveOrders = (orders: Order[]): void => {
  localStorage.setItem('orders', JSON.stringify(orders));
  
  // If no orders left, clear sales data
  if (orders.length === 0) {
    clearSalesData();
  } else {
    // Update sales data based on all current orders
    syncSalesDataWithOrders();
  }
};

// Delete an order and update sales data
export const deleteOrder = (orderId: string): void => {
  const orders = getAllOrders();
  const updatedOrders = orders.filter(order => order.id !== orderId);
  saveOrders(updatedOrders);
  
  // Sales data will be updated in saveOrders
};

// Update order status
export const updateOrderStatus = (orderId: string, newStatus: string): void => {
  const orders = getAllOrders();
  const updatedOrders = orders.map(order => {
    if (order.id === orderId) {
      return { ...order, status: newStatus };
    }
    return order;
  });
  
  saveOrders(updatedOrders);
};

// Clear all sales data
export const clearSalesData = (): void => {
  localStorage.removeItem('salesData');
};

// Synchronize sales data with current orders
export const syncSalesDataWithOrders = (): void => {
  const orders = getAllOrders();
  
  // If no orders, clear sales data
  if (orders.length === 0) {
    clearSalesData();
    return;
  }
  
  // Recalculate sales data based on quantity of items sold, not price
  const salesData: SalesData = {};
  
  orders.forEach(order => {
    order.items.forEach(item => {
      // Use the item's name or type for category
      const category = item.name || item.type || 'Other';
      if (!salesData[category]) {
        salesData[category] = 0;
      }
      // Count the quantity of items sold, regardless of price
      salesData[category] += item.quantity || 1;
    });
  });
  
  // Save updated sales data
  localStorage.setItem('salesData', JSON.stringify(salesData));
};

// Add a new order and update sales data
export const addOrder = (order: Order): void => {
  const orders = getAllOrders();
  orders.push(order);
  saveOrders(orders);
  
  // Sales data will be updated in saveOrders
};
