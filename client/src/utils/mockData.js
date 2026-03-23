export const products = [
  // Electronics
  {
    id: 'e1',
    name: 'Nova Pro Max Smartphone',
    price: 999.00,
    discountPrice: 899.00,
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800'],
    rating: 4.8,
    stock: 25,
    description: 'The ultimate smartphone with AI-powered camera and 120Hz Diamond Display.',
    isFeatured: true
  },
  {
    id: 'e2',
    name: 'Quantum X Gaming Laptop',
    price: 1899.00,
    discountPrice: 1749.00,
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=800'],
    rating: 4.9,
    stock: 12,
    description: 'High-performance gaming laptop with NVIDIA RTX 5080 and 32GB RAM.',
    isFeatured: true
  },
  {
    id: 'e3',
    name: 'Sonic Air Wireless Headphones',
    price: 249.00,
    discountPrice: 199.00,
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800'],
    rating: 4.7,
    stock: 50,
    description: 'Active noise cancellation with 60-hour battery life and spatial audio.',
    isFeatured: false
  },
  // Fashion
  {
    id: 'f1',
    name: 'Neon Flux Sneakers',
    price: 150.00,
    discountPrice: 129.00,
    category: 'Sneakers',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800'],
    rating: 4.6,
    stock: 30,
    description: 'Modern aesthetic sneakers with breathable mesh and glow-in-the-dark accents.',
    isFeatured: true
  },
  {
    id: 'f2',
    name: 'Vanguard Leather Watch',
    price: 320.00,
    discountPrice: null,
    category: 'Watches',
    images: ['https://images.unsplash.com/photo-1524592094714-0f06a47ec9ad?q=80&w=800'],
    rating: 4.9,
    stock: 8,
    description: 'A timeless piece of elegance. Handcrafted leather strap with sapphire glass.',
    isFeatured: true
  },
  // Adding more mock data to reach 30+ gradually in implementation
  { id: 'f3', name: 'Astral Bomber Jacket', price: 110.00, discountPrice: 85.00, category: 'Fashion', images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800'], rating: 4.5, stock: 15, description: 'Futuristic bomber jacket with water-resistant fabric.', isFeatured: false },
  { id: 'e4', name: 'Vision Pro VR Headset', price: 499.00, discountPrice: 449.00, category: 'Electronics', images: ['https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=800'], rating: 4.8, stock: 20, description: 'Immersive VR experience with 8K resolution per eye.', isFeatured: true },
  { id: 'a1', name: 'Nano Charging Hub', price: 45.00, discountPrice: null, category: 'Accessories', images: ['https://images.unsplash.com/photo-1616423641454-eba5be463b28?q=80&w=800'], rating: 4.4, stock: 100, description: 'Compact multi-device charging station.', isFeatured: false },
  // ... (Full list will be expanded in the shop page implementation)
];

export const categories = [
  { id: 'c1', name: 'Electronics', slug: 'electronics', icon: 'Cpu' },
  { id: 'c2', name: 'Sneakers', slug: 'sneakers', icon: 'Footprints' },
  { id: 'c3', name: 'Fashion', slug: 'fashion', icon: 'Shirt' },
  { id: 'c4', name: 'Watches', slug: 'watches', icon: 'Watch' },
  { id: 'c5', name: 'Accessories', slug: 'accessories', icon: 'Glasses' },
];
