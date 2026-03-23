import { create } from 'zustand';

// Helper to get token and user from localStorage
const getInitialState = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  return {
    token: token || null,
    user: user ? JSON.parse(user) : null,
  };
};

const useStore = create((set) => ({
  ...getInitialState(),
  cart: [],
  wishlist: [],
  isDarkMode: false,
  
  // Auth actions
  setUser: (user, token) => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    if (token) localStorage.setItem('token', token);
    set({ user, token });
  },
  
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: null, cart: [], wishlist: [] });
  },
  
  // Cart actions
  // ... (keep existing cart actions)
  addToCart: (product) => set((state) => {
    const existing = state.cart.find(item => item.id === product.id);
    if (existing) {
      return { cart: state.cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )};
    }
    return { cart: [...state.cart, { ...product, quantity: 1 }] };
  }),
  
  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter(item => item.id !== productId)
  })),
  
  updateQuantity: (productId, quantity) => set((state) => ({
    cart: state.cart.map(item => 
      item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
    )
  })),
  
  // UI actions
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  
  // Wishlist actions
  toggleWishlist: (product) => set((state) => {
    const exists = state.wishlist.find(item => item.id === product.id);
    if (exists) {
      return { wishlist: state.wishlist.filter(item => item.id !== product.id) };
    }
    return { wishlist: [...state.wishlist, product] };
  }),
}));

export default useStore;
