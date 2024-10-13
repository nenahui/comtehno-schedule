import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/loader/loader';
import { Button } from '@/components/ui/button';
import { UsersInput } from '@/features/users/components/users-input/users-input';
import { selectLoginError, selectLoginLoading } from '@/features/users/usersSlice';
import { login } from '@/features/users/usersThunks';
import type { LoginMutation } from '@/types';
import React, { type ChangeEvent, type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const initialState: LoginMutation = {
  email: '',
  password: '',
};

interface InputErrors {
  email: boolean;
  password: boolean;
}

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoginLoading);
  const error = useAppSelector(selectLoginError);
  const navigate = useNavigate();
  const [loginMutation, setLoginMutation] = useState<LoginMutation>(initialState);
  const [inputErrors, setInputErrors] = useState<InputErrors>({
    email: false,
    password: false,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginMutation((prev) => ({ ...prev, [name]: value }));
    setInputErrors((prev) => ({ ...prev, [name]: !value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      const errors = {
        email: !loginMutation.email,
        password: !loginMutation.password,
      };

      setInputErrors(errors);

      if (errors.email || errors.password) {
        return;
      }

      await dispatch(login(loginMutation)).unwrap();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={'grid place-items-center h-screen'}>
      <div className={'max-w-[420px] w-full'}>
        <header>
          <h4 className={'text-center text-2xl font-semibold'}>Авторизация</h4>
          <p className={'text-muted-foreground text-sm text-center mb-3'}>Введите почту и пароль для входа в аккаунт</p>
        </header>

        <main>
          <form onSubmit={handleSubmit}>
            <div className={'flex flex-col gap-2'}>
              <UsersInput
                onChange={handleChange}
                name={'email'}
                label={'Почта'}
                error={error?.message}
                value={loginMutation.email}
                placeholder={'Введите почту'}
                autoComplete={'new-email'}
                className={inputErrors.email ? 'ring-red-600 ring-1 focus-visible:ring-red-600' : ''}
              />

              <UsersInput
                onChange={handleChange}
                name={'password'}
                label={'Пароль'}
                error={error?.message}
                value={loginMutation.password}
                placeholder={'Введите пароль'}
                type={'password'}
                autoComplete={'new-password'}
                className={inputErrors.password ? 'ring-red-600 ring-1 focus-visible:ring-red-600' : ''}
              />

              <Button type={'submit'} disabled={loading} className={'select-none mt-1'}>
                Войти {loading && <Loader className={'text-muted size-5 ml-2'} />}
              </Button>
            </div>
          </form>
        </main>

        <footer>
          <Link
            to={'/register'}
            className={
              'text-sm text-muted-foreground hover:text-black dark:hover:text-white border-b border-transparent hover:border-black dark:hover:border-white duration-100'
            }
          >
            Нет аккаунта? Регистрация
          </Link>
        </footer>
      </div>
    </div>
  );
};
