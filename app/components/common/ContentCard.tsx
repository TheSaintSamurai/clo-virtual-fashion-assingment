import React, { useState } from 'react';

interface ContentCardProps {
  id: string;
  imagePath: string;
  creator: string;
  title: string;
  pricingOption: number; // 0: PAID, 1: FREE, 2: VIEW_ONLY
  price: number;
}

const ContentCard: React.FC<ContentCardProps> = ({
  id,
  imagePath,
  creator,
  title,
  pricingOption,
  price,
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const getPricingDisplay = () => {
    switch (pricingOption) {
      case 0:
        return `$${price.toFixed(2)}`;
      case 1:
        return 'Free';
      case 2:
        return 'View Only';
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col justify-end bg-transparent" style={{ minHeight: '420px', height: '420px', borderRadius: '2px', overflow: 'hidden' }}>
      <div className="w-full" style={{ height: '420px', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src={imagePath}
          alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>
      <div className="w-full py-3" style={{ background: '#23232a' }}>
        <div className="flex justify-between items-center">
          <div>
            <div style={{ fontFamily: 'AvenirNextLTProDemi', fontSize: '10px', color: 'white', marginBottom: '2px', lineHeight: '1.1' }}>{title}</div>
            <div style={{ fontFamily: 'AvenirNextLTProRegular', fontSize: '8px', color: 'white', opacity: 0.7 }}>{creator}</div>
          </div>
          <div style={{ fontFamily: 'AvenirNextLTProBold', fontSize: '14px', color: 'white' }}>{getPricingDisplay()}</div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
