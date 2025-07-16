import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import RadioGroup from '.';
import type { LabelValuePair } from '@dataTypes/pair';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/Fields/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

const defaultOptionList: LabelValuePair[] = [
  { label: '옵션 1', value: 1 },
  { label: '옵션 2', value: 2 },
  { label: '옵션 3', value: 3 },
];

const RadioGroupWrapper = ({ optionList }: { optionList?: LabelValuePair[] }) => {
  const { control } = useForm({
    defaultValues: {
      radioOption: undefined,
    },
  });

  return <RadioGroup name="radioOption" control={control} optionList={optionList || defaultOptionList} />;
};

export const Default: Story = {
  render: () => <RadioGroupWrapper />,
};

export const WithLongLabels: Story = {
  render: () => {
    const longOptionslist: LabelValuePair[] = [
      { label: '매우 긴 라디오 옵션 텍스트 1', value: 1 },
      { label: '매우 긴 라디오 옵션 텍스트 2 입니다', value: 2 },
      { label: '매우 긴 라디오 옵션 텍스트 3 입니다 정말로', value: 3 },
    ];

    return <RadioGroupWrapper optionList={longOptionslist} />;
  },
};
