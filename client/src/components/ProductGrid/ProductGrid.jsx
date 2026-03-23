import React from 'react';
import ProductCard from '../ProductCard/ProductCard';

const ProductGrid = ({ products, title, subtitle, loading }) => {
    return (
        <section className="py-20 bg-white/50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4">
                    <div>
                        {subtitle && (
                            <span className="text-diamond font-bold tracking-widest text-sm uppercase mb-2 block">
                                {subtitle}
                            </span>
                        )}
                        <h2 className="text-4xl md:text-5xl font-black text-navy">{title}</h2>
                    </div>
                    <button className="text-navy font-bold flex items-center group hover:text-diamond transition-colors">
                        <span>View All Products</span>
                        <div className="ml-2 w-8 h-[2px] bg-navy group-hover:bg-diamond group-hover:w-12 transition-all duration-300" />
                    </button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {loading ? (
                        [...Array(4)].map((_, i) => (
                            <div key={i} className="aspect-square bg-navy/5 animate-pulse rounded-3xl" />
                        ))
                    ) : (
                        products && products.length > 0 ? (
                            products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center">
                                <p className="text-navy/20 font-black uppercase tracking-widest italic">No products detected in this node</p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;
