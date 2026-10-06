import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export default function Logo({ className = '', size = 'md', showTagline = true }: LogoProps) {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-11 h-11',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-[19px]',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Precision Apple-Style Minimalist Hardware Monogram */}
      <div className={`${iconSizes[size]} relative shrink-0 transition-transform duration-300 ease-out group-hover:scale-105`}>
        <div className="w-full h-full bg-[#1d1d1f] text-white rounded-[10px] flex items-center justify-center p-1.5 shadow-sm border border-black/10">
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Smooth precision S-curve with Apple minimalist styling */}
            <path 
              d="M17 7.5C17 6.11929 15.8807 5 14.5 5H9.5C8.11929 5 7 6.11929 7 7.5C7 8.88071 8.11929 10 9.5 10H14.5C15.8807 10 17 11.1193 17 12.5C17 13.8807 15.8807 15 14.5 15H9.5C8.11929 15 7 13.8807 7 12.5" 
              stroke="#FFFFFF" 
              strokeWidth="2.2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            {/* Top & bottom dot accents */}
            <circle cx="16" cy="18.5" r="1.3" fill="#0071e3" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1 leading-none">
          <span className={`font-semibold tracking-[-0.03em] text-[#1d1d1f] ${textSizes[size]}`}>
            Shortlist
          </span>
        </div>
        {showTagline && (
          <span className="text-[9px] uppercase font-semibold tracking-widest text-[#86868b] mt-0.5">
            ATS Architecture
          </span>
        )}
      </div>
    </div>
  );
}
