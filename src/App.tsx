import { useAppSelector } from '@/app/hooks';
import { Error404 } from '@/components/Errors/Error404';
import { Layout } from '@/components/layout/layout';
import { ProtectedRoute } from '@/components/protectedRoute/protectedRoute';
import { Toaster } from '@/components/ui/sonner';
import { CreateAudience } from '@/features/admin/createAudience';
import { CreateDiscipline } from '@/features/admin/createDiscipline';
import { CreateGroup } from '@/features/admin/createGroup';
import { CreateSchedule } from '@/features/admin/createSchedule';
import { CreateTeachers } from '@/features/admin/createTeachers';
import { Developers } from '@/features/developers/developers';
import { Home } from '@/features/home/home';
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
        <Route path={'/'} element={<Home />} />
        <Route path={'/developers'} element={<Developers />} />
        <Route
          path={'/schedules'}
          element={
            <ProtectedRoute isAllowed={Boolean(user?.token)}>
              <CreateSchedule />
            </ProtectedRoute>
          }
        />
        <Route
          path={'/teachers'}
          element={
            <ProtectedRoute isAllowed={Boolean(user?.token)}>
              <CreateTeachers />
            </ProtectedRoute>
          }
        />
        <Route
          path={'/groups'}
          element={
            <ProtectedRoute isAllowed={Boolean(user?.token)}>
              <CreateGroup />
            </ProtectedRoute>
          }
        />
        <Route
          path={'/disciplines'}
          element={
            <ProtectedRoute isAllowed={Boolean(user?.token)}>
              <CreateDiscipline />
            </ProtectedRoute>
          }
        />
        <Route
          path={'/audiences'}
          element={
            <ProtectedRoute isAllowed={Boolean(user?.token)}>
              <CreateAudience />
            </ProtectedRoute>
          }
        />
        <Route path={'/login'} element={<Login />} />
        <Route path={'*'} element={<Error404 />} />
      </Routes>
    </Layout>
  );
};
