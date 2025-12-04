"use client";

import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import { albums } from '@/lib/data';

export default function AlbumModal() {
    const { selectedIndex, closeModal } = useStore();
    const album = albums[selectedIndex];

    if (!album) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            onClick={closeModal}
        >
            <motion.div
                initial={{ scale: 0.8, y: 30, rotateX: -15 }}
                animate={{ scale: 1, y: 0, rotateX: 0 }}
                exit={{ scale: 0.8, y: 30 }}
                transition={{ type: "spring", damping: 20 }}
                className="relative w-full max-w-sm bg-gradient-to-br from-pink-900/90 via-purple-900/90 to-indigo-900/90 p-6 md:p-8 rounded-2xl border border-pink-400/30 shadow-2xl shadow-pink-500/20"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={closeModal}
                    className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-pink-300 hover:text-white hover:bg-pink-500/30 rounded-full transition-colors"
                >
                    ✕
                </button>

                {/* CD Icon */}
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center shadow-lg">
                    <div className="w-6 h-6 rounded-full bg-pink-900" />
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-1">
                    {album.title}
                </h2>
                <p className="text-pink-300 text-center text-sm mb-4">Ray Marcus</p>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-pink-400/50 to-transparent mb-4" />

                <ul className="space-y-2">
                    {album.tracks.map((track, i) => (
                        <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center text-white/90 hover:text-pink-300 transition-colors cursor-pointer group"
                        >
                            <span className="w-8 h-8 flex items-center justify-center text-pink-400 text-sm bg-pink-500/10 rounded-full mr-3 group-hover:bg-pink-500/30">
                                {i + 1}
                            </span>
                            <span className="flex-1">{track}</span>
                            <span className="text-pink-400/50 text-xs">3:4{i}</span>
                        </motion.li>
                    ))}
                </ul>

                {/* Play all button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-shadow"
                >
                    ▶ Play All
                </motion.button>
            </motion.div>
        </motion.div>
    );
}
