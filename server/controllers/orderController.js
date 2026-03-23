const Order = require('../models/Order');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createOrder = async (req, res) => {
  try {
    const { totalAmount, shippingAddress, items } = req.body;
    const userId = req.user.id;

    const order = await Order.create(userId, totalAmount, shippingAddress, items);

    // Create a PaymentIntent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Amount in cents
      currency: 'usd',
      metadata: { order_id: order.id },
    });

    res.status(201).json({ 
      order, 
      clientSecret: paymentIntent.client_secret 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.findByUserId(req.params.userId || req.user.id);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
