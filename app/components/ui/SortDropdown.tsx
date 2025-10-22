import React, { useState, useRef, useEffect } from 'react';

const SORT_OPTIONS = [
  { value: 'name', label: 'Item Name' },
  { value: 'higher', label: 'Higher Price' },
  { value: 'lower', label: 'Lower Price' },
];

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className="relative" style={{ minWidth: 140 }}>
      <button
        className="flex items-center justify-between text-white px-0 py-0"
        style={{
          fontSize: 13,
          background: 'transparent',
          border: 'none',
          borderRadius: 0,
          minWidth: 140,
          width: 140,
          height: 32,
          position: 'relative',
          borderBottom: '2px solid #444',
        }}
        onClick={() => setOpen((o) => !o)}
        type="button"
      >
        <span style={{ fontFamily: 'AvenirNextLTProRegular', fontSize: 13 }}>{SORT_OPTIONS.find(opt => opt.value === value)?.label || 'Item Name'}</span>
        <svg style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }} className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div
          className="absolute left-0 mt-2 z-10"
          style={{ background: '#23232a', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.18)', minWidth: 140, width: 140, padding: '8px 0' }}
        >
          {SORT_OPTIONS.map(opt => (
            <button
              key={opt.value}
              className={`w-full text-left px-5 py-2 text-white hover:bg-[#18818b] rounded-lg transition-colors ${value === opt.value ? 'bg-[#18818b]' : ''}`}
              style={{ fontSize: 13, fontFamily: 'AvenirNextLTProRegular', background: value === opt.value ? '#18818b' : 'transparent', cursor: 'pointer' }}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              type="button"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
