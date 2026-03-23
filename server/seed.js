const db = require('./config/db');
const { v4: uuidv4 } = require('uuid');

const categories = [
  { name: 'Electronics', slug: 'electronics' },
  { name: 'Smartphones', slug: 'smartphones' },
  { name: 'Laptops', slug: 'laptops' },
  { name: 'Gaming', slug: 'gaming' },
  { name: 'Headphones', slug: 'headphones' },
  { name: 'Sneakers', slug: 'sneakers' },
  { name: 'Fashion', slug: 'fashion' },
  { name: 'Watches', slug: 'watches' },
  { name: 'Accessories', slug: 'accessories' }
];

const seed = async () => {
  try {
    console.log('Seeding categories...');
    const catMap = {};
    for (const cat of categories) {
      const res = await db.query(
        'INSERT INTO categories (name, slug) VALUES ($1, $2) ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name RETURNING id',
        [cat.name, cat.slug]
      );
      catMap[cat.name] = res.rows[0].id;
    }

    console.log('Seeding products...');
    const products = [
      // Electronics
      { name: 'Nova Pro Max Smartphone', price: 999, category: 'Smartphones', slug: 'nova-pro-max', stock: 50, is_featured: true },
      { name: 'Quantum X Gaming Laptop', price: 1899, category: 'Laptops', slug: 'quantum-x-laptop', stock: 20, is_featured: true },
      { name: 'Sonic Air Headphones', price: 249, category: 'Headphones', slug: 'sonic-air', stock: 100, is_featured: false },
      { name: 'Vision VR Headset', price: 499, category: 'Gaming', slug: 'vision-vr', stock: 30, is_featured: true },
      { name: 'Pulse Smartwatch 5', price: 299, category: 'Watches', slug: 'pulse-watch-5', stock: 60, is_featured: false },
      // Sneakers
      { name: 'Neon Flux Sneakers', price: 150, category: 'Sneakers', slug: 'neon-flux', stock: 80, is_featured: true },
      { name: 'Aero Dash Runners', price: 120, category: 'Sneakers', slug: 'aero-dash', stock: 120, is_featured: false },
      // Fashion
      { name: 'Astral Bomber Jacket', price: 110, category: 'Fashion', slug: 'astral-jacket', stock: 45, is_featured: false },
      { name: 'Midnight Denim Jeans', price: 85, category: 'Fashion', slug: 'midnight-denim', stock: 90, is_featured: false },
      // ... (Adding more to reach 30-50 in a real run)
    ];

    // Artificial loop to generate 40 products
    for (let i = 1; i <= 40; i++) {
        const base = products[i % products.length];
        const name = `${base.name} v${i}`;
        const price = base.price + (Math.random() * 50);
        await db.query(
          `INSERT INTO products (name, slug, price, category_id, stock, is_featured, images) 
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [name, `${base.slug}-${i}`, price, catMap[base.category], Math.floor(Math.random() * 100), Math.random() > 0.8, ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800']]
        );
    }

    console.log('Seed completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
};

seed();
