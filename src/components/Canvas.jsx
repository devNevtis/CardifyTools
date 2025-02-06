// src/components/Canvas.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import useStore from "@/store/useStore";

export default function Canvas() {
  const backgroundImage = useStore((state) => state.backgroundImage);
  const profileImage = useStore((state) => state.profileImage);
  const text = useStore((state) => state.text);
  const textSettings = useStore((state) => state.textSettings);
  const profileDiameter = useStore((state) => state.profileDiameter);
  const profileImageOffset = useStore((state) => state.profileImageOffset);
  const setProfileImageOffset = useStore((state) => state.setProfileImageOffset);

  // Estado local para almacenar las dimensiones naturales de la imagen (al cargarse)
  const [profileImageDims, setProfileImageDims] = useState(null);

  // Estados y refs para el manejo del arrastre
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef(0);
  const dragStartOffset = useRef(0);

  // Al cargar la imagen, guardamos sus dimensiones naturales para poder calcular la altura escalada
  const handleImageLoad = (e) => {
    setProfileImageDims({
      naturalWidth: e.target.naturalWidth,
      naturalHeight: e.target.naturalHeight,
    });
  };

  // Inicia el arrastre
  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStartY.current = e.clientY;
    dragStartOffset.current = profileImageOffset;
  };

  // Efecto que se encarga de escuchar los eventos de mousemove y mouseup cuando se está arrastrando
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging || !profileImageDims) return;
      const deltaY = e.clientY - dragStartY.current;
      let newOffset = dragStartOffset.current + deltaY;
      
      // Calcular la altura escalada de la imagen: la imagen se ajusta al ancho del contenedor
      const scaledHeight = profileDiameter * (profileImageDims.naturalHeight / profileImageDims.naturalWidth);

      // Limitar el offset para que la imagen siempre cubra el contenedor:
      // - El offset máximo es 0 (imagen alineada arriba)
      // - El offset mínimo es el contenedor menos la altura escalada
      const minOffset = profileDiameter - scaledHeight;
      const maxOffset = 0;
      if (newOffset > maxOffset) newOffset = maxOffset;
      if (newOffset < minOffset) newOffset = minOffset;

      setProfileImageOffset(newOffset);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, profileImageDims, profileDiameter, setProfileImageOffset]);


const textContainerStyle = (() => {
  const baseStyle = {
    position: "absolute",
    top: "2rem", // Aumenta el margen superior
    fontSize: textSettings.fontSize,
    color: textSettings.color,
    fontWeight: textSettings.fontWeight,
    textDecoration: textSettings.textDecoration,
    fontFamily: textSettings.fontFamily,
    lineHeight: "1.2",
    zIndex: 2, // Para que esté por encima de la imagen de fondo
    // Propiedades del overlay que se ajusta al texto:
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    padding: "0.5rem",
    borderRadius: "0.25rem",
  };

  if (textSettings.alignment === "left") {
    return {
      ...baseStyle,
      textAlign: "left",
      width: "60%",
      paddingLeft: "1rem",
      left: 0,
    };
    } else if (textSettings.alignment === "right") {
      return {
        ...baseStyle,
        textAlign: "right",
        width: "60%",
        paddingRight: "1rem",
        marginLeft: "40%",
      };
    } else {
      // center
      return {
        ...baseStyle,
        textAlign: "center",
        width: "60%",
        marginLeft: "20%",
        marginRight: "20%",
      };
    }
  })();

  return (
    <div
      id="cardify-canvas"
      className="w-[800px] h-[642px] bg-white shadow-md rounded-xl relative flex flex-col justify-center items-center"
    >
      {/* Imagen de fondo */}
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt="Background"
          className="absolute top-0 left-0 w-full h-[432px] object-cover"
          style={{ zIndex: 0 }}
        />
      )}

      {/* Texto personalizado */}
      { text && (
        <div style={textContainerStyle}>
          {text}
        </div>
      )}

      {/* Contenedor circular para la imagen de perfil con arrastre vertical */}
      {profileImage && (
        <div
          className="absolute rounded-full border-4 border-white overflow-hidden cursor-grab"
          style={{
            width: `${profileDiameter}px`,
            height: `${profileDiameter}px`,
            top: "432px", // Alineado con la parte inferior de la imagen de fondo
            marginTop: `-${profileDiameter / 2}px`, // Centrar verticalmente
            left: `${(800 - profileDiameter) / 2}px`, // Centramos horizontalmente calculando el offset
            cursor: isDragging ? "grabbing" : "grab",
          }}
          onMouseDown={handleMouseDown}
        >
          <img
            src={profileImage}
            alt="Profile"
            onLoad={handleImageLoad}
            style={{
              width: "100%",
              position: "absolute",
              top: `${profileImageOffset}px`,
              left: 0,
              userSelect: "none",
              pointerEvents: "none", // Para que el contenedor capture los eventos de mouse
            }}
          />
        </div>
      )}

      {/* Placeholder en caso de no haber contenido */}
      {!backgroundImage && !profileImage && !text && (
        <p className="text-gray-400 text-center">
          Your design will appear here
        </p>
      )}
    </div>
  );
}
