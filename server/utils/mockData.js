const mockProducts = [
  {
    id: 1,
    name: 'Nova Pro Max Smartphone',
    slug: 'nova-pro-max',
    price: 999.00,
    discount_price: 899.00,
    category_name: 'Electronics',
    images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800'],
    rating: 4.8,
    stock: 25,
    description: 'The ultimate smartphone with AI-powered camera and 120Hz Diamond Display.',
    is_featured: true
  },
  {
    id: 2,
    name: 'Quantum X Gaming Laptop',
    slug: 'quantum-x-laptop',
    price: 1899.00,
    discount_price: 1749.00,
    category_name: 'Electronics',
    images: ['https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=800'],
    rating: 4.9,
    stock: 12,
    description: 'High-performance gaming laptop with NVIDIA RTX 5080 and 32GB RAM.',
    is_featured: true
  },
  {
    id: 3,
    name: 'Sonic Air Wireless Headphones',
    slug: 'sonic-air-headphones',
    price: 249.00,
    discount_price: 199.00,
    category_name: 'Electronics',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800'],
    rating: 4.7,
    stock: 50,
    description: 'Active noise cancellation with 60-hour battery life and spatial audio.',
    is_featured: false
  },
  {
    id: 4,
    name: 'Neon Flux Sneakers',
    slug: 'neon-flux-sneakers',
    price: 150.00,
    discount_price: 129.00,
    category_name: 'Sneakers',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800'],
    rating: 4.6,
    stock: 30,
    description: 'Modern aesthetic sneakers with breathable mesh and glow-in-the-dark accents.',
    is_featured: true
  },
  {
    id: 5,
    name: 'Vanguard Leather Watch',
    slug: 'vanguard-watch',
    price: 320.00,
    discount_price: null,
    category_name: 'Watches',
    images: ['https://images.unsplash.com/photo-1524592094714-0f06a47ec9ad?q=80&w=800'],
    rating: 4.9,
    stock: 8,
    description: 'A timeless piece of elegance. Handcrafted leather strap with sapphire glass.',
    is_featured: true
  }
];

module.exports = { mockProducts };
