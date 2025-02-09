import { useState } from 'react';

export default function Logo() {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex items-center">
      {!imageError && (
        <img 
          src="/assets/3.PNG"
          alt="Atlas HomeServices Logo" 
          className="h-12 w-auto"
          style={{ 
            minWidth: '160px',
            filter: 'brightness(0) invert(1)',
            opacity: 1
          }}
          onError={(e) => {
            console.error('Error loading logo:', e);
            setImageError(true);
          }}
        />
      )}
      {imageError && (
        <span className="text-white text-lg font-semibold">
          Atlas HomeServices
        </span>
      )}
    </div>
  );
}