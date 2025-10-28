
import React, { useState, useEffect } from 'react';
import { ClipboardIcon } from './icons/ClipboardIcon';

interface ResultDisplayProps {
  title: string;
  text: string;
  isLoading: boolean;
}

const SkeletonLoader: React.FC = () => (
  <div className="space-y-3 animate-pulse">
    <div className="h-4 bg-gray-600 rounded w-3/4"></div>
    <div className="h-4 bg-gray-600 rounded w-full"></div>
    <div className="h-4 bg-gray-600 rounded w-5/6"></div>
  </div>
);

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ title, text, isLoading }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = () => {
    if (text) {
      navigator.clipboard.writeText(text);
      setCopied(true);
    }
  };

  return (
    <div className="w-full bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-4 relative min-h-[150px] flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-200">{title}</h3>
        <button
          onClick={handleCopy}
          disabled={!text || isLoading}
          className="p-1.5 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Copy to clipboard"
        >
          <ClipboardIcon copied={copied} />
        </button>
      </div>
      <div className="flex-grow bg-gray-900/50 p-3 rounded-md text-gray-300 overflow-y-auto whitespace-pre-wrap text-sm">
        {isLoading ? <SkeletonLoader /> : text || <span className="text-gray-500">Results will appear here...</span>}
      </div>
    </div>
  );
};
