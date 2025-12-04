import { create } from 'zustand';

type ModalType = "none" | "album" | "video" | "bio";

interface AppState {
    modal: ModalType;
    selectedIndex: number;
    openModal: (type: ModalType, index?: number) => void;
    closeModal: () => void;
}

export const useStore = create<AppState>((set) => ({
    modal: "none",
    selectedIndex: 0,
    openModal: (type, index = 0) => set({ modal: type, selectedIndex: index }),
    closeModal: () => set({ modal: "none" }),
}));
