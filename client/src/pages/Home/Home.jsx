import React, { useState, useEffect } from 'react';
import Hero from '../../components/Hero/Hero';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import { products as mockProducts } from '../../utils/mockData';
import { Truck, ShieldCheck, Headphones, RotateCcw } from 'lucide-react';
import api from '../../utils/api';

const Home = () => {
    const [products, setProducts] = useState(mockProducts);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await api.get('/products');
                if (data && data.length > 0) {
                    setProducts(data);
                }
            } catch (error) {
                console.warn('Backend not available, using mock data:', error);
                // Keep mock products if API fails
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const featuredProducts = products.filter(p => p.is_featured).slice(0, 4);
    const trendingProducts = products.slice(5, 13);

    return (
        <div className="pt-0 overflow-hidden">
            {/* Hero Section */}
            <Hero />

            {/* Featured Grid */}
            <div className="py-20">
                <ProductGrid
                    title="Featured Gear"
                    subtitle="Elite Selection"
                    products={featuredProducts}
                    loading={loading}
                />
            </div>

            {/* Banner Section */}
            <section className="py-24 relative overflow-hidden bg-navy">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-diamond/10 blur-[120px]" />
                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <h2 className="text-5xl font-black text-white leading-tight tracking-tight">
                            Limitless <br /> <span className="text-diamond">Connectivity.</span>
                        </h2>
                        <p className="text-white/40 text-lg leading-relaxed">
                            The Quantum X series redefine integration. Fast, secure, and built for the most demanding digital environments.
                        </p>
                        <button className="text-diamond font-black flex items-center space-x-3 hover:space-x-5 transition-all">
                            <span>Learn more about Neural Engine</span>
                            <span>→</span>
                        </button>
                    </div>
                    <div className="relative">
                        <div className="glass aspect-video bg-white/5 p-4 transform rotate-3 hover:rotate-0 transition-transform duration-700">
                            <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071" alt="Tech Banner" className="w-full h-full object-cover rounded-xl" />
                        </div>
                        <div className="absolute -bottom-8 -left-8 glass p-6 bg-white shadow-2xl hidden md:block">
                            <p className="text-navy font-black text-2xl tracking-tighter">4.9/5</p>
                            <p className="text-navy/30 text-[10px] font-black uppercase tracking-widest">Global Review Average</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trending Grid */}
            <div className="py-20">
                <ProductGrid
                    title="Trending Now"
                    subtitle="Community Favorites"
                    products={trendingProducts}
                    loading={loading}
                />
            </div>

            {/* Benefits Section */}
            <section className="py-24 border-t border-navy/5">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            { title: 'Fast Delivery', desc: 'Premium shipping methods', icon: Truck },
                            { title: 'Secure Vault', desc: 'Secure payment protocol', icon: ShieldCheck },
                            { title: 'Global Support', desc: '24/7 technical assistance', icon: Headphones },
                            { title: 'Elite Returns', desc: 'Hassle-free elite priority', icon: RotateCcw },
                        ].map((benefit, i) => (
                            <div key={i} className="group">
                                <div className="w-16 h-16 bg-navy/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-diamond group-hover:scale-110 transition-all duration-500 shadow-sm">
                                    <benefit.icon className="text-navy group-hover:text-white transition-colors" size={28} />
                                </div>
                                <h4 className="text-xl font-black text-navy mb-2 tracking-tight">{benefit.title}</h4>
                                <p className="text-navy/40 text-sm font-medium leading-relaxed italic">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-32 relative overflow-hidden bg-navy shadow-2xl">
                <div className="absolute inset-0 bg-diamond/5 -z-10" />
                <div className="container mx-auto px-6 text-center">
                    <div className="max-w-4xl mx-auto space-y-10">
                        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">THE <span className="text-diamond italic">ELITE</span> LIST.</h2>
                        <p className="text-white/40 text-xl font-medium max-w-2xl mx-auto italic">
                            Join the inner circle. Be the first to acquire the gear that defines the next decade.
                        </p>
                        <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="name@domain.tech"
                                className="grow px-10 py-6 bg-white/5 border border-white/10 rounded-full outline-none focus:ring-4 focus:ring-diamond/20 text-white font-bold text-lg placeholder-white/20 transition-all text-center md:text-left"
                            />
                            <button className="btn-gradient px-12 py-6 font-black text-lg shadow-2xl shadow-diamond/20 hover:scale-105 transition-transform">JOIN NOW</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

