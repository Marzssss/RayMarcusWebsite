"use client";

import { useStore } from '@/lib/store';
import { AnimatePresence } from 'framer-motion';
import AlbumModal from './AlbumModal';
import VideoModal from './VideoModal';
import BioModal from './BioModal';

export default function ModalRoot() {
    const { modal } = useStore();

    return (
        <AnimatePresence>
            {modal === 'album' && <AlbumModal />}
            {modal === 'video' && <VideoModal />}
            {modal === 'bio' && <BioModal />}
        </AnimatePresence>
    );
}
