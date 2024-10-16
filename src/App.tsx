import { useAppSelector } from '@/app/hooks';
import { Error404 } from '@/components/errors/error404';
import { Layout } from '@/components/layout/layout';
import { ProtectedRoute } from '@/components/protectedRoute/protectedRoute';
import { Toaster } from '@/components/ui/sonner';
import { Audiences } from '@/features/audiences/audiences';
import { Developers } from '@/features/developers/developers';
import { Disciplines } from '@/features/disciplines/disciplines';
import { Groups } from '@/features/groups/groups';
import { Schedules } from '@/features/schedules/schedules';
import { Teachers } from '@/features/teachers/teachers';
import { Login } from '@/features/users/login';
import { selectUser } from '@/features/users/usersSlice';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

export const App: React.FC = () => {
  const user = useAppSelector(selectUser);

  return (
    <Layout>
      <Toaster />
      <Routes>
        <Route path={'/'} element={<Schedules />} />
        <Route path={'/developers'} element={<Developers />} />
        <Route
          path={'/schedules'}
          element={
            <ProtectedRoute isAllowed={Boolean(user?.token)}>
              <Schedules />
            </ProtectedRoute>
          }
        />
        <Route
          path={'/teachers'}
          element={
            <ProtectedRoute isAllowed={Boolean(user?.token)}>
              <Teachers />
            </ProtectedRoute>
          }
        />
        <Route
          path={'/groups'}
          element={
            <ProtectedRoute isAllowed={Boolean(user?.token)}>
              <Groups />
            </ProtectedRoute>
          }
        />
        <Route
          path={'/disciplines'}
          element={
            <ProtectedRoute isAllowed={Boolean(user?.token)}>
              <Disciplines />
            </ProtectedRoute>
          }
        />
        <Route
          path={'/audiences'}
          element={
            <ProtectedRoute isAllowed={Boolean(user?.token)}>
              <Audiences />
            </ProtectedRoute>
          }
        />
        <Route path={'/login'} element={<Login />} />
        <Route path={'*'} element={<Error404 />} />
      </Routes>
    </Layout>
  );
};
