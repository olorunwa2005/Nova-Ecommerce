import React from 'react';
import { motion } from 'framer-motion';
import {
    Users, ShoppingBag, DollarSign, TrendingUp,
    Package, CheckCircle, AlertCircle, Clock
} from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';

const data = [
    { name: 'Mon', revenue: 4000, orders: 24 },
    { name: 'Tue', revenue: 3000, orders: 18 },
    { name: 'Wed', revenue: 5000, orders: 35 },
    { name: 'Thu', revenue: 2780, orders: 20 },
    { name: 'Fri', revenue: 6890, orders: 48 },
    { name: 'Sat', revenue: 8390, orders: 62 },
    { name: 'Sun', revenue: 7490, orders: 55 },
];

const AdminDashboard = () => {
    const stats = [
        { label: 'Total Revenue', value: '$128,430', icon: DollarSign, trend: '+12.5%', color: 'text-green-500' },
        { label: 'Total Orders', value: '1,240', icon: ShoppingBag, trend: '+8.2%', color: 'text-diamond' },
        { label: 'New Customers', value: '432', icon: Users, trend: '+15.3%', color: 'text-purple-500' },
        { label: 'Active Vendors', value: '48', icon: TrendingUp, trend: '+2.4%', color: 'text-orange-500' },
    ];

    return (
        <div className="p-8 space-y-10">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-black text-navy mb-2">Admin Control</h1>
                    <p className="text-navy/40 font-medium italic">General overview of Nova E-Commerce performance</p>
                </div>
                <div className="flex space-x-4">
                    <button className="h-12 px-6 bg-navy text-white rounded-xl font-bold hover:bg-diamond transition-colors">Export Report</button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass p-8 bg-white/40 group hover:shadow-2xl transition-all"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-4 rounded-2xl bg-white shadow-sm ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <span className={`text-xs font-black px-2 py-1 rounded-full bg-navy/5 ${stat.color}`}>{stat.trend}</span>
                        </div>
                        <h3 className="text-navy/40 text-sm font-bold uppercase tracking-widest mb-1">{stat.label}</h3>
                        <p className="text-3xl font-black text-navy">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 glass p-10 bg-white/40 h-[500px] flex flex-col">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-xl font-black text-navy">Revenue Analytics</h3>
                        <select className="bg-navy/5 border-none rounded-lg px-4 py-2 text-sm font-bold text-navy outline-none">
                            <option>Last 7 Days</option>
                            <option>Last Month</option>
                        </select>
                    </div>
                    <div className="grow">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="glass p-10 bg-white/40 flex flex-col">
                    <h3 className="text-xl font-black text-navy mb-8">Recent Orders</h3>
                    <div className="space-y-6 overflow-y-auto pr-2">
                        {[
                            { id: '1024', user: 'Alex Rivera', status: 'delivered', amount: '$245', icon: CheckCircle },
                            { id: '1025', user: 'Sarah Chen', status: 'shipped', amount: '$890', icon: Truck },
                            { id: '1026', user: 'Marcus Wright', status: 'processing', amount: '$1,200', icon: Clock },
                            { id: '1027', user: 'Emma Stone', status: 'pending', amount: '$54', icon: AlertCircle },
                        ].map((order, i) => (
                            <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-navy/5 p-3 rounded-2xl transition-all">
                                <div className="flex items-center space-x-4">
                                    <div className={`p-3 rounded-xl ${order.status === 'delivered' ? 'bg-green-100 text-green-600' :
                                        order.status === 'shipped' ? 'bg-blue-100 text-blue-600' :
                                            order.status === 'processing' ? 'bg-orange-100 text-orange-600' : 'bg-red-100 text-red-600'
                                        }`}>
                                        {<order.icon size={18} />}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-navy text-sm">{order.user}</h4>
                                        <p className="text-[10px] text-navy/30 uppercase font-black">Order #{order.id}</p>
                                    </div>
                                </div>
                                <span className="font-black text-navy">{order.amount}</span>
                            </div>
                        ))}
                    </div>
                    <button className="mt-auto w-full py-4 border-t border-navy/5 text-diamond font-bold hover:underline">View All Orders</button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
