import React from 'react';
import { motion } from 'framer-motion';
import { Laptop, Tablet, Smartphone, Headphones, Watch, ShoppingBag, ArrowRight, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
    { name: 'Smartphones', slug: 'smartphones', icon: Smartphone, count: 12, color: 'text-blue-500' },
    { name: 'Laptops', slug: 'laptops', icon: Laptop, count: 8, color: 'text-diamond' },
    { name: 'Gaming Gear', slug: 'gaming', icon: Layers, count: 15, color: 'text-purple-500' },
    { name: 'Headphones', slug: 'headphones', icon: Headphones, count: 20, color: 'text-orange-500' },
    { name: 'Watches', slug: 'watches', icon: Watch, count: 6, color: 'text-green-500' },
    { name: 'Tablets', slug: 'tablets', icon: Tablet, count: 4, color: 'text-red-500' },
];

const Categories = () => {
    return (
        <div className="pt-32 pb-20 min-h-screen bg-gray-50/50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-6xl font-black text-navy tracking-tighter italic">Nova <span className="text-diamond">Taxonomy</span></h1>
                    <p className="text-navy/40 text-xl font-medium max-w-2xl mx-auto italic">Explore our specialized departments evolved for extreme performance.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((cat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass group p-10 bg-white/40 hover:bg-navy transition-all duration-500 cursor-pointer overflow-hidden relative"
                        >
                            <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-diamond/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

                            <div className={`w-16 h-16 bg-navy/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white/10 transition-colors ${cat.color}`}>
                                <cat.icon size={32} className="group-hover:text-white transition-colors" />
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl font-black text-navy group-hover:text-white transition-colors">{cat.name}</h3>
                                <p className="text-navy/30 group-hover:text-white/40 transition-colors font-bold uppercase tracking-widest text-xs">
                                    {cat.count} Elite Items Available
                                </p>
                                <Link
                                    to={`/shop?category=${cat.slug}`}
                                    className="flex items-center space-x-3 text-diamond font-black group-hover:text-white transition-all pt-4"
                                >
                                    <span>Browse Gear</span>
                                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-24 glass p-16 bg-navy text-white text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-diamond/10 blur-3xl" />
                    <h2 className="text-4xl font-black mb-6 italic">Not finding what you need?</h2>
                    <p className="text-white/40 text-lg mb-10 max-w-2xl mx-auto font-medium">Our neural assistant can find any item across our global marketplace network.</p>
                    <button className="btn-gradient px-12 h-16 font-black text-lg shadow-2xl shadow-diamond/20">Ask Nova Assistant</button>
                </div>
            </div>
        </div>
    );
};

export default Categories;
