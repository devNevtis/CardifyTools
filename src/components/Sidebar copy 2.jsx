// src/components/Sidebar.jsx
"use client";

import ImageUploader from "./ImageUploader";
import useStore from "@/store/useStore";
import html2canvas from "html2canvas";
import { FaAlignLeft, FaAlignCenter, FaAlignRight } from "react-icons/fa";

export default function Sidebar() {
  // Estados y setters desde el store
  const setBackgroundImage = useStore((state) => state.setBackgroundImage);
  const setProfileImage = useStore((state) => state.setProfileImage);
  const setText = useStore((state) => state.setText);
  const setTextSettings = useStore((state) => state.setTextSettings);
  const textSettings = useStore((state) => state.textSettings);
  const profileDiameter = useStore((state) => state.profileDiameter);
  const setProfileDiameter = useStore((state) => state.setProfileDiameter);

  // Función para descargar la tarjeta
  const handleDownload = async () => {
    const canvasElement = document.getElementById("cardify-canvas");
    if (!canvasElement) {
      alert("Canvas not found!");
      return;
    }
    const canvas = await html2canvas(canvasElement);
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "cardify.png";
    link.click();
  };

  // Actualización del tamaño de la imagen de perfil mediante slider
  const handleProfileDiameterChange = (e) => {
    setProfileDiameter(Number(e.target.value));
  };

  // Manejadores para las opciones de tipografía y estilo
  const handleFontSizeChange = (e) => {
    setTextSettings({ fontSize: e.target.value });
  };

  const handleFontFamilyChange = (e) => {
    setTextSettings({ fontFamily: e.target.value });
  };

  const toggleBold = () => {
    setTextSettings({ fontWeight: textSettings.fontWeight === "bold" ? "normal" : "bold" });
  };

  const toggleUnderline = () => {
    setTextSettings({ textDecoration: textSettings.textDecoration === "underline" ? "none" : "underline" });
  };

  const handleTextColorChange = (e) => {
    setTextSettings({ color: e.target.value });
  };

  const setAlignment = (alignment) => {
    setTextSettings({ alignment });
  };

  return (
    <aside className="w-full md:w-1/4 bg-gray-50 shadow-lg p-4 overflow-y-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Cardify Tools</h1>
      
      {/* Sección de Subida de Imágenes */}
      <div className="mb-4 space-y-4">
        <ImageUploader label="Upload Background Image" onImageUpload={setBackgroundImage} />
        <ImageUploader label="Upload Profile Image" onImageUpload={setProfileImage} />
      </div>
      
      {/* Sección de Tamaño de Imagen de Perfil */}
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-blue-900 mb-2">Profile Image Size</h2>
        <div className="flex items-center space-x-3">
          <input
            type="range"
            min="100"
            max="500"
            step="10"
            value={profileDiameter}
            onChange={handleProfileDiameterChange}
            className="w-full"
          />
          <span className="text-blue-700 font-medium text-sm">{profileDiameter}px</span>
        </div>
      </div>

      {/* Sección de Personalización de Texto */}
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-blue-900 mb-2">Customize Text</h2>
        <textarea
          rows="3"
          placeholder="Enter your text..."
          onChange={(e) => setText(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 mb-2 text-gray-800"
        ></textarea>
        
        <div className="space-y-4 border border-gray-300 p-2 rounded-md">
          {/* Fila: Font Size y Font Family */}
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
              <select
                value={textSettings.fontSize}
                onChange={handleFontSizeChange}
                className="w-full border border-gray-300 rounded-md p-1 text-gray-800"
              >
                <option value="16px">Small</option>
                <option value="24px">Medium</option>
                <option value="32px">Large</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Font Family</label>
              <select
                value={textSettings.fontFamily}
                onChange={handleFontFamilyChange}
                className="w-full border border-gray-300 rounded-md p-1 text-gray-800"
              >
                <option value="Arial">Arial</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Verdana">Verdana</option>
                <option value="Georgia">Georgia</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
                <option value="Comic Sans MS">Comic Sans MS</option>
                <option value="Trebuchet MS">Trebuchet MS</option>
                <option value="Palatino Linotype">Palatino Linotype</option>
                <option value="Lucida Console">Lucida Console</option>
                <option value="Lucida Sans">Lucida Sans</option>
                <option value="Impact">Impact</option>
                <option value="Tahoma">Tahoma</option>
              </select>
            </div>
          </div>

          {/* Sección de Text Format: Estilo, Color y Alineación en una sola fila */}
          <div className="flex items-center gap-2 mb-4">

            {/* Botones de Font Style: Bold y Underline */}
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleBold}
                className={`w-8 h-8 flex items-center justify-center rounded-md border ${
                  textSettings.fontWeight === "bold" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                }`}
              >
                <span className="font-bold">B</span>
              </button>
              <button
                onClick={toggleUnderline}
                className={`w-8 h-8 flex items-center justify-center rounded-md border ${
                  textSettings.textDecoration === "underline" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                }`}
              >
                <span className="underline">U</span>
              </button>
            </div>

            {/* Selector de Color de Texto (se reduce el ancho para que ocupe menos espacio) */}
            <div>
              <input
                type="color"
                value={textSettings.color}
                onChange={handleTextColorChange}
                className="w-8 h-8 p-0 border-0"
              />
            </div>

            {/* Botones de Alineación con íconos */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setAlignment("left")}
                className={`w-8 h-8 flex items-center justify-center rounded-md border ${
                  textSettings.alignment === "left" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                }`}
              >
                <FaAlignLeft size={20} />
              </button>
              <button
                onClick={() => setAlignment("center")}
                className={`w-8 h-8 flex items-center justify-center rounded-md border ${
                  textSettings.alignment === "center" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                }`}
              >
                <FaAlignCenter size={20} />
              </button>
              <button
                onClick={() => setAlignment("right")}
                className={`w-8 h-8 flex items-center justify-center rounded-md border ${
                  textSettings.alignment === "right" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                }`}
              >
                <FaAlignRight size={20} />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Botón de Descarga */}
      <button
        onClick={handleDownload}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md mt-4"
      >
        Download Card
      </button>
    </aside>
  );
}
