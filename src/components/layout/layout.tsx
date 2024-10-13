import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Button } from '@/components/ui/button';
import { selectUser, unsetUser } from '@/features/users/usersSlice';
import { ExitIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import React, { type PropsWithChildren, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './layout.module.css';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const path = useLocation().pathname.slice(1);
  const [isOpen, setOpen] = useState(false);

  return (
    <main className={'container mx-auto p-2 max-w-sm md:max-w-md lg:max-w-lg'}>
      {user?.token && path !== 'login' && path !== 'register' && (
        <header>
          <Button size={'icon'} variant={'ghost'} className={styles.btn} onClick={() => setOpen(() => !isOpen)}>
            <HamburgerMenuIcon />
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size={'icon'} variant={'ghost'} className={styles.btnLogout}>
                <ExitIcon />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                <AlertDialogDescription>После выхода из аккаунта, вам придется войти снова.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className={'flex flex-col gap-0.5'}>
                <AlertDialogAction onClick={() => dispatch(unsetUser())}>Выйти</AlertDialogAction>
                <AlertDialogCancel>Отменить</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <nav
            className={`${styles.mainNav} ${isOpen && styles.mainNavOpen} border-b border-transparent ${isOpen && 'border-muted'}`}
          >
            <ul className={styles.nav}>
              <li>
                <NavLink to={'/'}>Главная</NavLink>
              </li>
              <li>
                <NavLink to={'/groups'} className={'hover:text-gray-50 hover:opacity-100 !important'}>
                  Группы
                </NavLink>
              </li>
              <li>
                <NavLink to={'/audiences'} className={'hover:text-gray-50 hover:opacity-100 !important'}>
                  Аудитории
                </NavLink>
              </li>
              <li>
                <NavLink to={'/teachers'} className={'hover:text-gray-50 hover:opacity-100 !important'}>
                  Учителя
                </NavLink>
              </li>
              <li>
                <NavLink to={'/disciplines'} className={'hover:text-gray-50 hover:opacity-100 !important'}>
                  Дисциплины
                </NavLink>
              </li>
              <li>
                <NavLink to={'/schedules'} className={'hover:text-gray-50 hover:opacity-100 !important'}>
                  Расписания
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
      )}
      <section className={`${styles.section} ${user?.token && 'border-t'} pt-1.5`}>{children}</section>
    </main>
  );
};
