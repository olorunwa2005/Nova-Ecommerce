import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import useStore from '../../store/useStore';

const CartDrawer = ({ isOpen, onClose }) => {
    const { cart, removeFromCart, updateQuantity } = useStore();

    const subtotal = cart.reduce((acc, item) => acc + (item.discountPrice || item.price) * item.quantity, 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-60"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-70 shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-navy/5 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <ShoppingBag className="text-diamond" />
                                <h2 className="text-xl font-bold text-navy">Your Cart ({cart.length})</h2>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-navy/5 rounded-full transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="grow overflow-y-auto p-6 space-y-6">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center opacity-30">
                                    <ShoppingBag size={80} className="mb-4" />
                                    <p className="text-lg font-medium">Your cart is empty</p>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div key={item.id} className="flex space-x-4 group">
                                        <div className="w-24 h-24 rounded-xl overflow-hidden bg-navy/5">
                                            <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="grow">
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="font-bold text-navy line-clamp-1">{item.name}</h3>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-navy/20 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            <p className="text-diamond font-bold mb-3">${item.discountPrice || item.price}</p>

                                            <div className="flex items-center space-x-3">
                                                <div className="flex items-center border border-navy/10 rounded-full px-2 py-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1 hover:text-diamond transition-colors"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 hover:text-diamond transition-colors"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="p-6 border-t border-navy/5 bg-navy/5 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-navy/60 font-medium">Subtotal</span>
                                    <span className="text-2xl font-black text-navy">${subtotal.toFixed(2)}</span>
                                </div>
                                <p className="text-xs text-navy/40 text-center">Shipping and taxes calculated at checkout.</p>
                                <button className="btn-gradient w-full h-14 font-bold text-lg">
                                    Proceed to Checkout
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
