import React from 'react';

const Loader = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-6 h-6 border-2',
    medium: 'w-12 h-12 border-4',
    large: 'w-16 h-16 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4">
      <div
        className={`${sizeClasses[size]} border-t-brand-yellow border-zinc-800 rounded-full animate-spin`}
      />
      <span className="text-zinc-500 font-medium text-sm animate-pulse">
        Preparing delicious meals...
      </span>
    </div>
  );
};

export default Loader;
