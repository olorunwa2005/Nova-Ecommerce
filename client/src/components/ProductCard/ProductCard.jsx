import React from 'react';
import { Star, ShoppingBag } from 'lucide-react';

const ProductCard = ({ product }) => {
    const discount = product.discountPrice
        ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
        : null;

    return (
        <div className="glass group hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full bg-white/10">
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-white/5">
                <img
                    src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/800'}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {discount && (
                        <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                            -{discount}%
                        </span>
                    )}
                    {product.isFeatured && (
                        <span className="bg-diamond text-white text-[10px] font-bold px-2 py-1 rounded-full">
                            FEATURED
                        </span>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="absolute inset-0 bg-navy/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white text-navy px-6 py-2 rounded-full font-bold text-sm hover:bg-diamond hover:text-white transition-colors">
                        View Details
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 grow flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] text-diamond font-bold tracking-widest uppercase">{product.category}</span>
                    <div className="flex items-center text-xs text-navy/60">
                        <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
                        <span>{product.rating}</span>
                    </div>
                </div>

                <h3 className="font-bold text-navy text-lg mb-2 line-clamp-1 group-hover:text-diamond transition-colors">
                    {product.name}
                </h3>

                <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <span className="text-xl font-black text-navy">
                            ${product.discountPrice || product.price}
                        </span>
                        {product.discountPrice && (
                            <span className="text-sm text-navy/40 line-through">
                                ${product.price}
                            </span>
                        )}
                    </div>

                    <button className="p-2 bg-navy text-white rounded-full hover:bg-diamond transition-colors">
                        <ShoppingBag className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
