"use client";

import { motion } from 'framer-motion';

export default function LoadingScreen() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-pink-950 via-purple-950 to-indigo-950">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 border-4 border-pink-400/30 border-t-pink-400 rounded-full"
                />
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Loading Room...</h2>
                <p className="text-pink-300 text-sm">✧ Preparing your 2000s experience ✧</p>
            </motion.div>
        </div>
    );
}
