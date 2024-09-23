import React, { type PropsWithChildren } from 'react';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return <main className={'container mx-auto p-2 max-w-sm'}>{children}</main>;
};
