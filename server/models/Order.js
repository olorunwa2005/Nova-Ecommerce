const db = require('../config/db');

const Order = {
  create: async (userId, totalAmount, shippingAddress, items) => {
    // Start transaction
    const client = await db.pool?.connect() || db; // Handle basic pool or client
    try {
      if (client.query) { // Normal DB pool
        await client.query('BEGIN');
      }
      
      const orderResult = await client.query(
        'INSERT INTO orders (user_id, total_amount, shipping_address) VALUES ($1, $2, $3) RETURNING *',
        [userId, totalAmount, JSON.stringify(shippingAddress)]
      );
      const order = orderResult.rows[0];

      for (const item of items) {
        await client.query(
          'INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES ($1, $2, $3, $4)',
          [order.id, item.id, item.quantity, item.discount_price || item.price]
        );
      }

      if (client.query) {
        await client.query('COMMIT');
      }
      return order;
    } catch (error) {
      if (client.query) {
        await client.query('ROLLBACK');
      }
      throw error;
    }
  },

  findByUserId: async (userId) => {
    const result = await db.query('SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
    return result.rows;
  },

  updateStatus: async (orderId, status) => {
    const result = await db.query('UPDATE orders SET status = $1 WHERE id = $2 RETURNING *', [status, orderId]);
    return result.rows[0];
  }
};

module.exports = Order;
