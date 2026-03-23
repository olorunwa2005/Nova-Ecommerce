import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, User, Menu, X, Heart, Mic } from 'lucide-react';
import useStore from '../../store/useStore';
import VoiceSearch from '../VoiceSearch/VoiceSearch';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isVoiceSearchOpen, setIsVoiceSearchOpen] = useState(false);
    const { cart, toggleCart } = useStore();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-2 bg-white/80 backdrop-blur-xl shadow-lg border-b border-navy/5' : 'py-6 bg-transparent'}`}>
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center group-hover:bg-diamond transition-colors duration-500 shadow-lg shadow-navy/20 group-hover:shadow-diamond/20">
                            <span className="text-white font-black text-xl">N</span>
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-navy">NOVA</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-10">
                        {['Shop', 'Categories', 'Vendors'].map((item) => (
                            <Link
                                key={item}
                                to={`/${item.toLowerCase()}`}
                                className="text-xs font-black text-navy/60 hover:text-diamond uppercase tracking-[0.2em] transition-all relative group"
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-diamond group-hover:w-full transition-all duration-300"></span>
                            </Link>
                        ))}
                    </nav>

                    {/* Search Bar */}
                    <div className="hidden md:flex grow max-w-md mx-8 relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/20 group-focus-within:text-diamond transition-colors">
                            <Search size={18} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search premium gear..."
                            className="w-full h-12 pl-12 pr-12 bg-navy/5 rounded-2xl border-none outline-none focus:ring-4 focus:ring-diamond/10 text-sm font-bold text-navy placeholder-navy/20 transition-all"
                        />
                        <button
                            onClick={() => setIsVoiceSearchOpen(true)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-navy/20 hover:text-diamond transition-colors"
                        >
                            <Mic size={18} />
                        </button>
                    </div>

                    {/* User Icons & Cart */}
                    <div className="flex items-center space-x-6">
                        <button className="hidden sm:block text-navy/40 hover:text-red-500 transition-colors relative group">
                            <Heart size={24} />
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>

                        <button
                            onClick={toggleCart}
                            className="relative group p-2 bg-navy/5 rounded-xl hover:bg-navy hover:text-white transition-all"
                        >
                            <ShoppingCart size={24} className="text-navy group-hover:text-white transition-colors" />
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-diamond text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                                {cart.length}
                            </span>
                        </button>

                        <Link
                            to="/login"
                            className="hidden md:flex items-center space-x-3 px-5 py-3 bg-navy text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-diamond transition-all shadow-xl shadow-navy/20 hover:shadow-diamond/20"
                        >
                            <User size={18} />
                            <span>Login</span>
                        </Link>

                        <button
                            className="lg:hidden p-2 text-navy"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 p-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="glass p-8 space-y-6 shadow-2xl bg-white/95">
                        <nav className="flex flex-col space-y-4">
                            {['Shop', 'Categories', 'Vendors'].map((item) => (
                                <Link
                                    key={item}
                                    to={`/${item.toLowerCase()}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-black text-navy hover:text-diamond transition-colors"
                                >
                                    {item}
                                </Link>
                            ))}
                        </nav>
                        <div className="pt-6 border-t border-navy/5">
                            <Link
                                to="/login"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full flex items-center justify-center space-x-3 h-14 bg-navy text-white rounded-2xl font-black text-sm uppercase tracking-widest"
                            >
                                <User size={20} />
                                <span>My Account</span>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Voice Search Overlay */}
            <VoiceSearch isOpen={isVoiceSearchOpen} onClose={() => setIsVoiceSearchOpen(false)} />
        </header>
    );
};

export default Navbar;
