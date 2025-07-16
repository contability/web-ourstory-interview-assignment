import React from 'react';

interface KeyValueListProps {
  data: Record<string, string | number>;
  className?: string;
}

const KeyValueList = ({ data, className = '' }: KeyValueListProps) => {
  return (
    <ul className={`space-y-2 ${className}`}>
      {Object.entries(data).map(([key, value]) => (
        <li key={`key-value__${key}`} className="flex items-center gap-4">
          <span className="w-[10rem] text-right">{key}</span>
          <span className="w-1/2 text-left">{value}</span>
        </li>
      ))}
    </ul>
  );
};

export default KeyValueList;
