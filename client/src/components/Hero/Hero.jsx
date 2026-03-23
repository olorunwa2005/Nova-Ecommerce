import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="relative h-screen flex items-center overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-navy to-navy-dark -z-10" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070')] bg-cover bg-center opacity-40 -z-10" />
            <div className="absolute inset-0 bg-diamond/5 -z-10" />

            <div className="container mx-auto px-6">
                <div className="max-w-4xl space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center space-x-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md"
                    >
                        <span className="w-2 h-2 bg-diamond rounded-full animate-pulse" />
                        <span className="text-white/60 text-xs font-black uppercase tracking-[0.3em]">Neural Tech Launch 2026</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-7xl md:text-9xl font-black text-white leading-[0.9] tracking-tighter"
                    >
                        THE <span className="text-diamond">FUTURE</span> <br /> OF GEAR.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl text-white/50 max-w-2xl font-medium leading-relaxed italic"
                    >
                        Experience the next evolution of performance with our diamond-grade collection. Engineered for the digital elite.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center gap-6 pt-6"
                    >
                        <button className="btn-gradient px-12 h-16 text-lg font-black group shadow-2xl shadow-diamond/20 w-full sm:w-auto">
                            <span className="group-hover:mr-2 transition-all">Explore Catalog</span>
                            <span className="opacity-0 group-hover:opacity-100 transition-all">→</span>
                        </button>
                        <button className="h-16 px-10 border-2 border-white/10 text-white rounded-2xl font-black hover:bg-white hover:text-navy transition-all duration-500 w-full sm:w-auto">
                            View Lookbook
                        </button>
                    </motion.div>
                </div>
            </div>

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20"
            >
                <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
                    <div className="w-1 h-3 bg-white rounded-full" />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
