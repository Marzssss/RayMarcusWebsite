"use client";

import { useStore } from "@/lib/store";
import { artistData } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { X, Instagram, Music, Video, User } from "lucide-react";

export default function Overlay() {
    const { activeSection, closeSection } = useStore();

    const renderContent = () => {
        switch (activeSection) {
            case "music":
                return (
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold font-mono text-pink-500 mb-4">RELEASES</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {artistData.releases.map((release) => (
                                <div key={release.id} className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/20 flex items-center gap-4">
                                    <div className="w-16 h-16 bg-gray-800 rounded-md overflow-hidden relative">
                                        <img src={release.cover} alt={release.title} className="absolute inset-0 w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white">{release.title}</h3>
                                        <p className="text-sm text-gray-400">{release.year}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case "video":
                return (
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold font-mono text-cyan-400 mb-4">VIDEOS</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {artistData.videos.map((video) => (
                                <div key={video.id} className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/20">
                                    <div className="aspect-video bg-black rounded-md mb-2 relative overflow-hidden">
                                        <img src={video.thumbnail} alt={video.title} className="absolute inset-0 w-full h-full object-cover" />
                                    </div>
                                    <h3 className="font-bold text-white">{video.title}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case "bio":
                return (
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold font-mono text-yellow-400 mb-4">BIO</h2>
                        <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/20">
                            <p className="text-lg text-white leading-relaxed font-sans">
                                {artistData.bio}
                            </p>
                            <div className="mt-6 flex gap-4">
                                <a href={artistData.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300">
                                    <Instagram size={24} />
                                </a>
                                <a href={artistData.socials.spotify} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300">
                                    <Music size={24} />
                                </a>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            {/* Header / Nav (Always visible) */}
            <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start pointer-events-none z-40">
                <h1 className="text-2xl font-bold text-white tracking-tighter mix-blend-difference pointer-events-auto">
                    RAY MARCUS
                </h1>
                <div className="flex flex-col gap-2 pointer-events-auto">
                    {/* Simple Nav for Mobile */}
                </div>
            </div>

            {/* Bottom Controls (Always visible) */}
            <div className="absolute bottom-8 left-0 w-full flex justify-center gap-6 pointer-events-none z-40">
                <button
                    onClick={() => useStore.getState().openSection('music')}
                    className="p-3 bg-black/50 backdrop-blur-md rounded-full text-white border border-white/20 hover:bg-pink-500/50 transition-colors pointer-events-auto"
                >
                    <Music size={24} />
                </button>
                <button
                    onClick={() => useStore.getState().openSection('video')}
                    className="p-3 bg-black/50 backdrop-blur-md rounded-full text-white border border-white/20 hover:bg-cyan-500/50 transition-colors pointer-events-auto"
                >
                    <Video size={24} />
                </button>
                <button
                    onClick={() => useStore.getState().openSection('bio')}
                    className="p-3 bg-black/50 backdrop-blur-md rounded-full text-white border border-white/20 hover:bg-yellow-500/50 transition-colors pointer-events-auto"
                >
                    <User size={24} />
                </button>
            </div>

            {/* Full Screen Content Overlay */}
            <AnimatePresence>
                {activeSection && (
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg"
                    >
                        <div className="relative w-full max-w-md max-h-[80vh] overflow-y-auto scrollbar-hide">
                            <button
                                onClick={closeSection}
                                className="absolute top-0 right-0 p-2 text-white hover:text-gray-300 transition-colors z-10"
                            >
                                <X size={32} />
                            </button>
                            <div className="pt-12 pb-8 px-4">
                                {renderContent()}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
