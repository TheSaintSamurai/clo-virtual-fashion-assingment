import React from 'react';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  className = '',
}) => {
  return (
    <label className={`flex items-center cursor-pointer ${className}`} style={{ padding: '0 12px', minHeight: 32 }}>
      <span style={{ position: 'relative', display: 'inline-block', width: 18, height: 18 }}>
        <input
          type="checkbox"
          checked={checked}
          onChange={e => onChange(e.target.checked)}
          style={{
            width: 18,
            height: 18,
            borderRadius: 4,
            border: '2px solid #d1d1d1',
            background: checked ? '#18818b' : '#23232a',
            appearance: 'none',
            outline: 'none',
            margin: 0,
            transition: 'background 0.2s',
            cursor: 'pointer',
            position: 'absolute',
            left: 0,
            top: 0,
          }}
        />
        {checked && (
          <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="#fff"
            strokeWidth="2.5"
            style={{ position: 'absolute', left: 2, top: 2, width: 14, height: 14, pointerEvents: 'none' }}
          >
            <polyline points="4,10 8,14 16,6" />
          </svg>
        )}
      </span>
      <span style={{ marginLeft: 8, color: '#eaeaea', fontSize: 13, fontFamily: 'AvenirNextLTProRegular' }}>{label}</span>
    </label>
  );
};

export default Checkbox;
