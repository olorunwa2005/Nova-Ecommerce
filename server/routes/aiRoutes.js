const express = require('express');
const router = express.Router();

router.post('/chat', async (req, res) => {
    const { message } = req.body;
    
    // Simple rule-based AI for now
    let reply = "I'm Nova, your AI assistant. I'm currently learning more about our collection to better help you!";
    
    const lowerMsg = message.toLowerCase();
    if (lowerMsg.includes('laptop')) {
        reply = "Our Quantum X Series laptops are designed for ultimate performance. You can find them in the 'Laptops' category!";
    } else if (lowerMsg.includes('shipping') || lowerMsg.includes('delivery')) {
        reply = "We offer premium express shipping worldwide. Most orders arrive within 3-5 business days.";
    } else if (lowerMsg.includes('discount') || lowerMsg.includes('sale')) {
        reply = "Check out our 'Featured Gear' section for the latest deals and exclusive offers!";
    }

    // Simulate network delay
    setTimeout(() => {
        res.json({ reply });
    }, 800);
});

module.exports = router;
