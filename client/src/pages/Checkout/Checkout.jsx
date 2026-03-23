import React, { useState } from 'react';
import useStore from '../../store/useStore';
import { ShieldCheck, Truck, CreditCard, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Checkout = () => {
    const { cart } = useStore();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        zipCode: '',
        cardNumber: '',
        expiry: '',
        cvc: ''
    });

    const subtotal = cart.reduce((acc, item) => acc + (item.discountPrice || item.price) * item.quantity, 0);
    const shipping = subtotal > 150 ? 0 : 25;
    const total = subtotal + shipping;

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="pt-32 pb-20">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Main Checkout Flow */}
                    <div className="lg:w-2/3">
                        <div className="flex items-center space-x-4 mb-10 overflow-x-auto pb-4">
                            <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-diamond' : 'text-navy/20'}`}>
                                <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${step >= 1 ? 'border-diamond bg-diamond/5' : 'border-navy/10'}`}>1</span>
                                <span className="font-bold whitespace-nowrap">Shipping</span>
                            </div>
                            <ChevronRight className="text-navy/10" size={16} />
                            <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-diamond' : 'text-navy/20'}`}>
                                <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${step >= 2 ? 'border-diamond bg-diamond/5' : 'border-navy/10'}`}>2</span>
                                <span className="font-bold whitespace-nowrap">Payment</span>
                            </div>
                            <ChevronRight className="text-navy/10" size={16} />
                            <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-diamond' : 'text-navy/20'}`}>
                                <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${step >= 3 ? 'border-diamond bg-diamond/5' : 'border-navy/10'}`}>3</span>
                                <span className="font-bold whitespace-nowrap">Review</span>
                            </div>
                        </div>

                        {step === 1 && (
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                                <h2 className="text-3xl font-black text-navy mb-8">Shipping Information</h2>
                                <div className="glass p-8 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-navy/60 uppercase">First Name</label>
                                            <input name="firstName" onChange={handleInputChange} className="w-full px-5 py-4 bg-navy/5 rounded-xl focus:ring-2 focus:ring-diamond/30 outline-none" placeholder="John" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-navy/60 uppercase">Last Name</label>
                                            <input name="lastName" onChange={handleInputChange} className="w-full px-5 py-4 bg-navy/5 rounded-xl focus:ring-2 focus:ring-diamond/30 outline-none" placeholder="Doe" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-navy/60 uppercase">Email Address</label>
                                        <input name="email" onChange={handleInputChange} className="w-full px-5 py-4 bg-navy/5 rounded-xl focus:ring-2 focus:ring-diamond/30 outline-none" placeholder="john@example.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-navy/60 uppercase">Shipping Address</label>
                                        <input name="address" onChange={handleInputChange} className="w-full px-5 py-4 bg-navy/5 rounded-xl focus:ring-2 focus:ring-diamond/30 outline-none" placeholder="123 Tech Avenue" />
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                        <div className="col-span-2 space-y-2">
                                            <label className="text-sm font-bold text-navy/60 uppercase">City</label>
                                            <input name="city" onChange={handleInputChange} className="w-full px-5 py-4 bg-navy/5 rounded-xl focus:ring-2 focus:ring-diamond/30 outline-none" placeholder="Silicon Valley" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-navy/60 uppercase">Zip Code</label>
                                            <input name="zipCode" onChange={handleInputChange} className="w-full px-5 py-4 bg-navy/5 rounded-xl focus:ring-2 focus:ring-diamond/30 outline-none" placeholder="94025" />
                                        </div>
                                    </div>
                                    <button onClick={() => setStep(2)} className="btn-gradient w-full h-14 font-black">Continue to Payment</button>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                                <h2 className="text-3xl font-black text-navy mb-8">Payment Securely</h2>
                                <div className="glass p-8 space-y-6">
                                    <div className="bg-navy rounded-2xl p-8 text-white relative overflow-hidden mb-8 h-56 flex flex-col justify-between shadow-2xl">
                                        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-diamond/20 rounded-full blur-3xl" />
                                        <div className="flex justify-between items-start">
                                            <CreditCard size={40} className="text-diamond" />
                                            <span className="font-bold opacity-50">NOVA SECURE</span>
                                        </div>
                                        <div className="text-2xl font-mono tracking-widest">
                                            {formData.cardNumber || '**** **** **** ****'}
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="text-[10px] opacity-40 uppercase">Card Holder</p>
                                                <p className="font-bold">{formData.firstName ? `${formData.firstName} ${formData.lastName}` : 'YOUR NAME'}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] opacity-40 uppercase">Expires</p>
                                                <p className="font-bold tracking-widest">{formData.expiry || 'MM/YY'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-navy/60 uppercase">Card Number</label>
                                        <input name="cardNumber" onChange={handleInputChange} className="w-full px-5 py-4 bg-navy/5 rounded-xl outline-none focus:ring-2 focus:ring-diamond/30" placeholder="0000 0000 0000 0000" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-navy/60 uppercase">Expiry Date</label>
                                            <input name="expiry" onChange={handleInputChange} className="w-full px-5 py-4 bg-navy/5 rounded-xl outline-none focus:ring-2 focus:ring-diamond/30" placeholder="MM/YY" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-navy/60 uppercase">CVC</label>
                                            <input name="cvc" onChange={handleInputChange} className="w-full px-5 py-4 bg-navy/5 rounded-xl outline-none focus:ring-2 focus:ring-diamond/30" placeholder="123" />
                                        </div>
                                    </div>
                                    <div className="flex space-x-4">
                                        <button onClick={() => setStep(1)} className="w-1/3 h-14 border-2 border-navy text-navy font-bold rounded-xl hover:bg-navy hover:text-white transition-all">Back</button>
                                        <button onClick={() => setStep(3)} className="btn-gradient grow h-14 font-black text-lg">Validate Payment</button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-500/30">
                                    <ShieldCheck size={48} className="text-white" />
                                </div>
                                <h2 className="text-4xl font-black text-navy mb-4">Order Confirmed!</h2>
                                <p className="text-navy/50 text-xl max-w-md mx-auto mb-10 leading-relaxed">
                                    Thank you for your purchase, {formData.firstName}. Your order has been placed and is being processed.
                                </p>
                                <button onClick={() => window.location.href = '/'} className="btn-gradient px-12 h-14 font-black">Back to Shopping</button>
                            </motion.div>
                        )}
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:w-1/3">
                        <div className="glass p-8 sticky top-32 space-y-8">
                            <h3 className="text-xl font-bold text-navy">Order Summary</h3>
                            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
                                {cart.map(item => (
                                    <div key={item.id} className="flex space-x-4">
                                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-navy/5 shrink-0">
                                            <img src={item.images[0]} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="grow">
                                            <h4 className="font-bold text-navy text-sm line-clamp-1">{item.name}</h4>
                                            <p className="text-xs text-navy/40">Qty: {item.quantity}</p>
                                            <p className="text-sm font-black text-diamond mt-1">${(item.discountPrice || item.price) * item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-3 pt-6 border-t border-navy/5">
                                <div className="flex justify-between text-navy/60 font-medium italic">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-navy/60 font-medium italic">
                                    <span>Shipping</span>
                                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                                </div>
                                <div className="flex justify-between text-2xl font-black text-navy pt-4 border-t border-navy/10">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="space-y-4 pt-6">
                                <div className="flex items-center space-x-3 opacity-40 text-xs uppercase font-bold tracking-widest">
                                    <Truck size={16} /> <span>Nova Express Delivery</span>
                                </div>
                                <div className="flex items-center space-x-3 opacity-40 text-xs uppercase font-bold tracking-widest">
                                    <ShieldCheck size={16} /> <span>Stripe Verified Security</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
