import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import useStore from '../../store/useStore';
import { Link } from 'react-router-dom';

const Wishlist = () => {
    const { wishlist, removeFromWishlist, addToCart } = useStore();

    if (wishlist.length === 0) {
        return (
            <div className="pt-32 pb-20 min-h-screen flex flex-col items-center justify-center text-center px-4">
                <div className="w-24 h-24 bg-navy/5 rounded-full flex items-center justify-center mb-6">
                    <Heart size={48} className="text-navy/20" />
                </div>
                <h1 className="text-4xl font-black text-navy mb-4 italic">No gear saved yet.</h1>
                <p className="text-navy/40 text-lg mb-10 max-w-md mx-auto">Explore our collection and save items for your future elite loadout.</p>
                <Link to="/shop" className="btn-gradient px-12 h-16 font-black text-lg flex items-center space-x-3">
                    <span>Explore Products</span>
                    <ArrowRight size={20} />
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 min-h-screen bg-gray-50/50">
            <div className="container mx-auto px-6">
                <h1 className="text-5xl font-black text-navy mb-12 tracking-tighter">Your <span className="text-diamond italic">Wishlist</span></h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {wishlist.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass group bg-white/40 overflow-hidden"
                        >
                            <div className="relative aspect-square overflow-hidden bg-navy/5">
                                <img src={item.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <button
                                    onClick={() => removeFromWishlist(item.id)}
                                    className="absolute top-4 right-4 p-3 bg-white/80 backdrop-blur-md rounded-full text-red-500 shadow-xl hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <h3 className="font-bold text-navy truncate">{item.name}</h3>
                                    <p className="text-diamond font-black mt-1">${item.discountPrice || item.price}</p>
                                </div>
                                <div className="pt-4 border-t border-navy/5">
                                    <button
                                        onClick={() => addToCart(item)}
                                        className="w-full flex items-center justify-center space-x-2 h-12 bg-navy text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-diamond transition-all"
                                    >
                                        <ShoppingBag size={18} />
                                        <span>Add to bundle</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
