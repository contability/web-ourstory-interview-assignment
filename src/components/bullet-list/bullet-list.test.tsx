import React from 'react';
import { render, screen } from '@testing-library/react';
import BulletList from './index';

describe('BulletList', () => {
  it('renders all list items correctly', () => {
    const items = [{ content: '첫 번째 항목' }, { content: '두 번째 항목' }, { content: '세 번째 항목' }];

    render(<BulletList items={items} />);

    expect(screen.getByText('첫 번째 항목')).toBeInTheDocument();
    expect(screen.getByText('두 번째 항목')).toBeInTheDocument();
    expect(screen.getByText('세 번째 항목')).toBeInTheDocument();
  });

  it('renders items with complex content', () => {
    const items = [
      {
        content: (
          <span>
            <strong>강조된</strong> 텍스트
          </span>
        ),
      },
    ];

    render(<BulletList items={items} />);

    expect(screen.getByText('강조된')).toBeInTheDocument();
    expect(screen.getByText('텍스트', { exact: false })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const items = [{ content: '항목' }];
    const customClass = 'custom-class';

    const { container } = render(<BulletList items={items} className={customClass} />);

    const ulElement = container.querySelector('ul');
    expect(ulElement).toHaveClass(customClass);
  });
});
