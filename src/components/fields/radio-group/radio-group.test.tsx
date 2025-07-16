import { render, screen, fireEvent } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import RadioGroup from '.';
import type { LabelValuePair } from '@dataTypes/pair';

const optionList: LabelValuePair[] = [
  { label: '옵션 1', value: 1 },
  { label: '옵션 2', value: 2 },
  { label: '옵션 3', value: 3 },
];

const RadioGroupWrapper = () => {
  const { control } = useForm({
    defaultValues: {
      radioOption: undefined,
    },
  });

  return <RadioGroup name="radioOption" control={control} optionList={optionList} />;
};

describe('RadioGroup', () => {
  it('모든 옵션이 렌더링되는지 확인', () => {
    render(<RadioGroupWrapper />);

    optionList.forEach(option => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('옵션 클릭 시 선택 상태가 변경되는지 확인', () => {
    render(<RadioGroupWrapper />);

    const option1 = screen.getByText('옵션 1');
    const option2 = screen.getByText('옵션 2');

    // 초기 상태에서는 모든 옵션이 선택되지 않음
    expect(option1.parentElement).toHaveClass('bg-cream');
    expect(option2.parentElement).toHaveClass('bg-cream');

    // 첫 번째 옵션 클릭
    fireEvent.click(option1);
    expect(option1.parentElement).toHaveClass('bg-sage');
    expect(option2.parentElement).toHaveClass('bg-cream');

    // 두 번째 옵션 클릭
    fireEvent.click(option2);
    expect(option1.parentElement).toHaveClass('bg-cream');
    expect(option2.parentElement).toHaveClass('bg-sage');

    // 선택된 옵션 다시 클릭하면 선택 해제
    fireEvent.click(option2);
    expect(option2.parentElement).toHaveClass('bg-cream');
  });
});
