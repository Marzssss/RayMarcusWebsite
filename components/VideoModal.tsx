"use client";

import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import { videos } from '@/lib/data';

export default function VideoModal() {
    const { selectedIndex, closeModal } = useStore();
    const video = videos[selectedIndex];

    if (!video) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg p-4"
            onClick={closeModal}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                className="relative w-full max-w-3xl bg-gradient-to-br from-purple-900/80 to-pink-900/80 p-2 md:p-3 rounded-2xl border border-purple-400/30 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={closeModal}
                    className="absolute -top-10 right-0 md:top-2 md:right-2 z-10 w-10 h-10 flex items-center justify-center text-white bg-pink-500/50 hover:bg-pink-500 rounded-full transition-colors"
                >
                    ✕
                </button>

                {/* Video title */}
                <div className="text-center py-2 md:py-3">
                    <h2 className="text-lg md:text-xl font-bold text-white">{video.title}</h2>
                    <p className="text-pink-300 text-xs">Ray Marcus • Official Video</p>
                </div>

                {/* Video container */}
                <div className="aspect-video bg-black rounded-xl overflow-hidden">
                    <iframe
                        width="100%"
                        height="100%"
                        src={video.url}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                    />
                </div>

                {/* Bottom decorative gradient */}
                <div className="h-1 mt-2 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 rounded-full" />
            </motion.div>
        </motion.div>
    );
}
