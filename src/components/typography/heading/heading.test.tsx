import { render, screen } from '@testing-library/react';
import Heading from '.';

describe('Heading 컴포넌트', () => {
  test('기본 Heading(h2)이 올바르게 렌더링되어야 한다', () => {
    render(<Heading>테스트 제목</Heading>);

    const headingElement = screen.getByText('테스트 제목');
    expect(headingElement).toBeInTheDocument();
    expect(headingElement.tagName).toBe('H2');
  });

  test('h1 레벨이 올바르게 렌더링되어야 한다', () => {
    render(<Heading level="h1">H1 제목</Heading>);

    const headingElement = screen.getByText('H1 제목');
    expect(headingElement.tagName).toBe('H1');
  });

  test('h3 레벨이 올바르게 렌더링되어야 한다', () => {
    render(<Heading level="h3">H3 제목</Heading>);

    const headingElement = screen.getByText('H3 제목');
    expect(headingElement.tagName).toBe('H3');
  });

  test('h4 레벨이 올바르게 렌더링되어야 한다', () => {
    render(<Heading level="h4">H4 제목</Heading>);

    const headingElement = screen.getByText('H4 제목');
    expect(headingElement.tagName).toBe('H4');
  });

  test('h5 레벨이 올바르게 렌더링되어야 한다', () => {
    render(<Heading level="h5">H5 제목</Heading>);

    const headingElement = screen.getByText('H5 제목');
    expect(headingElement.tagName).toBe('H5');
  });

  test('h6 레벨이 올바르게 렌더링되어야 한다', () => {
    render(<Heading level="h6">H6 제목</Heading>);

    const headingElement = screen.getByText('H6 제목');
    expect(headingElement.tagName).toBe('H6');
  });

  test('className prop이 올바르게 적용되어야 한다', () => {
    render(<Heading className="test-class">스타일 테스트</Heading>);

    const headingElement = screen.getByText('스타일 테스트');
    expect(headingElement).toHaveClass('test-class');
  });

  test('기본 클래스가 적용되어야 한다', () => {
    render(<Heading>클래스 테스트</Heading>);

    const headingElement = screen.getByText('클래스 테스트');
    expect(headingElement).toHaveClass('font-semibold');
    expect(headingElement).toHaveClass('text-forest');
    expect(headingElement).toHaveClass('text-center');
  });
});
