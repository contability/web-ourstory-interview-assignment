import { parseValue } from '@utils/parse-value';
import { useEffect, useRef, useState } from 'react';
import { useController, type Control, type FieldValues, type Path } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

export interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps<T extends FieldValues = FieldValues> {
  optionList: SelectOption[];
  name: Path<T>;
  control?: Control<T>;
  className?: string;
}

const Select = <T extends FieldValues = FieldValues>({ optionList, name, control, className }: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });
  const selectedOption = optionList.find(option => parseValue(option.value) === parseValue(value))?.label || '선택';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(event?.target as Node)) setIsOpen(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSelectClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (optionValue: string | number) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <button
        ref={buttonRef}
        onClick={handleSelectClick}
        type="button"
        className={twMerge(
          'flex w-full items-center justify-between rounded-md border border-gray-300 bg-cream p-2 px-3 text-left text-base transition-all duration-200 focus:border-forest focus:outline-none md:text-lg lg:p-3 lg:text-xl',
          isOpen ? 'border-forest' : 'border-gray-300',
          className,
        )}
      >
        <span className="truancate text-gray-800">{selectedOption}</span>
        <MdOutlineKeyboardArrowDown
          size={17}
          className={`ml-2 flex-shrink-0 text-forest transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <ul className="absolute z-10 mt-1 max-h-96 w-full overflow-auto rounded-md border border-forest bg-cream py-1 shadow-lg">
          {optionList.map(option => (
            <li key={`select-box__link-${option.value}`} role="option">
              <button
                type="button"
                onClick={() => handleOptionSelect(option.value)}
                className={`flex w-full items-center px-3 py-2 text-left text-base hover:bg-sand md:text-lg ${parseValue(option.value) === parseValue(value) ? 'bg-cream text-forest' : 'text-gray-800'}`}
              >
                <span className="truncate">{option.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
