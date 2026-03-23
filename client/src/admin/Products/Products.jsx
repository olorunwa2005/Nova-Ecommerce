import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Edit, Trash2, ExternalLink, Package } from 'lucide-react';
import { products } from '../../utils/mockData';

const ProductManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="p-10 space-y-10">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-navy tracking-tight">Product <span className="text-diamond">Catalog</span></h1>
                    <p className="text-navy/40 font-medium italic mt-2">Manage all inventory items and categories</p>
                </div>
                <button className="btn-gradient h-14 px-8 font-black flex items-center space-x-3 shadow-lg shadow-diamond/20">
                    <Plus size={20} />
                    <span>Add New Product</span>
                </button>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="relative w-full md:max-w-md group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy/20 group-focus-within:text-diamond transition-colors" />
                    <input
                        type="text"
                        placeholder="Search by name, SKU or brand..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-6 py-4 bg-white/40 border border-navy/5 rounded-2xl focus:outline-none focus:ring-4 focus:ring-diamond/10 text-navy font-medium transition-all"
                    />
                </div>
                <div className="flex items-center space-x-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    <button className="bg-white px-6 py-4 rounded-xl border border-navy/5 text-sm font-bold text-navy hover:bg-navy/5 transition-all flex items-center space-x-2">
                        <Filter size={18} />
                        <span>Filters</span>
                    </button>
                    <select className="bg-white px-6 py-4 rounded-xl border border-navy/5 text-sm font-bold text-navy outline-none focus:ring-4 focus:ring-diamond/10 cursor-pointer">
                        <option>All Categories</option>
                        <option>Electronics</option>
                        <option>Fashion</option>
                        <option>Sneakers</option>
                    </select>
                </div>
            </div>

            {/* Product Table */}
            <div className="glass overflow-hidden bg-white/40">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-navy/5">
                                <th className="px-8 py-6 text-xs font-black text-navy/30 uppercase tracking-[0.2em] w-[40%]">Product</th>
                                <th className="px-8 py-6 text-xs font-black text-navy/30 uppercase tracking-[0.2em]">Inventory</th>
                                <th className="px-8 py-6 text-xs font-black text-navy/30 uppercase tracking-[0.2em]">Price</th>
                                <th className="px-8 py-6 text-xs font-black text-navy/30 uppercase tracking-[0.2em]">Status</th>
                                <th className="px-8 py-6 text-xs font-black text-navy/30 uppercase tracking-[0.2em] text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-navy/5">
                            {products.slice(0, 8).map((product, i) => (
                                <motion.tr
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="hover:bg-white/60 transition-colors group"
                                >
                                    <td className="px-8 py-6">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-14 h-14 rounded-xl bg-navy/5 overflow-hidden shadow-sm">
                                                <img src={product.images[0]} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-navy text-sm leading-tight">{product.name}</h4>
                                                <p className="text-[10px] text-diamond font-black uppercase tracking-widest mt-1">{product.category}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center space-x-3">
                                            <Package size={16} className="text-navy/30" />
                                            <span className="font-black text-navy text-sm">{product.stock} Units</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 font-black text-navy text-sm">
                                        ${product.discountPrice || product.price}
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest ${product.stock > 10 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                            {product.stock > 10 ? 'Active' : 'Low Stock'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center justify-center space-x-2">
                                            <button className="p-3 bg-white shadow-sm rounded-xl text-navy/40 hover:text-diamond transition-colors"><Edit size={16} /></button>
                                            <button className="p-3 bg-white shadow-sm rounded-xl text-navy/40 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                            <button className="p-3 bg-white shadow-sm rounded-xl text-navy/40 hover:text-navy transition-colors"><ExternalLink size={16} /></button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-8 border-t border-navy/5 flex justify-between items-center bg-gray-50/30">
                    <span className="text-xs font-bold text-navy/30 uppercase tracking-widest">Showing 8 of 42 Products</span>
                    <div className="flex space-x-3">
                        <button className="w-10 h-10 border border-navy/10 rounded-xl flex items-center justify-center font-bold text-navy/40 hover:bg-navy hover:text-white transition-all">1</button>
                        <button className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-navy/40 hover:bg-navy/5 transition-all text-xs">2</button>
                        <button className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-navy/40 hover:bg-navy/5 transition-all text-xs">3</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductManagement;
