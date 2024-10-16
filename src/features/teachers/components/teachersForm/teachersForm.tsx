import { Loader } from '@/components/loader/loader';
import { Button } from '@/components/ui/button';
import { DrawerClose } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { TeacherMutation } from '@/types';
import React from 'react';

interface Props {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  teachersMutation: TeacherMutation;
  closeRef: React.RefObject<HTMLButtonElement>;
  isLoading: boolean;
}

export const TeachersForm: React.FC<Props> = ({
  handleSubmit,
  teachersMutation,
  handleChange,
  closeRef,
  isLoading,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className={'space-y-2 w-full text-left'}>
        <div>
          <Label htmlFor={'name'}>Имя</Label>
          <Input
            id={'name'}
            placeholder={'Введите имя учителя'}
            required
            onChange={handleChange}
            value={teachersMutation.name}
          />
        </div>

        <div>
          <Label htmlFor={'surname'}>Фамилия</Label>
          <Input
            id={'surname'}
            placeholder={'Введите фамилию учителя'}
            required
            onChange={handleChange}
            value={teachersMutation.surname}
          />
        </div>

        <div>
          <Label htmlFor={'patronymic'}>Отчество</Label>
          <Input
            id={'patronymic'}
            placeholder={'Введите отчество учителя'}
            required
            onChange={handleChange}
            value={teachersMutation.patronymic}
          />
        </div>

        <Button disabled={isLoading} type={'submit'} size={'sm'} className={'w-full'}>
          Сохранить
          {isLoading && <Loader className={'ml-2 size-4 text-muted-foreground'} />}
        </Button>
        <DrawerClose asChild ref={closeRef}>
          <Button variant={'outline'} disabled={isLoading} type={'button'} size={'sm'} className={'w-full'}>
            Отменить
          </Button>
        </DrawerClose>
      </div>
    </form>
  );
};
