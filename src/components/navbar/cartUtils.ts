
// Define CartItem type
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// Load cart from local storage
export const loadCartFromStorage = (): CartItem[] => {
  const savedCartItems = localStorage.getItem('cartItems');
  if (savedCartItems) {
    return JSON.parse(savedCartItems);
  }
  return [];
};

// Save cart to local storage
export const saveCartToStorage = (items: CartItem[]): void => {
  localStorage.setItem('cartItems', JSON.stringify(items));
  // Dispatch storage event to notify other components
  window.dispatchEvent(new Event('storage'));
};

// Add item to cart
export const addItemToCart = (
  item: {
    id: string;
    name: string;
    price: number;
    quantity?: number;
    image: string;
  },
  currentItems: CartItem[]
): CartItem[] => {
  const newItem = {
    ...item,
    quantity: item.quantity || 1
  };
  
  // Check if item already exists in cart
  const existingItemIndex = currentItems.findIndex(i => i.id === newItem.id);
  
  let updatedItems;
  if (existingItemIndex >= 0) {
    // Update quantity if item exists
    updatedItems = [...currentItems];
    updatedItems[existingItemIndex] = {
      ...updatedItems[existingItemIndex],
      quantity: updatedItems[existingItemIndex].quantity + 1
    };
  } else {
    // Add new item if it doesn't exist
    updatedItems = [...currentItems, newItem];
  }
  
  // Save to localStorage
  saveCartToStorage(updatedItems);
  
  return updatedItems;
};

// Remove item from cart
export const removeItemFromCart = (id: string, currentItems: CartItem[]): CartItem[] => {
  const updatedItems = currentItems.filter(item => item.id !== id);
  saveCartToStorage(updatedItems);
  return updatedItems;
};

// Update item quantity in cart
export const updateItemQuantity = (
  id: string,
  quantity: number,
  currentItems: CartItem[]
): CartItem[] => {
  // Don't allow quantities less than 1
  if (quantity < 1) {
    return currentItems;
  }
  
  const updatedItems = currentItems.map(item => {
    if (item.id === id) {
      return { ...item, quantity };
    }
    return item;
  });
  
  saveCartToStorage(updatedItems);
  return updatedItems;
};

