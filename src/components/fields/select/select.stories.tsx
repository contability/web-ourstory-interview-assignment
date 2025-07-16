import type { Meta, StoryObj } from '@storybook/react';
import Select from '.';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

const SelectWrapper = (props: any) => {
  const { control, setValue } = useForm();

  useEffect(() => {
    if (props.defaultValue) {
      setValue('select', props.defaultValue);
    }
  }, [props.defaultValue, setValue]);

  return <Select optionList={props.optionList} name="select" control={control} className={props.className} />;
};

const meta = {
  title: 'Components/Fields/Select',
  component: SelectWrapper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} as Meta<typeof SelectWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

const optionList = [
  { value: 'apple', label: '사과' },
  { value: 'banana', label: '바나나' },
  { value: 'orange', label: '오렌지' },
  { value: 'grape', label: '포도' },
  { value: 'watermelon', label: '수박' },
];

export const Default: Story = {
  args: {
    optionList,
    className: 'w-80',
  },
};

export const WithSelectedValue: Story = {
  args: {
    optionList,
    defaultValue: 'banana',
    className: 'w-80',
  },
};
