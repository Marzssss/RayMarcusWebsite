import { create } from 'zustand';

interface State {
    activeSection: string | null;
    isMenuOpen: boolean;
    openSection: (section: string) => void;
    closeSection: () => void;
    toggleMenu: () => void;
    setMenuOpen: (isOpen: boolean) => void;
}

export const useStore = create<State>((set) => ({
    activeSection: null,
    isMenuOpen: false,
    openSection: (section) => set({ activeSection: section, isMenuOpen: false }),
    closeSection: () => set({ activeSection: null }),
    toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
    setMenuOpen: (isOpen) => set({ isMenuOpen: isOpen }),
}));
