
import React from 'react';
import { Language } from '../constants';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  languages: Language[];
  disabled?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onLanguageChange, languages, disabled = false }) => {
  return (
    <div>
        <label htmlFor="language" className="block text-sm font-medium text-gray-300 mb-1">
            Translate To
        </label>
        <select
            id="language"
            name="language"
            value={selectedLanguage}
            onChange={onLanguageChange}
            disabled={disabled}
            className="block w-full pl-3 pr-10 py-2 text-base bg-gray-700 border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-white disabled:opacity-50"
        >
            {languages.map((lang) => (
            <option key={lang.code} value={lang.name}>
                {lang.name}
            </option>
            ))}
        </select>
    </div>
  );
};
