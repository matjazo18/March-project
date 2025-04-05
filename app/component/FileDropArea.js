"use client";
import React, { useState } from "react";
import Mammoth from "mammoth";
import InputAi from "./InputAi";

const FileDropArea = ({ setFileContent }) => {
  const [fileName, setFileName] = useState("");
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      console.log(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFileName(file.name);
      console.log("Selected file:", file);

      // This is the part where the file is being displayed in binary
      //After that the file is converted from the XLM files to normal readable text
      const reader = new FileReader();
      reader.onload = async (event) => {
        const arrayBuffer = event.target.result;

        Mammoth.extractRawText({ arrayBuffer })
          .then((result) => {
            setFileContent(result.value);
            console.log(result.value);
          })
          .catch((e) => console.error("Error reading the file", e));
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  return (
    <div className="relative flex justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-6 min-h-[300px]">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`w-full max-w-md h-64 aspect-square
        border-2 border-dashed rounded-xl
        flex flex-col justify-center items-center
        cursor-pointer transition-all p-8 text-center
        ${
          isDragActive
            ? "border-indigo-400 bg-indigo-50/50 shadow-inner"
            : "border-indigo-200"
        }
        ${fileName ? "text-indigo-700" : "text-indigo-500"}
        bg-white/80 backdrop-blur-sm hover:border-indigo-300
        shadow-md hover:shadow-lg
      `}
      >
        {fileName ? (
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-indigo-400 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="font-medium text-indigo-600 truncate max-w-full px-2">
              {fileName}
            </span>
            <p className="text-sm text-indigo-400 mt-2">Drop to replace file</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-indigo-400 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
            <p className="font-medium text-indigo-600">
              Drag & drop files here
            </p>
            <p className="text-sm text-indigo-400 mt-2">or click to browse</p>
            <div className="mt-4 px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg text-sm font-medium">
              Select File
            </div>
          </div>
        )}
      </div>
      <input
        type="file"
        onChange={handleFileSelect}
        className="absolute inset-0 max-w-md mx-auto max-h-64 mt-6 opacity-0 cursor-pointer max-md:mx-6"
      />
    </div>
  );
};

export default FileDropArea;
