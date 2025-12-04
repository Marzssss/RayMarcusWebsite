"use client";

import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import { bio } from '@/lib/data';

export default function BioModal() {
    const { closeModal } = useStore();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            onClick={closeModal}
        >
            <motion.div
                initial={{ y: 50, opacity: 0, rotate: -2 }}
                animate={{ y: 0, opacity: 1, rotate: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ type: "spring", damping: 20 }}
                className="relative w-full max-w-md bg-gradient-to-br from-pink-100 to-purple-100 p-6 md:p-8 rounded-sm shadow-2xl"
                style={{
                    backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #ffc0cb 28px)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={closeModal}
                    className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-pink-600 hover:text-pink-800 hover:bg-pink-200 rounded-full transition-colors"
                >
                    ✕
                </button>

                {/* Heart sticker */}
                <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 15 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="absolute -top-4 -right-4 text-4xl"
                >
                    💖
                </motion.div>

                {/* Star sticker */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: -10 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="absolute top-8 -left-3 text-2xl"
                >
                    ⭐
                </motion.div>

                <h2 className="text-3xl md:text-4xl font-serif text-pink-800 mb-4 italic">
                    Dear Diary...
                </h2>

                <div className="pl-4 border-l-2 border-pink-300 mb-6">
                    <p className="text-lg text-pink-900/80 font-serif leading-relaxed italic">
                        About Ray ♡
                    </p>
                </div>

                <p className="text-base md:text-lg text-pink-800/90 font-serif leading-relaxed mb-6">
                    {bio}
                </p>

                <div className="flex items-center gap-2 text-pink-500">
                    <span>♪</span>
                    <span>♡</span>
                    <span>★</span>
                    <span>♪</span>
                </div>

                <div className="mt-6 pt-4 border-t border-pink-300/50">
                    <p className="text-xs text-pink-400 font-sans uppercase tracking-widest text-center">
                        Ray Marcus Music © 2025
                    </p>
                </div>

                {/* Tape decoration */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-6 bg-yellow-200/80 rotate-2" />
            </motion.div>
        </motion.div>
    );
}
