import React, { useState, useCallback } from 'react';
import { PdfIcon } from './icons/PdfIcon';

interface PdfUploaderProps {
  onPdfSelect: (file: File) => void;
  fileName: string | undefined;
}

export const PdfUploader: React.FC<PdfUploaderProps> = ({ onPdfSelect, fileName }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onPdfSelect(e.target.files[0]);
    }
  };

  const handleDragEvents = useCallback((e: React.DragEvent<HTMLLabelElement>, dragging: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(dragging);
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    handleDragEvents(e, false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onPdfSelect(e.dataTransfer.files[0]);
    }
  }, [handleDragEvents, onPdfSelect]);

  const uploaderClass = `relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300 ease-in-out ${
    isDragging ? 'border-indigo-500 bg-gray-700' : 'border-gray-600 bg-gray-800 hover:bg-gray-700'
  }`;
  
  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file-pdf"
        className={uploaderClass}
        onDragEnter={(e) => handleDragEvents(e, true)}
        onDragOver={(e) => handleDragEvents(e, true)}
        onDragLeave={(e) => handleDragEvents(e, false)}
        onDrop={handleDrop}
      >
        {fileName ? (
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center p-4">
            <PdfIcon />
            <p className="font-semibold text-indigo-400 break-all">{fileName}</p>
            <p className="text-xs text-gray-500 mt-2">Click or drag another file to replace</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
            <PdfIcon />
            <p className="mb-2 text-sm text-gray-400">
              <span className="font-semibold text-indigo-400">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PDF only (MAX. 10MB)</p>
          </div>
        )}
        <input id="dropzone-file-pdf" type="file" className="hidden" onChange={handleFileChange} accept="application/pdf" />
      </label>
    </div>
  );
};
