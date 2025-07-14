import Heading from '@components/typography/heading';
import type { PropsWithChildren } from 'react';

interface InfoDisplayLayoutProps {
  title: string;
}

const InfoDisplayLayout = ({ title, children }: PropsWithChildren<InfoDisplayLayoutProps>) => {
  return (
    <div className="mb-6">
      <Heading level="h3" className="text-start">
        {title}
      </Heading>
      {children}
    </div>
  );
};

export default InfoDisplayLayout;
