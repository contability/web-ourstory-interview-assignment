import 'react-day-picker/style.css';
import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { format, isValid, parse } from 'date-fns';
import { DayPicker, getDefaultClassNames } from 'react-day-picker';
import { useController, type Control, type FieldValues, type Path } from 'react-hook-form';
import { ko } from 'react-day-picker/locale';
import { IoCalendarClearOutline } from 'react-icons/io5';
import Modal from '@components/modal';

interface DayPickerInputProps<T extends FieldValues = FieldValues> {
  id?: string;
  control?: Control<T>;
  name: Path<T>;
}

const DayPickerInput = <T extends FieldValues = FieldValues>({ id, control, name }: DayPickerInputProps<T>) => {
  const defaultClassNames = getDefaultClassNames();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);

  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  const handleDayPickerSelect = (date: Date | undefined) => {
    if (!date) {
      onChange('');
      setSelectedDate(undefined);
    } else {
      setSelectedDate(date);
      onChange(format(date, 'yyyy-MM-dd'));
    }
    setIsOpen(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);

    const parsedDate = parse(e.target.value, 'yyyy-MM-dd', new Date());
    if (isValid(parsedDate)) setSelectedDate(parsedDate);
    else setSelectedDate(undefined);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) setIsOpen(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <>
      <div className="relative w-full" ref={wrapperRef}>
        <input
          style={{ fontSize: 'inherit' }}
          id={id}
          type="text"
          value={value}
          placeholder="yyyy-MM-dd"
          onChange={handleInputChange}
          className="w-full rounded-md border border-gray-300 p-2 text-base placeholder:text-gray-400 focus:border-forest focus:outline-none md:text-lg lg:p-3 lg:text-xl"
        />
        <button
          type="button"
          className="absolute top-1/2 right-3 -translate-y-1/2"
          onClick={() => setIsOpen(true)}
          aria-controls="dialog"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-label="Open calendar to choose booking date"
        >
          <IoCalendarClearOutline size={15} className="text-forest" />
        </button>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="rounded-md bg-white p-4">
          <DayPicker
            animate
            captionLayout="dropdown"
            navLayout="around"
            autoFocus
            mode="single"
            selected={selectedDate}
            onSelect={handleDayPickerSelect}
            locale={ko}
            formatters={{
              formatYearDropdown: year => `${year.getFullYear()}년`,
            }}
            className="fill-forest"
            classNames={{
              chevron: 'fill-forest size-[2rem]',
              today: 'border-forest',

              day: `${defaultClassNames.day} !w-16 !h-16 md:!w-18 md:!h-18`,
              day_button: `${defaultClassNames.day_button} !w-16 !h-16 md:!w-18 md:!h-18`,

              dropdowns: 'flex flex-row-reverse gap-6',
              selected: `${defaultClassNames.selected} !border-forest !text-[1.3rem]`,
              weekday: `${defaultClassNames.weekday} !w-8`,
            }}
            defaultMonth={selectedDate}
          />
        </div>
      </Modal>
    </>
  );
};

export default DayPickerInput;
