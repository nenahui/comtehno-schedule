import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/loader/loader';
import { Button } from '@/components/ui/button';
import { TeachersCard } from '@/features/teachers/components/teachersCard/teachersCard';
import { TeachersForm } from '@/features/teachers/components/teachersForm/teachersForm';
import { selectTeachers, selectTeachersCreating, selectTeachersFetching } from '@/features/teachers/teachersSlice';
import { createTeacher, fetchTeachers } from '@/features/teachers/teachersThunks';
import type { TeacherMutation } from '@/types';
import { PersonIcon } from '@radix-ui/react-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

const initialState: TeacherMutation = {
  name: '',
  patronymic: '',
  surname: '',
};

export const Teachers: React.FC = () => {
  const dispatch = useAppDispatch();
  const [teachersMutation, setTeachersMutation] = useState<TeacherMutation>(initialState);
  const teachers = useAppSelector(selectTeachers);
  const teachersFetching = useAppSelector(selectTeachersFetching);
  const teachersCreating = useAppSelector(selectTeachersCreating);
  const closeRef = useRef<HTMLButtonElement>(null);

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
    setTeachersMutation(initialState);
    closeRef.current?.click();
  };

  return (
    <>
      <div className={'flex items-center justify-between border-b pb-1'}>
        <div>
          <h1 className={'text-lg leading-none'}>Учителя</h1>
          <span className={'text-sm text-muted-foreground leading-none'}>Список всех учителей.</span>
        </div>
        <Drawer fadeFromIndex={1} snapPoints={[1, 1]}>
          <DrawerTrigger asChild>
            <Button size={'sm'} className={'flex gap-1 items-center'}>
              Добавить учителя <PersonIcon />
            </Button>
          </DrawerTrigger>
          <DrawerContent className={'max-w-lg mx-auto'}>
            <DrawerHeader>
              <DrawerTitle>Добавить учителя</DrawerTitle>
              <DrawerDescription>Заполните все нижние поля, перед добавлением.</DrawerDescription>
              <TeachersForm
                isLoading={teachersCreating}
                teachersMutation={teachersMutation}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                closeRef={closeRef}
              />
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
          teachers.map((teacher) => <TeachersCard key={teacher.id} teacher={teacher} />)
        )}
      </div>
    </>
  );
};
