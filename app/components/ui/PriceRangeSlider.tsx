import React, { useRef, useEffect } from 'react';

interface PriceRangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  disabled?: boolean;
}

const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(val, max));

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({ min, max, value, onChange, disabled }) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  // Calculate percent positions
  const leftPercent = ((value[0] - min) / (max - min)) * 100;
  const rightPercent = ((value[1] - min) / (max - min)) * 100;

  // Handle drag
  const handleDrag = (index: 0 | 1, clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const percent = clamp(((clientX - rect.left) / rect.width) * 100, 0, 100);
    const newValue = Math.round(min + ((max - min) * percent) / 100);
    let next: [number, number] = [...value];
    if (index === 0) {
      next[0] = clamp(newValue, min, value[1]);
    } else {
      next[1] = clamp(newValue, value[0], max);
    }
    onChange(next);
  };

  // Mouse event handlers
  const startDrag = (index: 0 | 1) => (e: React.MouseEvent) => {
    if (disabled) return;
    const move = (ev: MouseEvent) => handleDrag(index, ev.clientX);
    const up = () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  };

  return (
    <div className="slider-container" style={{ opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? 'none' : 'auto', minWidth: 220 }}>
      <span className="slider-label">${value[0]}</span>
      <div ref={sliderRef} className="slider-track" style={{ position: 'relative', margin: '0 8px', background: '#18818b', height: 4, borderRadius: 2, flex: 1 }}>
        {/* Track highlight */}
        <div
          style={{
            position: 'absolute',
            left: `${leftPercent}%`,
            width: `${rightPercent - leftPercent}%`,
            top: 0,
            height: 4,
            background: '#18818b',
            borderRadius: 2,
            zIndex: 1,
          }}
        />
        {/* Left thumb */}
        <div
          className="slider-thumb"
          style={{ left: `calc(${leftPercent}% - 8px)`, zIndex: 2, position: 'absolute', top: '50%', transform: 'translateY(-50%)', background: '#fff', border: '2px solid #18818b', width: 16, height: 16, borderRadius: '50%', cursor: 'pointer' }}
          onMouseDown={startDrag(0)}
        />
        {/* Right thumb */}
        <div
          className="slider-thumb"
          style={{ left: `calc(${rightPercent}% - 8px)`, zIndex: 2, position: 'absolute', top: '50%', transform: 'translateY(-50%)', background: '#fff', border: '2px solid #18818b', width: 16, height: 16, borderRadius: '50%', cursor: 'pointer' }}
          onMouseDown={startDrag(1)}
        />
      </div>
      <span className="slider-label">${value[1]}+</span>
    </div>
  );
};

export default PriceRangeSlider;
