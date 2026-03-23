import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products as mockProducts } from '../../utils/mockData';
import useStore from '../../store/useStore';
import RatingStars from '../../components/RatingStars/RatingStars';
import { ShoppingBag, Heart, ShieldCheck, Truck, RotateCcw, Share2, Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../utils/api';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, toggleWishlist, wishlist } = useStore();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const data = await api.get(`/products/${id}`);
                setProduct(data);
            } catch (error) {
                console.error('Failed to fetch product details:', error);
                const fallback = mockProducts.find(p => p.id === id || p.id === parseInt(id));
                setProduct(fallback);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="pt-40 flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 border-4 border-diamond border-t-transparent rounded-full animate-spin"></div>
                <p className="text-navy/40 font-bold uppercase tracking-widest">Loading Premium Gear...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="pt-40 text-center">
                <h2 className="text-3xl font-black text-navy mb-4">Product Not Found</h2>
                <button onClick={() => navigate('/shop')} className="btn-gradient">Back to Shop</button>
            </div>
        );
    }

    const isInWishlist = wishlist.some(item => item.id === product.id);

    return (
        <div className="pt-32 pb-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Image Gallery */}
                    <div className="lg:w-1/2 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass aspect-square overflow-hidden bg-white/10"
                        >
                            <img
                                src={product.images[activeImage]}
                                alt={product.name}
                                className="w-full h-full object-cover transition-all duration-700"
                            />
                        </motion.div>

                        <div className="grid grid-cols-4 gap-4">
                            {product.images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImage(i)}
                                    className={`glass aspect-square overflow-hidden border-2 transition-all ${activeImage === i ? 'border-diamond scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="lg:w-1/2 flex flex-col">
                        <div className="mb-8">
                            <span className="text-diamond font-black tracking-widest text-sm uppercase mb-3 block">
                                {product.category}
                            </span>
                            <h1 className="text-5xl font-black text-navy mb-6 leading-tight">{product.name}</h1>

                            <div className="flex items-center space-x-6 mb-8">
                                <RatingStars rating={product.rating} size={20} />
                                <span className="text-navy/30">|</span>
                                <span className="text-navy/60 font-medium">120+ Reviews</span>
                                <span className="text-green-500 font-bold bg-green-50 px-3 py-1 rounded-full text-xs">
                                    In Stock ({product.stock})
                                </span>
                            </div>

                            <div className="flex items-baseline space-x-4 mb-10">
                                <span className="text-5xl font-black text-navy">
                                    ${product.discountPrice || product.price}
                                </span>
                                {product.discountPrice && (
                                    <span className="text-2xl text-navy/30 line-through">
                                        ${product.price}
                                    </span>
                                )}
                            </div>

                            <p className="text-xl text-navy/60 leading-relaxed mb-10">
                                {product.description}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="space-y-8 mb-12">
                            <div className="flex items-center space-x-8">
                                <div className="flex items-center bg-navy/5 rounded-full p-2 h-14 w-36 justify-between">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-full transition-colors font-bold"
                                    >
                                        <Minus size={18} />
                                    </button>
                                    <span className="font-black text-xl w-8 text-center">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-full transition-colors font-bold"
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>

                                <button
                                    onClick={() => addToCart({ ...product, quantity })}
                                    className="btn-gradient grow h-14 text-lg font-black flex items-center justify-center space-x-3"
                                >
                                    <ShoppingBag size={22} />
                                    <span>Add to Shopping Bag</span>
                                </button>

                                <button
                                    onClick={() => toggleWishlist(product)}
                                    className={`w-14 h-14 border rounded-full flex items-center justify-center transition-all ${isInWishlist ? 'bg-red-500 border-red-500 text-white' : 'border-navy/10 hover:border-red-500 hover:text-red-500'}`}
                                >
                                    <Heart size={24} fill={isInWishlist ? 'currentColor' : 'none'} />
                                </button>
                            </div>

                            <button className="w-full h-14 border-2 border-navy text-navy font-black rounded-full hover:bg-navy hover:text-white transition-all text-lg">
                                Buy It Now
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-navy/5">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-diamond/10 rounded-xl flex items-center justify-center text-diamond">
                                    <Truck size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-navy">Free Delivery</h4>
                                    <p className="text-xs text-navy/40">Orders over $150</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-diamond/10 rounded-xl flex items-center justify-center text-diamond">
                                    <RotateCcw size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-navy">Easy Returns</h4>
                                    <p className="text-xs text-navy/40">30-day money back</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-diamond/10 rounded-xl flex items-center justify-center text-diamond">
                                    <ShieldCheck size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-navy">Secure Checkout</h4>
                                    <p className="text-xs text-navy/40">100% data protection</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Details Tabs (Simplified for now) */}
                <div className="mt-24">
                    <div className="border-b border-navy/5 mb-10 flex space-x-12">
                        <button className="pb-4 border-b-2 border-diamond text-navy font-black">Description</button>
                        <button className="pb-4 text-navy/30 font-bold hover:text-navy transition-colors">Specifications</button>
                        <button className="pb-4 text-navy/30 font-bold hover:text-navy transition-colors">Reviews (120)</button>
                    </div>
                    <div className="max-w-4xl text-navy/60 leading-loose text-lg">
                        <p className="mb-6">
                            Redefine your lifestyle with the {product.name}. Designed for visionaries, this product combines cutting-edge engineering with an aesthetic that demands attention. Every detail has been meticulously crafted to provide a seamless experience that feels as good as it looks.
                        </p>
                        <ul className="list-disc pl-6 space-y-3">
                            <li>Professional-grade performance and reliability</li>
                            <li>Sleek, ergonomic design for maximum comfort</li>
                            <li>Environmentally sustainable premium materials</li>
                            <li>Exclusive Nova firmware for smart integration</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
