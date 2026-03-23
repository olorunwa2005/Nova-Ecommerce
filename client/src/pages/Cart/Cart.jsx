import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, ShoppingCart, ShoppingBag, ArrowRight } from 'lucide-react';
import useStore from '../../store/useStore';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity } = useStore();
    const subtotal = cart.reduce((acc, item) => acc + (item.discountPrice || item.price) * item.quantity, 0);
    const shipping = subtotal > 150 ? 0 : 25;
    const total = subtotal + shipping;

    if (cart.length === 0) {
        return (
            <div className="pt-32 pb-20 min-h-screen flex flex-col items-center justify-center text-center px-4">
                <div className="w-24 h-24 bg-navy/5 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag size={48} className="text-navy/20" />
                </div>
                <h1 className="text-4xl font-black text-navy mb-4 italic">Your bundle is empty.</h1>
                <p className="text-navy/40 text-lg mb-10 max-w-md mx-auto">Discover our exclusive gear and start your elite journey today.</p>
                <Link to="/shop" className="btn-gradient px-12 h-16 font-black text-lg flex items-center space-x-3">
                    <span>Explore Catalog</span>
                    <ArrowRight size={20} />
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 min-h-screen bg-gray-50/50">
            <div className="container mx-auto px-6">
                <h1 className="text-5xl font-black text-navy mb-12 tracking-tighter">Your <span className="text-diamond">Bundle</span></h1>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Cart Items */}
                    <div className="lg:w-2/3 space-y-6">
                        {cart.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass p-6 bg-white/40 flex flex-col md:flex-row items-center gap-6"
                            >
                                <div className="w-32 h-32 rounded-2xl overflow-hidden bg-navy/5 shrink-0 shadow-sm">
                                    <img src={item.images[0]} className="w-full h-full object-cover" />
                                </div>
                                <div className="grow text-center md:text-left">
                                    <h3 className="text-xl font-bold text-navy truncate max-w-xs">{item.name}</h3>
                                    <p className="text-diamond font-black mt-1">${item.discountPrice || item.price}</p>
                                    <div className="flex items-center justify-center md:justify-start space-x-4 mt-4">
                                        <div className="flex items-center bg-navy/5 rounded-full px-3 py-1">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-8 h-8 flex items-center justify-center text-navy font-bold hover:text-diamond"
                                            >-</button>
                                            <span className="w-10 text-center font-black text-navy text-sm">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-8 h-8 flex items-center justify-center text-navy font-bold hover:text-diamond"
                                            >+</button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="p-2 text-navy/20 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                                <div className="md:text-right">
                                    <p className="text-xs text-navy/30 font-bold uppercase tracking-widest mb-1">Total</p>
                                    <p className="text-2xl font-black text-navy">
                                        ${((item.discountPrice || item.price) * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="lg:w-1/3">
                        <div className="glass p-10 bg-white/40 sticky top-32 space-y-8">
                            <h3 className="text-2xl font-black text-navy">Order Overview</h3>
                            <div className="space-y-4 border-b border-navy/5 pb-6">
                                <div className="flex justify-between text-navy/60 font-medium italic">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-navy/60 font-medium italic">
                                    <span>Shipping</span>
                                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center text-4xl font-black text-navy py-4">
                                <span>Total</span>
                                <span className="text-diamond">${total.toFixed(2)}</span>
                            </div>
                            <Link
                                to="/checkout"
                                className="btn-gradient w-full h-16 font-black text-xl flex items-center justify-center space-x-3 shadow-2xl shadow-diamond/20"
                            >
                                <ShoppingCart size={24} />
                                <span>Checkout Process</span>
                            </Link>
                            <p className="text-[10px] text-center text-navy/30 font-black uppercase tracking-[0.2em]">Secure Checkout • Nova Protocol V2</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
