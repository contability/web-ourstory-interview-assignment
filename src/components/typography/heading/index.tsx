import React, { memo, type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface HeadingProps {
  children: ReactNode;
  className?: string;
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const Heading = ({ children, className = '', level = 'h2' }: HeadingProps) => {
  const baseClasses = 'font-semibold text-forest text-center';
  const sizeClasses = {
    h1: 'text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-8 lg:mb-10',
    h2: 'text-xl md:text-2xl lg:text-3xl mb-4 md:mb-6 lg:mb-8',
    h3: 'text-lg md:text-xl lg:text-2xl mb-3 md:mb-5 lg:mb-6',
    h4: 'text-base md:text-lg lg:text-xl mb-2 md:mb-4 lg:mb-5',
    h5: 'text-sm md:text-base lg:text-lg mb-2 md:mb-3 lg:mb-4',
    h6: 'text-xs md:text-sm lg:text-base mb-1 md:mb-2 lg:mb-3',
  };

  const renderHeading = () => {
    switch (level) {
      case 'h1':
        return <h1 className={twMerge(baseClasses, sizeClasses[level], className)}>{children}</h1>;
      case 'h2':
        return <h2 className={twMerge(baseClasses, sizeClasses[level], className)}>{children}</h2>;
      case 'h3':
        return <h3 className={twMerge(baseClasses, sizeClasses[level], className)}>{children}</h3>;
      case 'h4':
        return <h4 className={twMerge(baseClasses, sizeClasses[level], className)}>{children}</h4>;
      case 'h5':
        return <h5 className={twMerge(baseClasses, sizeClasses[level], className)}>{children}</h5>;
      case 'h6':
        return <h6 className={twMerge(baseClasses, sizeClasses[level], className)}>{children}</h6>;
      default:
        return <h2 className={twMerge(baseClasses, sizeClasses.h2, className)}>{children}</h2>;
    }
  };

  return renderHeading();
};

Heading.dispayName = 'Heading';
export default memo(Heading);
