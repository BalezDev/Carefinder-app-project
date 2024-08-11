import React from 'react';

interface HelmetProps {
  title: string;
  children: React.ReactNode;
}

const Helmet: React.FC<HelmetProps> = ({ title, children }) => {
  React.useEffect(() => {
    document.title = `CareFinder - ${title}`;
  }, [title]);

  return <div className="w-100">{children}</div>;
};

export default Helmet;
