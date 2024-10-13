import React from 'react';

interface Props {
  absoluteCenter?: boolean;
  className?: string;
}

export const Loader: React.FC<Props> = ({ absoluteCenter, className }) => {
  return (
    <div className={`${absoluteCenter && 'absolute top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4'}`}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className={`animate-spin duration-1000 ${className}`}
      >
        <path d='M12 2v4' />
        <path d='m16.2 7.8 2.9-2.9' />
        <path d='M18 12h4' />
        <path d='m16.2 16.2 2.9 2.9' />
        <path d='M12 18v4' />
        <path d='m4.9 19.1 2.9-2.9' />
        <path d='M2 12h4' />
        <path d='m4.9 4.9 2.9 2.9' />
      </svg>
    </div>
  );
};
