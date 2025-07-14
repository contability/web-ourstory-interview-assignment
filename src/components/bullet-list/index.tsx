import React from 'react';
import type { ReactNode } from 'react';

interface BulletItem {
  content: ReactNode;
}

interface BulletListProps {
  items: BulletItem[];
  className?: string;
}

const BulletList: React.FC<BulletListProps> = ({ items, className = '' }) => {
  return (
    <ul className={`space-y-2 ${className}`}>
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          <span className="mt-2 mr-2 inline-block size-2 rounded-full bg-sage" />
          <span>{item.content}</span>
        </li>
      ))}
    </ul>
  );
};

export default BulletList;
