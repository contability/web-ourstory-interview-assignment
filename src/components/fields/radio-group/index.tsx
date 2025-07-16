import type { LabelValuePair } from '@dataTypes/pair';
import { useController, type Control, type FieldValues, type Path } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

interface RadioGroupProps<T extends FieldValues = FieldValues> {
  optionList: LabelValuePair[];
  name: Path<T>;
  control?: Control<T>;
}

const RadioGroup = <T extends FieldValues = FieldValues>({ optionList, name, control }: RadioGroupProps<T>) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  const handleClick = (optionValue: string | number) => {
    if (value === optionValue) onChange(undefined);
    else onChange(optionValue);
  };

  return (
    <div className="flex w-full flex-wrap items-center gap-3">
      {optionList.map(option => {
        const isSelected = value === option.value;
        return (
          <label
            key={`radio-key__${name}-${option.value}`}
            htmlFor={`radio-id__${name}-${option.value}`}
            className={twMerge(
              'cursor-pointer rounded-md border border-olive px-4 py-2 transition-all duration-200 hover:bg-sage/20',
              isSelected ? 'bg-sage shadow-sm' : 'bg-cream text-khaki',
            )}
          >
            <input
              id={`radio-id__${name}-${option.value}`}
              type="radio"
              className="sr-only"
              onClick={() => handleClick(option.value)}
              aria-checked={isSelected}
            />
            <span className="text-base font-medium md:text-lg lg:text-xl">{option.label}</span>
          </label>
        );
      })}
    </div>
  );
};

export default RadioGroup;
