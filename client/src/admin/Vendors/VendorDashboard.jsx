import React from 'react';
import { motion } from 'framer-motion';
import {
    Plus, LayoutDashboard, ShoppingBag,
    BarChart3, Settings, DollarSign, Package,
    ArrowUpRight, Users, Bell
} from 'lucide-react';

const VendorDashboard = () => {
    const stats = [
        { label: 'Total Sales', value: '$8,450.00', icon: DollarSign, color: 'text-green-500' },
        { label: 'Active Products', value: '12', icon: Package, color: 'text-diamond' },
        { label: 'Store Visitors', value: '1,120', icon: Users, color: 'text-purple-500' },
    ];

    return (
        <div className="pt-32 pb-20 min-h-screen bg-navy/2">
            <div className="container mx-auto px-4">
                {/* Vendor Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <div className="flex items-center space-x-3 mb-4">
                            <span className="bg-diamond/10 text-diamond text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">Vendor Partner</span>
                            <span className="text-navy/20 font-bold">|</span>
                            <span className="text-navy/40 font-bold italic">Member since Feb 2026</span>
                        </div>
                        <h1 className="text-5xl font-black text-navy tracking-tight">Store <span className="text-diamond">Dynamics</span></h1>
                    </div>
                    <div className="flex space-x-4">
                        <button className="h-14 px-8 bg-white border-2 border-navy/5 rounded-2xl font-bold hover:bg-navy/5 transition-all flex items-center space-x-3">
                            <Bell size={20} />
                            <span>Notifications</span>
                        </button>
                        <button className="btn-gradient h-14 px-8 font-black flex items-center space-x-3 shadow-lg shadow-diamond/20">
                            <Plus size={20} />
                            <span>Add New Product</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Menu */}
                    <aside className="lg:col-span-1 space-y-4">
                        <div className="glass p-6 bg-white/40 space-y-2">
                            <button className="w-full flex items-center space-x-4 p-4 rounded-xl bg-navy text-white font-bold shadow-lg shadow-navy/20">
                                <LayoutDashboard size={20} />
                                <span>Overview</span>
                            </button>
                            <button className="w-full flex items-center space-x-4 p-4 rounded-xl hover:bg-navy/5 text-navy/60 font-bold transition-all">
                                <ShoppingBag size={20} />
                                <span>My Inventory</span>
                            </button>
                            <button className="w-full flex items-center space-x-4 p-4 rounded-xl hover:bg-navy/5 text-navy/60 font-bold transition-all">
                                <BarChart3 size={20} />
                                <span>Sales Analytics</span>
                            </button>
                            <button className="w-full flex items-center space-x-4 p-4 rounded-xl hover:bg-navy/5 text-navy/60 font-bold transition-all">
                                <Settings size={20} />
                                <span>Store Settings</span>
                            </button>
                        </div>

                        <div className="glass p-8 bg-linear-to-br from-navy to-navy-light text-white overflow-hidden relative group">
                            <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-diamond/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                            <h4 className="text-sm font-bold opacity-60 uppercase mb-4 tracking-widest">Premium Vendor Plan</h4>
                            <p className="text-lg font-black mb-6">Upgrade to Nova Gold</p>
                            <button className="w-full py-3 bg-diamond text-white rounded-xl font-black text-sm hover:bg-white hover:text-navy transition-all">Go Gold Now</button>
                        </div>
                    </aside>

                    {/* Main Stats & Activity */}
                    <main className="lg:col-span-3 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="glass p-8 bg-white/40 border-b-4 border-b-transparent hover:border-b-diamond transition-all"
                                >
                                    <div className={`p-3 rounded-2xl bg-white shadow-sm inline-block mb-6 ${stat.color}`}>
                                        <stat.icon size={24} />
                                    </div>
                                    <p className="text-xs font-bold text-navy/40 uppercase tracking-widest mb-1">{stat.label}</p>
                                    <p className="text-2xl font-black text-navy">{stat.value}</p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Inventory Snapshot */}
                            <div className="glass p-10 bg-white/40">
                                <div className="flex justify-between items-center mb-10">
                                    <h3 className="text-xl font-black text-navy tracking-tight">Inventory Status</h3>
                                    <button className="text-xs font-bold text-diamond hover:underline">Manage All</button>
                                </div>
                                <div className="space-y-6">
                                    {[
                                        { name: 'Quantum X Laptop', stock: 12, sales: 45, price: '$1,899' },
                                        { name: 'Nova Pro Max', stock: 5, sales: 120, price: '$999' },
                                        { name: 'Sonic Air Pods', stock: 0, sales: 210, price: '$249' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-white/50 rounded-2xl border border-navy/5 group hover:border-diamond/20 transition-all">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 bg-navy/5 rounded-xl flex items-center justify-center font-black text-navy/20">NV</div>
                                                <div>
                                                    <h4 className="font-bold text-navy text-sm">{item.name}</h4>
                                                    <p className={`text-[10px] font-black uppercase tracking-widest ${item.stock === 0 ? 'text-red-500' : 'text-green-500'}`}>
                                                        {item.stock === 0 ? 'Out of Stock' : `${item.stock} in stock`}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className="font-black text-navy">{item.price}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Performance Chart Placeholder */}
                            <div className="glass p-10 bg-navy text-white flex flex-col justify-center items-center text-center overflow-hidden">
                                <div className="absolute inset-0 bg-diamond/5 blur-3xl" />
                                <BarChart3 size={64} className="text-diamond mb-6 opacity-40 animate-pulse" />
                                <h3 className="text-xl font-black mb-3">Sales Performance</h3>
                                <p className="text-sm opacity-50 max-w-xs mx-auto mb-8">Detailed tracking for your store's exponential growth.</p>
                                <button className="h-12 px-8 bg-white/10 rounded-full font-bold hover:bg-white/20 transition-all">View Full Metrics</button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default VendorDashboard;
