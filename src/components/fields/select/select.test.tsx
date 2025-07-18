import { render, screen, fireEvent } from '@testing-library/react';
import Select from './index';
import { useForm, FormProvider } from 'react-hook-form';
import type { ReactNode } from 'react';

const mockOptions = [
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' },
];

const TestFormWrapper = ({ children, defaultValues }: { children: ReactNode; defaultValues?: Record<string, any> }) => {
  const methods = useForm({ defaultValues });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('Select 컴포넌트', () => {
  test('기본 Select가 올바르게 렌더링되어야 한다', () => {
    render(
      <TestFormWrapper>
        <Select optionList={mockOptions} name="test" />
      </TestFormWrapper>,
    );

    const selectButton = screen.getByText('선택');
    expect(selectButton).toBeInTheDocument();
  });

  test('선택된 값이 올바르게 표시되어야 한다', () => {
    render(
      <TestFormWrapper defaultValues={{ test: 'option2' }}>
        <Select optionList={mockOptions} name="test" />
      </TestFormWrapper>,
    );

    const selectedOption = screen.getByText('옵션 2');
    expect(selectedOption).toBeInTheDocument();
  });

  test('클릭 시 옵션 목록이 표시되어야 한다', () => {
    render(
      <TestFormWrapper>
        <Select optionList={mockOptions} name="test" />
      </TestFormWrapper>,
    );

    expect(screen.queryByRole('list')).not.toBeInTheDocument();

    const selectButton = screen.getByRole('button');
    fireEvent.click(selectButton);

    const optionList = screen.getByRole('list');
    expect(optionList).toBeInTheDocument();

    expect(screen.getByText('옵션 1')).toBeInTheDocument();
    expect(screen.getByText('옵션 2')).toBeInTheDocument();
    expect(screen.getByText('옵션 3')).toBeInTheDocument();
  });

  test('className prop이 올바르게 적용되어야 한다', () => {
    render(
      <TestFormWrapper>
        <Select optionList={mockOptions} name="test" className="test-class" />
      </TestFormWrapper>,
    );

    const selectButton = screen.getByRole('button');
    expect(selectButton).toHaveClass('test-class');
  });

  test('옵션 선택 시 값이 변경되어야 한다', () => {
    const { container } = render(
      <TestFormWrapper>
        <Select optionList={mockOptions} name="test" />
      </TestFormWrapper>,
    );

    // 드롭다운 열기
    const selectButton = screen.getByRole('button');
    fireEvent.click(selectButton);

    // 옵션 선택
    const option = screen.getByText('옵션 2');
    fireEvent.click(option);

    // 선택된 옵션이 표시되는지 확인
    expect(screen.getByText('옵션 2')).toBeInTheDocument();

    // 드롭다운이 닫혔는지 확인
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  test('외부 클릭 시 드롭다운이 닫혀야 한다', () => {
    const { container } = render(
      <TestFormWrapper>
        <div data-testid="outside">외부 영역</div>
        <Select optionList={mockOptions} name="test" />
      </TestFormWrapper>,
    );

    // 드롭다운 열기
    const selectButton = screen.getByRole('button');
    fireEvent.click(selectButton);

    // 드롭다운이 열렸는지 확인
    expect(screen.getByRole('list')).toBeInTheDocument();

    // 외부 영역 클릭
    const outsideArea = screen.getByTestId('outside');
    fireEvent.mouseDown(outsideArea);
    fireEvent.click(outsideArea);

    // 드롭다운이 닫혔는지 확인
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});
