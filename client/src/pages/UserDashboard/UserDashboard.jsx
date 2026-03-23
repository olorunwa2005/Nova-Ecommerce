import React from 'react';
import { motion } from 'framer-motion';
import { User, Package, Heart, Settings, LogOut, ChevronRight, CreditCard } from 'lucide-react';
import useStore from '../../store/useStore';

const UserDashboard = () => {
    const { user, logout } = useStore();

    const menuItems = [
        { title: 'My Orders', icon: Package, count: '12', color: 'text-diamond' },
        { title: 'Wishlist', icon: Heart, count: '5', color: 'text-red-500' },
        { title: 'Payment Methods', icon: CreditCard, count: '2', color: 'text-purple-500' },
        { title: 'Account Settings', icon: Settings, count: null, color: 'text-navy/40' },
    ];

    return (
        <div className="pt-32 pb-20 min-h-screen bg-gray-50/50">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar */}
                    <aside className="lg:w-1/3">
                        <div className="glass p-8 bg-white/40 sticky top-32">
                            <div className="flex flex-col items-center mb-10">
                                <div className="w-24 h-24 bg-diamond rounded-full flex items-center justify-center text-white mb-4 shadow-xl">
                                    <User size={48} />
                                </div>
                                <h2 className="text-2xl font-black text-navy">{user?.name || 'John Doe'}</h2>
                                <p className="text-navy/30 font-medium">Premium Member since 2026</p>
                            </div>

                            <div className="space-y-2">
                                {menuItems.map((item, i) => (
                                    <button
                                        key={i}
                                        className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-navy/5 transition-all group"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className={`p-2 rounded-xl bg-white shadow-sm ${item.color}`}>
                                                <item.icon size={20} />
                                            </div>
                                            <span className="font-bold text-navy group-hover:text-diamond transition-colors">{item.title}</span>
                                        </div>
                                        {item.count ? (
                                            <span className="bg-navy/5 px-3 py-1 rounded-full text-xs font-black text-navy/40">{item.count}</span>
                                        ) : (
                                            <ChevronRight size={18} className="text-navy/10" />
                                        )}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={logout}
                                className="w-full mt-10 h-14 rounded-2xl border-2 border-red-500/10 text-red-500 font-black flex items-center justify-center space-x-3 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                            >
                                <LogOut size={20} />
                                <span>Log Out</span>
                            </button>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="lg:w-2/3 space-y-8">
                        <div className="glass p-10 bg-white/40">
                            <h3 className="text-2xl font-black text-navy mb-8">Recent Orders</h3>
                            <div className="space-y-6">
                                {[
                                    { id: 'NV-2026-001', date: 'Oct 24, 2026', total: '$1,240.00', status: 'In Transit', color: 'bg-blue-500' },
                                    { id: 'NV-2026-002', date: 'Oct 15, 2026', total: '$89.00', status: 'Delivered', color: 'bg-green-500' },
                                    { id: 'NV-2026-003', date: 'Oct 02, 2026', total: '$450.00', status: 'Processing', color: 'bg-orange-500' },
                                ].map((order, i) => (
                                    <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white rounded-2xl border border-navy/5 hover:shadow-lg transition-all gap-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-navy/5 rounded-xl flex items-center justify-center text-navy/40">
                                                <Package size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-navy">{order.id}</h4>
                                                <p className="text-xs text-navy/30 font-bold uppercase tracking-widest">{order.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-8">
                                            <div className="text-left md:text-right">
                                                <p className="text-xs text-navy/40 font-bold uppercase mb-1">Total</p>
                                                <p className="font-black text-navy">{order.total}</p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <div className={`w-2 h-2 rounded-full ${order.color}`} />
                                                <span className="text-sm font-bold text-navy/60">{order.status}</span>
                                            </div>
                                            <button className="p-2 hover:bg-navy/5 rounded-full transition-colors">
                                                <ChevronRight size={20} className="text-navy/20" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="mt-8 text-diamond font-bold hover:underline">View All Order History</button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="glass p-10 bg-white/40">
                                <h3 className="text-xl font-black text-navy mb-6">Payment Methods</h3>
                                <div className="bg-navy rounded-2xl p-6 text-white h-40 flex flex-col justify-between shadow-xl relative overflow-hidden">
                                    <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-diamond/20 rounded-full blur-2xl" />
                                    <div className="flex justify-between items-start">
                                        <CreditCard size={32} className="text-diamond" />
                                        <span className="text-[10px] font-black opacity-30 tracking-[0.2em] uppercase italic">Nova Card</span>
                                    </div>
                                    <p className="font-mono tracking-widest text-lg">**** **** **** 4242</p>
                                    <p className="text-xs font-bold opacity-50 uppercase">Exp 12/28</p>
                                </div>
                            </div>

                            <div className="glass p-10 bg-white/40">
                                <h3 className="text-xl font-black text-navy mb-6">Nova Rewards</h3>
                                <div className="bg-linear-to-br from-diamond to-navy p-8 rounded-2xl text-white h-40 flex flex-col justify-between shadow-xl">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold uppercase tracking-widest opacity-60">Available Points</span>
                                        <Package size={20} className="opacity-40" />
                                    </div>
                                    <div>
                                        <p className="text-4xl font-black italic">4,250</p>
                                        <p className="text-xs font-bold opacity-60 mt-1">Value: $42.50 Credits</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
