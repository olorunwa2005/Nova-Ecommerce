import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Github, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-navy text-white pt-20 pb-10 mt-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {/* Brand */}
                    <div className="space-y-6">
                        <Link to="/" className="text-3xl font-bold bg-linear-to-r from-diamond to-white bg-clip-text text-transparent">
                            NOVA
                        </Link>
                        <p className="text-navy-light text-sm leading-relaxed max-w-xs opacity-70">
                            The next generation of e-commerce. Premium products, AI-powered shopping, and a seamless vendor marketplace.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-diamond transition-colors"><Facebook size={18} /></a>
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-diamond transition-colors"><Twitter size={18} /></a>
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-diamond transition-colors"><Instagram size={18} /></a>
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-diamond transition-colors"><Github size={18} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-4 opacity-70">
                            <li><Link to="/shop" className="hover:text-diamond transition-colors">Shop All</Link></li>
                            <li><Link to="/categories" className="hover:text-diamond transition-colors">Categories</Link></li>
                            <li><Link to="/vendors" className="hover:text-diamond transition-colors">Vendor Marketplace</Link></li>
                            <li><Link to="/about" className="hover:text-diamond transition-colors">About Us</Link></li>
                        </ul>
                    </div>

                    {/* Customer Support */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Support</h4>
                        <ul className="space-y-4 opacity-70">
                            <li><Link to="/track-order" className="hover:text-diamond transition-colors">Track Your Order</Link></li>
                            <li><Link to="/returns" className="hover:text-diamond transition-colors">Returns & Exchanges</Link></li>
                            <li><Link to="/shipping" className="hover:text-diamond transition-colors">Shipping Info</Link></li>
                            <li><Link to="/faq" className="hover:text-diamond transition-colors">FAQs</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold mb-6">Connect</h4>
                        <div className="flex items-center space-x-3 opacity-70">
                            <Mail size={18} className="text-diamond" />
                            <span>support@nova.com</span>
                        </div>
                        <div className="flex items-center space-x-3 opacity-70">
                            <Phone size={18} className="text-diamond" />
                            <span>+1 (555) 123-4567</span>
                        </div>
                        <div className="flex items-center space-x-3 opacity-70">
                            <MapPin size={18} className="text-diamond" />
                            <span>123 Tech Avenue, Silicon Valley, CA</span>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center opacity-50 text-xs">
                    <p>© 2026 Nova E-Commerce Platform. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
