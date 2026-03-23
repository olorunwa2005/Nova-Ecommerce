import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ShoppingBag, Plus } from 'lucide-react';
import { products as mockProducts } from '../../utils/mockData';
import useStore from '../../store/useStore';
import api from '../../utils/api';

const ProductComparison = () => {
    const [allProducts, setAllProducts] = useState(mockProducts);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useStore();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await api.get('/products');
                if (data && data.length > 0) {
                    setAllProducts(data);
                }
            } catch (error) {
                console.warn('Backend not available for comparison, using mock data');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleSelect = (product) => {
        if (selectedProducts.find(p => p.id === product.id)) {
            setSelectedProducts(selectedProducts.filter(p => p.id !== product.id));
        } else if (selectedProducts.length < 4) {
            setSelectedProducts([...selectedProducts, product]);
            setIsSelectorOpen(false);
        }
    };

    const attributes = [
        { label: 'Category', key: 'category' },
        { label: 'Brand', key: 'brand' },
        { label: 'Price', key: 'price', prefix: '$' },
        { label: 'Rating', key: 'rating', suffix: ' ★' },
        { label: 'Stock', key: 'stock' },
        { label: 'Features', key: 'features' },
    ];

    return (
        <div className="pt-32 pb-20 min-h-screen bg-gray-50/50">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h1 className="text-5xl font-black text-navy tracking-tighter">Compare <span className="text-diamond italic">Benchmarks</span></h1>
                        <p className="text-navy/40 text-lg font-medium italic mt-2">Side-by-side analysis of Nova's elite gear.</p>
                    </div>
                    <button
                        onClick={() => setIsSelectorOpen(true)}
                        className="btn-gradient px-8 h-14 font-black flex items-center space-x-3 shadow-xl shadow-diamond/20"
                        disabled={loading}
                    >
                        <Plus size={20} />
                        <span>{loading ? 'Loading Gear...' : 'Select Gear'}</span>
                    </button>
                </div>

                {selectedProducts.length === 0 ? (
                    <div className="glass p-20 text-center bg-white/40">
                        <h2 className="text-2xl font-black text-navy/20 uppercase tracking-widest italic mb-6">No products selected for comparison</h2>
                        <button
                            onClick={() => setIsSelectorOpen(true)}
                            className="px-10 py-4 bg-navy text-white rounded-2xl font-black hover:bg-diamond transition-all disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? 'Analyzing Neural Link...' : 'Start Selecting'}
                        </button>
                    </div>
                ) : (
                    <div className="glass overflow-x-auto bg-white/40 pb-10">
                        <table className="w-full min-w-[1000px]">
                            <thead>
                                <tr>
                                    <th className="w-1/5 pt-10 px-8 text-left sticky left-0 bg-white/60 backdrop-blur-md z-10 border-r border-navy/5">
                                        <span className="text-xs font-black text-navy/20 uppercase tracking-[0.4em]">Attributes</span>
                                    </th>
                                    {selectedProducts.map(product => (
                                        <th key={product.id} className="w-1/5 pt-10 px-8">
                                            <div className="relative group">
                                                <button
                                                    onClick={() => setSelectedProducts(selectedProducts.filter(p => p.id !== product.id))}
                                                    className="absolute -top-4 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                                                >
                                                    <X size={12} />
                                                </button>
                                                <div className="w-40 h-40 mx-auto rounded-3xl overflow-hidden bg-navy/5 mb-6 group-hover:scale-105 transition-transform duration-500 shadow-sm">
                                                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                                                </div>
                                                <h3 className="font-black text-navy text-sm leading-tight text-center">{product.name}</h3>
                                            </div>
                                        </th>
                                    ))}
                                    {[...Array(4 - selectedProducts.length)].map((_, i) => (
                                        <th key={i} className="w-1/5 pt-10 px-8">
                                            <div
                                                onClick={() => !loading && setIsSelectorOpen(true)}
                                                className="w-40 h-40 mx-auto rounded-3xl border-2 border-dashed border-navy/10 flex items-center justify-center cursor-pointer hover:bg-navy/5 hover:border-diamond/20 transition-all group"
                                            >
                                                <Plus size={32} className="text-navy/5 group-hover:text-diamond transition-colors" />
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-navy/5">
                                {attributes.map((attr, i) => (
                                    <tr key={i} className="hover:bg-white/40 transition-colors">
                                        <td className="px-8 py-8 font-black text-navy/40 text-xs uppercase tracking-widest sticky left-0 bg-white/60 backdrop-blur-md z-10 border-r border-navy/5">
                                            {attr.label}
                                        </td>
                                        {selectedProducts.map(product => (
                                            <td key={product.id} className="px-8 py-8 text-center font-bold text-navy italic">
                                                {attr.prefix || ''}{product[attr.key] || '---'}{attr.suffix || ''}
                                            </td>
                                        ))}
                                        {[...Array(4 - selectedProducts.length)].map((_, i) => (
                                            <td key={i} className="px-8 py-8" />
                                        ))}
                                    </tr>
                                ))}
                                <tr>
                                    <td className="px-8 py-10 sticky left-0 bg-white/60 backdrop-blur-md z-10 border-r border-navy/5" />
                                    {selectedProducts.map(product => (
                                        <td key={product.id} className="px-8 py-10">
                                            <button
                                                onClick={() => addToCart(product)}
                                                className="w-full flex items-center justify-center space-x-2 h-14 bg-navy text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-diamond transition-all shadow-xl shadow-navy/20 hover:shadow-diamond/20"
                                            >
                                                <ShoppingBag size={18} />
                                                <span>Buy Now</span>
                                            </button>
                                        </td>
                                    ))}
                                    {[...Array(4 - selectedProducts.length)].map((_, i) => (
                                        <td key={i} className="px-8 py-10 text-center">
                                            <p className="text-[10px] font-black text-navy/10 uppercase tracking-widest">Awaiting selection</p>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Selector Modal */}
            <AnimatePresence>
                {isSelectorOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-200 bg-navy/90 backdrop-blur-xl flex items-center justify-center p-6"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-white rounded-[40px] w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl"
                        >
                            <div className="p-10 border-b border-navy/5 flex justify-between items-center">
                                <h3 className="text-3xl font-black text-navy italic">Select Gear</h3>
                                <button onClick={() => setIsSelectorOpen(false)} className="p-3 hover:bg-navy/5 rounded-full transition-colors">
                                    <X size={32} className="text-navy" />
                                </button>
                            </div>
                            <div className="grow overflow-y-auto p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {allProducts.map(product => {
                                    const isSelected = selectedProducts.find(p => p.id === product.id);
                                    return (
                                        <div
                                            key={product.id}
                                            onClick={() => handleSelect(product)}
                                            className={`relative group cursor-pointer p-6 rounded-[32px] border-2 transition-all ${isSelected ? 'border-diamond bg-diamond/5' : 'border-navy/5 hover:border-diamond/20 bg-gray-50'}`}
                                        >
                                            <div className="aspect-square rounded-2xl overflow-hidden bg-white mb-4 shadow-sm">
                                                <img src={product.images?.[0] || 'https://via.placeholder.com/300'} alt={product.name} className="w-full h-full object-cover" />
                                            </div>
                                            <h4 className="font-bold text-navy truncate">{product.name}</h4>
                                            {isSelected && (
                                                <div className="absolute top-4 right-4 bg-diamond text-white p-2 rounded-full shadow-lg">
                                                    <Check size={16} />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProductComparison;

