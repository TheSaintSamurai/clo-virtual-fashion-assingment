
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (keyword: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Find the items you're looking for",
  className = '',
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(inputValue);
    }
  };

  const handleSearch = () => {
    onSearch(inputValue);
  };

  return (
    <div className={`flex items-center w-full ${className}`} style={{ background: 'transparent', position: 'relative' }}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none"
        style={{ backgroundColor: '#23232a', border: 'none', boxShadow: 'none', fontFamily: 'AvenirNextLTProRegular, Inter, Arial, sans-serif', fontSize: '16px' }}
      />
      <button
        onClick={handleSearch}
        className="text-gray-400 hover:text-white focus:outline-none"
        style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'transparent', paddingRight: '6px', cursor: 'pointer' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 3 10.5a7.5 7.5 0 0 0 13.65 6.15Z" />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
