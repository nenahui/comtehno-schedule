import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/loader/loader';
import { Button } from '@/components/ui/button';
import { selectAdminTeachersDeleting } from '@/features/admin/adminSlice';
import { deleteTeacher } from '@/features/admin/adminThunks';
import type { Teacher } from '@/types';
import { TrashIcon } from '@radix-ui/react-icons';
import React from 'react';

interface Props {
  teacher: Teacher;
}

export const TeacherCard: React.FC<Props> = ({ teacher }) => {
  const dispatch = useAppDispatch();
  const teachersDeleting = useAppSelector(selectAdminTeachersDeleting);

  const handleDelete = () => {
    dispatch(deleteTeacher(teacher.id));
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
  );
};
