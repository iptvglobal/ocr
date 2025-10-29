import React, { useState } from 'react';

interface AccordionItemProps {
  question: string;
  answer: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-700 rounded-lg bg-gray-800/50 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left p-4 sm:p-6"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-gray-100">{question}</span>
        <svg
          className={`w-6 h-6 text-gray-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
            <div className="p-4 sm:p-6 border-t border-gray-700">
                <p className="text-gray-300 leading-relaxed">{answer}</p>
            </div>
        </div>
      </div>
    </div>
  );
};
