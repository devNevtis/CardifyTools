// src/components/ImageUploader.jsx
"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function ImageUploader({ label, onImageUpload }) {
  const [fileName, setFileName] = useState("");

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFileName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      if (onImageUpload) onImageUpload(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
  });

  return (
    <div className="mb-4">
      <p className="font-semibold text-blue-900 text-sm">{label}</p>
      <div
        {...getRootProps()}
        className="border-dashed border-2 border-gray-300 p-4 text-center cursor-pointer hover:bg-gray-50 rounded-md"
      >
        <input {...getInputProps()} />
        {fileName ? (
          <p className="text-gray-700 font-medium text-sm">{fileName}</p>
        ) : (
          <p className="text-gray-500 text-sm">Drag & drop or click to upload</p>
        )}
      </div>
    </div>
  );
}
