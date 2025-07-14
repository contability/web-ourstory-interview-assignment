import type { Meta, StoryObj } from '@storybook/react';
import Heading from '.';

const meta = {
  title: 'Components/Typography/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
  },
} as Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const H1: Story = {
  args: {
    level: 'h1',
    children: '제목 1',
  },
};

export const H2: Story = {
  args: {
    level: 'h2',
    children: '제목 2',
  },
};

export const H3: Story = {
  args: {
    level: 'h3',
    children: '제목 3',
  },
};

export const H4: Story = {
  args: {
    level: 'h4',
    children: '제목 4',
  },
};

export const H5: Story = {
  args: {
    level: 'h5',
    children: '제목 5',
  },
};

export const H6: Story = {
  args: {
    level: 'h6',
    children: '제목 6',
  },
};

export const CustomClass: Story = {
  args: {
    level: 'h2',
    children: '커스텀 스타일 제목',
    className: 'text-red-500 text-left',
  },
};
