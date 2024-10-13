import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/loader/loader';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  selectAdminTeachers,
  selectAdminTeachersCreating,
  selectAdminTeachersFetching,
} from '@/features/admin/adminSlice';
import { createTeacher, fetchTeachers } from '@/features/admin/adminThunks';
import { TeacherCard } from '@/features/admin/components/teacherCard/teacherCard';
import type { TeacherMutation } from '@/types';
import { PersonIcon } from '@radix-ui/react-icons';
import React, { useEffect, useRef, useState } from 'react';

export const CreateTeachers: React.FC = () => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();
  const teachers = useAppSelector(selectAdminTeachers);
  const teachersFetching = useAppSelector(selectAdminTeachersFetching);
  const isCreating = useAppSelector(selectAdminTeachersCreating);
  const [teachersMutation, setTeachersMutation] = useState<TeacherMutation>({
    name: '',
    patronymic: '',
    surname: '',
  });

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setTeachersMutation((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await dispatch(createTeacher(teachersMutation)).unwrap();
    setTeachersMutation({
      name: '',
      patronymic: '',
      surname: '',
    });
    closeRef.current?.click();
  };

  return (
    <>
      <div className={'flex items-center justify-between border-b pb-1'}>
        <div>
          <h1 className={'text-lg leading-none'}>Учителя</h1>
          <span className={'text-sm text-muted-foreground leading-none'}>Список всех учителей.</span>
        </div>
        <Drawer>
          <DrawerTrigger asChild>
            <Button size={'sm'} className={'flex gap-1 items-center'}>
              Добавить учителя <PersonIcon />
            </Button>
          </DrawerTrigger>
          <DrawerContent className={'max-w-lg mx-auto'}>
            <DrawerHeader>
              <DrawerTitle>Добавить учителя</DrawerTitle>
              <DrawerDescription>Заполните все нижние поля, перед добавлением.</DrawerDescription>

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

                  <Button disabled={isCreating} type={'submit'} size={'sm'} className={'w-full'}>
                    Добавить
                    {isCreating && <Loader className={'ml-2 size-4 text-muted-foreground'} />}
                  </Button>
                  <DrawerClose asChild ref={closeRef}>
                    <Button variant={'outline'} disabled={isCreating} type={'button'} size={'sm'} className={'w-full'}>
                      Отменить
                    </Button>
                  </DrawerClose>
                </div>
              </form>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      </div>

      <div className={'flex flex-col gap-3 mt-3'}>
        {teachersFetching ? (
          <Loader absoluteCenter className={'text-muted-foreground size-5'} />
        ) : !teachersFetching && teachers.length === 0 ? (
          <small>not</small>
        ) : (
          teachers.map((teacher) => <TeacherCard key={teacher.id} teacher={teacher} />)
        )}
      </div>
    </>
  );
};
