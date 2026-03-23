import React, { useState, useEffect, useMemo } from 'react';
import { products as mockProducts, categories } from '../../utils/mockData';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Filter, Search, ListFilter, SlidersHorizontal } from 'lucide-react';
import api from '../../utils/api';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [priceRange, setPriceRange] = useState(2000);
    const [sortBy, setSortBy] = useState('featured');

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const data = await api.get('/products');
                setProducts(data);
            } catch (error) {
                console.error('Failed to fetch products for shop:', error);
                setProducts(mockProducts);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = useMemo(() => {
        if (!products) return [];
        return products.filter(product => {
            const matchesCategory = activeCategory === 'All' ||
                product.category === activeCategory ||
                product.category_name === activeCategory;
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesPrice = (product.discountPrice || product.discount_price || product.price) <= priceRange;
            return matchesCategory && matchesSearch && matchesPrice;
        }).sort((a, b) => {
            const priceA = a.discountPrice || a.discount_price || a.price;
            const priceB = b.discountPrice || b.discount_price || b.price;
            if (sortBy === 'price-low') return priceA - priceB;
            if (sortBy === 'price-high') return priceB - priceA;
            if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
            return 0;
        });
    }, [products, activeCategory, searchQuery, priceRange, sortBy]);

    return (
        <div className="pt-32 pb-20 bg-gray-50/50 min-h-screen">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="mb-12">
                    <h1 className="text-5xl font-black text-navy mb-4 tracking-tight">Nova Marketplace</h1>
                    <p className="text-navy/50 text-lg max-w-2xl leading-relaxed">
                        Discover cutting-edge technology and premium lifestyle essentials.
                        Filtered by quality, delivered with speed.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Sidebar Filters */}
                    <aside className="lg:w-1/4 space-y-8">
                        <div className="glass p-8 bg-white/40">
                            <h3 className="font-bold text-xl mb-6 flex items-center text-navy">
                                <Filter className="w-5 h-5 mr-3 text-diamond" />
                                Categories
                            </h3>
                            <div className="space-y-2">
                                <button
                                    onClick={() => setActiveCategory('All')}
                                    className={`block w-full text-left px-5 py-3 rounded-xl transition-all duration-300 font-medium ${activeCategory === 'All' ? 'bg-navy text-white shadow-lg' : 'hover:bg-navy/5 text-navy/70'}`}
                                >
                                    All Collections
                                </button>
                                {categories.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setActiveCategory(cat.name)}
                                        className={`block w-full text-left px-5 py-3 rounded-xl transition-all duration-300 font-medium ${activeCategory === cat.name ? 'bg-navy text-white shadow-lg' : 'hover:bg-navy/5 text-navy/70'}`}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="glass p-8 bg-white/40">
                            <h3 className="font-bold text-xl mb-6 flex items-center text-navy">
                                <ListFilter className="w-5 h-5 mr-3 text-diamond" />
                                Price Limit
                            </h3>
                            <div className="px-2">
                                <input
                                    type="range"
                                    min="0"
                                    max="2000"
                                    step="100"
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                                    className="w-full h-1.5 bg-navy/10 rounded-lg appearance-none cursor-pointer accent-diamond mb-6"
                                />
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-navy/40">$0</span>
                                    <div className="bg-diamond/10 px-3 py-1 rounded-full">
                                        <span className="text-sm font-black text-diamond">Up to ${priceRange}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Product Area */}
                    <main className="lg:w-3/4">
                        {/* Control Bar */}
                        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                            <div className="relative w-full md:max-w-md group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy/20 group-focus-within:text-diamond transition-colors" />
                                <input
                                    type="text"
                                    placeholder="What are you looking for?"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-6 py-4 bg-white border border-navy/5 rounded-2xl focus:outline-none focus:ring-4 focus:ring-diamond/10 text-navy font-medium placeholder-navy/30 transition-all"
                                />
                            </div>

                            <div className="flex items-center space-x-6 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                                <div className="flex items-center space-x-3 whitespace-nowrap">
                                    <SlidersHorizontal size={18} className="text-navy/40" />
                                    <span className="text-sm font-bold text-navy/40 uppercase tracking-widest">Sort By</span>
                                </div>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="bg-white border border-navy/5 rounded-xl px-6 py-4 text-sm font-bold text-navy focus:outline-none focus:ring-4 focus:ring-diamond/10 cursor-pointer transition-all min-w-[180px]"
                                >
                                    <option value="featured">Best Matches</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">Highest Rated</option>
                                </select>
                            </div>
                        </div>

                        {/* Product Result Grid */}
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="aspect-square bg-navy/5 animate-pulse rounded-3xl" />
                                ))}
                            </div>
                        ) : filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                {filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="glass p-32 text-center bg-white/20">
                                <div className="bg-navy/5 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                                    <Search size={40} className="text-navy/20" />
                                </div>
                                <h3 className="text-3xl font-black text-navy mb-3">No Results Found</h3>
                                <p className="text-navy/40 text-lg max-w-sm mx-auto">
                                    We couldn't find anything matching "{searchQuery}". Try different filters or terms.
                                </p>
                                <button
                                    onClick={() => { setActiveCategory('All'); setSearchQuery(''); setPriceRange(2000); }}
                                    className="mt-8 text-diamond font-bold hover:underline"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Shop;
