import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, UserPlus, CheckCircle } from 'lucide-react';
import api from '../../utils/api';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match');
        }

        setLoading(true);

        try {
            await api.post('/auth/register', {
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password
            });
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-gray-50/30 overflow-hidden">
            {/* Decorative Orbs */}
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-diamond/10 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-navy/10 rounded-full blur-[100px] -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="container mx-auto px-4 max-w-lg"
            >
                <div className="glass p-10 bg-white/40">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-black text-navy mb-3">Join Nova</h1>
                        <p className="text-navy/40 font-medium">Start your premium shopping journey today</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-navy/60 uppercase ml-1">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy/20 group-focus-within:text-diamond transition-colors" />
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-4 bg-navy/5 rounded-2xl outline-none focus:ring-4 focus:ring-diamond/10 transition-all font-medium"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-navy/60 uppercase ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy/20 group-focus-within:text-diamond transition-colors" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-4 bg-navy/5 rounded-2xl outline-none focus:ring-4 focus:ring-diamond/10 transition-all font-medium"
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-navy/60 uppercase ml-1">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy/20 group-focus-within:text-diamond transition-colors" />
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-4 bg-navy/5 rounded-2xl outline-none focus:ring-4 focus:ring-diamond/10 transition-all font-medium"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-navy/60 uppercase ml-1">Confirm</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy/20 group-focus-within:text-diamond transition-colors" />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-4 bg-navy/5 rounded-2xl outline-none focus:ring-4 focus:ring-diamond/10 transition-all font-medium"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 space-y-4 text-sm font-medium text-navy/50">
                            <div className="flex items-center space-x-2">
                                <CheckCircle size={16} className="text-green-500" />
                                <span>I agree to the Terms of Service</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`btn-gradient w-full h-14 font-black text-lg flex items-center justify-center space-x-3 mt-6 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            <UserPlus size={20} />
                            <span>{loading ? 'Creating Account...' : 'Create Nova Account'}</span>
                        </button>
                    </form>

                    <p className="mt-10 text-center text-navy/40 font-medium">
                        Already have an account? <Link to="/login" className="text-diamond font-black hover:underline">Log In</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
