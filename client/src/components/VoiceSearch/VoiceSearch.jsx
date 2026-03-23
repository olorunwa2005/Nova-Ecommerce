import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, X, Loader2, Sparkles, AlertCircle } from 'lucide-react';

const VoiceSearch = ({ isOpen, onClose }) => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        let recognition = null;

        if (isOpen) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

            if (!SpeechRecognition) {
                setError("Voice search is not supported in this browser. Try Chrome or Edge!");
                return;
            }

            recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = true;
            recognition.lang = 'en-US';

            recognition.onstart = () => {
                setIsListening(true);
                setError(null);
            };

            recognition.onresult = (event) => {
                const current = event.resultIndex;
                const resultTranscript = event.results[current][0].transcript;
                setTranscript(resultTranscript);
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                setError(`Voice connection failed: ${event.error}`);
                setIsListening(false);
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            recognition.start();

            return () => {
                if (recognition) recognition.stop();
            };
        } else {
            setTranscript('');
            setIsListening(false);
            setError(null);
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-150 bg-navy/95 backdrop-blur-xl flex items-center justify-center p-6"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-10 right-10 p-4 text-white/40 hover:text-white transition-colors"
                    >
                        <X size={40} />
                    </button>

                    <div className="max-w-2xl w-full text-center space-y-12">
                        <div className="relative inline-block">
                            <motion.div
                                animate={{ scale: isListening ? [1, 1.2, 1] : 1 }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className={`w-32 h-32 rounded-full flex items-center justify-center transition-colors duration-500 ${isListening ? 'bg-diamond' : error ? 'bg-red-500/20' : 'bg-white/10'}`}
                            >
                                {isListening ? (
                                    <Loader2 size={48} className="text-white animate-spin" />
                                ) : error ? (
                                    <AlertCircle size={48} className="text-red-500" />
                                ) : (
                                    <Mic size={48} className="text-white" />
                                )}
                            </motion.div>
                            {isListening && (
                                <>
                                    <div className="absolute inset-0 bg-diamond rounded-full animate-ping opacity-20" />
                                    <div className="absolute inset-[-20%] bg-diamond/10 rounded-full animate-pulse blur-xl" />
                                </>
                            )}
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-4xl font-black text-white tracking-tight">
                                {isListening ? "Listening..." : error ? "Sync Error" : "I heard you"}
                            </h2>
                            <div className="min-h-[100px] flex items-center justify-center">
                                <p className={`text-2xl font-bold italic ${error ? 'text-red-400' : 'text-diamond'}`}>
                                    {error || transcript || "Try saying 'Laptops under $1000'"}
                                </p>
                            </div>
                        </div>

                        {!isListening && transcript && !error && (
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="btn-gradient px-12 h-16 font-black text-xl flex items-center space-x-3 mx-auto shadow-2xl shadow-diamond/20"
                                onClick={() => {
                                    window.location.href = `/shop?search=${encodeURIComponent(transcript)}`;
                                    onClose();
                                }}
                            >
                                <Sparkles size={24} />
                                <span>Show Results</span>
                            </motion.button>
                        )}

                        <div className="pt-20">
                            <p className="text-xs font-black text-white/20 uppercase tracking-[0.4em]">Powered by Nova Voice AI</p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default VoiceSearch;

