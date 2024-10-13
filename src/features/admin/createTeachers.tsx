import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { selectTeachersCreating } from '@/features/createTeachers/createTeachersSlice';
import { createTeacher } from '@/features/createTeachers/createTeachersThunks';
import type { TeacherMutation } from '@/types';
import React, { useState } from 'react';

export const CreateTeachers: React.FC = () => {
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectTeachersCreating);
  const [teachersMutation, setTeachersMutation] = useState<TeacherMutation>({
    name: '',
    patronymic: '',
    surname: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setTeachersMutation((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await dispatch(createTeacher(teachersMutation));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={'space-y-2'}>
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

        <Button disabled={isCreating} type={'submit'} size={'sm'} className={'w-full'}>
          Добавить
        </Button>
      </div>
    </form>
  );
};
