const db = require('../config/db');
const { mockProducts } = require('../utils/mockData');

const Product = {
  findAll: async (filters = {}) => {
    try {
      let query = 'SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id';
      const params = [];
      
      if (filters.category) {
        params.push(filters.category);
        query += ` WHERE c.name = $${params.length}`;
      }
      
      if (filters.search) {
        params.push(`%${filters.search}%`);
        query += params.length === 1 ? ' WHERE p.name ILIKE $1' : ` AND p.name ILIKE $${params.length}`;
      }

      const result = await db.query(query, params);
      return result.rows;
    } catch (error) {
      console.warn('Database connection failed, returning mock data:', error.message);
      
      // Basic filtering for mock data
      let filtered = [...mockProducts];
      if (filters.category && filters.category !== 'All') {
        filtered = filtered.filter(p => p.category_name === filters.category);
      }
      if (filters.search) {
        const search = filters.search.toLowerCase();
        filtered = filtered.filter(p => p.name.toLowerCase().includes(search));
      }
      return filtered;
    }
  },

  findById: async (id) => {
    try {
      const result = await db.query(
        'SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.id = $1',
        [id]
      );
      if (result.rows.length > 0) return result.rows[0];
    } catch (error) {
      console.warn('Database connection failed for findById, returning from mock data');
    }
    
    return mockProducts.find(p => p.id === parseInt(id) || p.id === id);
  },

  create: async (productData) => {
    try {
      const { vendor_id, category_id, name, slug, description, price, discount_price, images, stock, specifications } = productData;
      const result = await db.query(
        `INSERT INTO products (vendor_id, category_id, name, slug, description, price, discount_price, images, stock, specifications)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
        [vendor_id, category_id, name, slug, description, price, discount_price, images, stock, specifications]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Database connection failed for create:', error.message);
      throw new Error('Database is unavailable for write operations.');
    }
  }
};

module.exports = Product;
