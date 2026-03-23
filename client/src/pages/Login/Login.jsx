import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, LogIn, Github } from 'lucide-react';
import useStore from '../../store/useStore';
import api from '../../utils/api';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { setUser } = useStore();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/auth/login', { email, password });
            const { token, user } = response.data;

            setUser(user, token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-gray-50/30">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-diamond/5 blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-navy/5 blur-3xl -z-10" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="container mx-auto px-4 max-w-md"
            >
                <div className="glass p-10 bg-white/40">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-black text-navy mb-3">Welcome Back</h1>
                        <p className="text-navy/40 font-medium">Log in to your Nova account</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-navy/60 uppercase tracking-wider ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy/20 group-focus-within:text-diamond transition-colors" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-navy/5 rounded-2xl outline-none focus:ring-4 focus:ring-diamond/10 transition-all font-medium"
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-navy/60 uppercase tracking-wider ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy/20 group-focus-within:text-diamond transition-colors" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-12 py-4 bg-navy/5 rounded-2xl outline-none focus:ring-4 focus:ring-diamond/10 transition-all font-medium"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-navy/20 hover:text-navy/40"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded border-navy/10 text-diamond focus:ring-diamond" />
                                <span className="text-navy/60">Remember me</span>
                            </label>
                            <a href="#" className="text-diamond font-bold hover:underline">Forgot password?</a>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`btn-gradient w-full h-14 font-black text-lg flex items-center justify-center space-x-3 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            <LogIn size={20} />
                            <span>{loading ? 'Logging in...' : 'Log In'}</span>
                        </button>
                    </form>

                    <div className="mt-10">
                        <div className="relative mb-10">
                            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-navy/5" />
                            <span className="relative bg-white/0 px-4 text-xs font-bold text-navy/20 uppercase tracking-widest mx-auto block w-fit">Or continue with</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button className="h-12 border border-navy/5 rounded-xl flex items-center justify-center space-x-2 hover:bg-navy/5 transition-colors font-bold text-navy/60">
                                <Github size={20} />
                                <span>GitHub</span>
                            </button>
                            <button className="h-12 border border-navy/5 rounded-xl flex items-center justify-center space-x-2 hover:bg-navy/5 transition-colors font-bold text-navy/60">
                                <div className="w-5 h-5 bg-navy/10 rounded-full" />
                                <span>Google</span>
                            </button>
                        </div>
                    </div>

                    <p className="mt-10 text-center text-navy/40 font-medium">
                        Don't have an account? <Link to="/register" className="text-diamond font-black hover:underline">Create Account</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
