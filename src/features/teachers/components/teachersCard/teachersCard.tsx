import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/loader/loader';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { TeachersForm } from '@/features/teachers/components/teachersForm/teachersForm';
import { selectTeachersDeleting } from '@/features/teachers/teachersSlice';
import { deleteTeacher } from '@/features/teachers/teachersThunks';
import type { Teacher, TeacherMutation } from '@/types';
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import React, { useRef, useState } from 'react';

interface Props {
  teacher: Teacher;
}

const initialState: TeacherMutation = {
  name: '',
  patronymic: '',
  surname: '',
};

export const TeachersCard: React.FC<Props> = ({ teacher }) => {
  const [teachersMutation, setTeachersMutation] = useState<TeacherMutation>(initialState);
  const dispatch = useAppDispatch();
  const teachersDeleting = useAppSelector(selectTeachersDeleting);
  const closeRef = useRef<HTMLButtonElement>(null);

  const handleDelete = () => {
    dispatch(deleteTeacher(teacher.id));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setTeachersMutation((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTeachersMutation(initialState);
    closeRef.current?.click();
  };

  return (
    <div className={'bg-white p-2 py-1 rounded-md flex text-black items-center gap-2 justify-between'}>
      <div className={'flex gap-2 items-center h-full'}>
        <div className={'flex flex-col gap-1.5'}>
          <h3 className={'leading-none line-clamp-1 text-sm'}>
            {teacher.surname} {teacher.name}.{teacher.patronymic}.
          </h3>
        </div>
      </div>

      <div className={'space-x-2'}>
        <Drawer>
          <DrawerTrigger asChild>
            <Button size={'icon'} type={'button'} variant={'secondary'}>
              <Pencil1Icon />
            </Button>
          </DrawerTrigger>
          <DrawerContent className={'max-w-lg mx-auto'}>
            <DrawerHeader>
              <DrawerTitle>Редактировать</DrawerTitle>
              <DrawerDescription>Отредактируйте все нижние поля, перед изменением.</DrawerDescription>
              <TeachersForm
                isLoading={false}
                teachersMutation={teachersMutation}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                closeRef={closeRef}
              />
            </DrawerHeader>
          </DrawerContent>
        </Drawer>

        <Button
          onClick={handleDelete}
          disabled={Boolean(teachersDeleting)}
          size={'icon'}
          type={'button'}
          variant={'secondary'}
        >
          {teachersDeleting === teacher.id ? <Loader className={'text-muted-foreground size-4'} /> : <TrashIcon />}
        </Button>
      </div>
    </div>
  );
};
