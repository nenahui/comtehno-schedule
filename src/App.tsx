import { Layout } from '@/components/layout/layout';
import { Home } from '@/features/home/home';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

export const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path={'/'} element={<Home />} />
      </Routes>
    </Layout>
  );
};
