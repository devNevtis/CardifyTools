// src/store/useStore.js
import { create } from "zustand";

const useStore = create((set) => ({
  backgroundImage: null,
  profileImage: null,
  text: "",
  textSettings: {
    fontSize: "24px",
    color: "#000000",
    alignment: "left",
    fontWeight: "normal", // normal, bold
    textDecoration: "none", // none, underline
    fontFamily: "Arial", // Default font
  },
  profileDiameter: 348,
  // Nuevo estado para el offset vertical de la imagen de perfil
  profileImageOffset: 0,

  setBackgroundImage: (image) => set({ backgroundImage: image }),
  setProfileImage: (image) => set({ profileImage: image }),
  setText: (text) => set({ text }),
  setTextSettings: (settings) =>
    set((state) => ({
      textSettings: { ...state.textSettings, ...settings },
    })),
  setProfileDiameter: (diameter) => set({ profileDiameter: diameter }),
  // Setter para actualizar el offset vertical de la imagen de perfil
  setProfileImageOffset: (offset) => set({ profileImageOffset: offset }),
}));

export default useStore;