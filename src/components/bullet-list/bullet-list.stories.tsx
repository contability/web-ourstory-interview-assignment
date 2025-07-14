import type { Meta, StoryObj } from '@storybook/react';
import BulletList from './index';

const meta: Meta<typeof BulletList> = {
  title: 'Components/BulletList',
  component: BulletList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BulletList>;

export const Default: Story = {
  args: {
    items: [{ content: '첫 번째 항목' }, { content: '두 번째 항목' }, { content: '세 번째 항목' }],
  },
};

export const WithCustomClass: Story = {
  args: {
    className: 'text-blue-500',
    items: [{ content: '파란색 텍스트 항목' }],
  },
};

export const WithComplexContent: Story = {
  args: {
    items: [
      {
        content: (
          <span>
            <strong>강조된</strong> 텍스트
          </span>
        ),
      },
      {
        content: (
          <span>
            <em>기울임꼴</em> 텍스트
          </span>
        ),
      },
      {
        content: (
          <span>
            <a href="#" className="text-blue-500 underline">
              링크
            </a>{' '}
            텍스트
          </span>
        ),
      },
    ],
  },
};
